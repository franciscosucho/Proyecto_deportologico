// comando para instalar en el cole " npm install --save-dev electron "
// 
const mysql = require('mysql2');
const { app, nativeTheme, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const bcrypt = require('bcrypt');

let loginWindow;
let mainWindow;

function createWindowLogin() {
  loginWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
     // preload: path.join(__dirname, 'preload.js') // Opcional si tienes un archivo preload
    },
  });

  loginWindow.loadFile('login.html');
}

function createWindowMain() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false, // Mejor seguridad
      contextIsolation: true,
      enableRemoteModule: false,
      //preload: path.join(__dirname, 'preload.js') // Opcional si tienes un archivo preload
    },
  });

  mainWindow.loadFile('index.html');
}

// Conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'proyecto_deportologico',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL server.');
});

ipcMain.on('submit-registration', (event, formData) => {
  const { dni, nombre_usuario, password, nombre_regis, apellido_regis, email, fechaNacimiento, peso, altura, genero, objetivo_nutricional, dieta, obj_deportivo, tipo_deporte, frecuencia, intensidad } = formData;

  let query = 'SELECT DNI, Nombre_usuario, Email FROM usuario WHERE DNI = ? OR Nombre_usuario = ? OR Email = ?';
  connection.query(query, [dni, nombre_usuario, email], (err, results) => {
    if (err) {
      console.error('Error checking data:', err);
      event.reply('registration-response', 'Error al verificar los datos');
    } else if (results.length > 0) {
      if (results.some(row => row.DNI === dni)) {
        event.reply('registration-response', 'Error: El DNI ya está registrado');
      } else if (results.some(row => row.Nombre_usuario === nombre_usuario)) {
        event.reply('registration-response', 'Error: El Nombre de usuario ya está tomado');
      } else if (results.some(row => row.Email === email)) {
        event.reply('registration-response', 'Error: El Email ya está registrado');
      }
    } else {
      // Hasheando la contraseña antes de insertar en la base de datos
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          console.error('Error hashing password:', err);
          event.reply('registration-response', 'Error al procesar la contraseña');
          return;
        }

        query = 'INSERT INTO `usuario`(`DNI`, `Nombre_usuario`, `password`, `Nombre`, `Apellido`, `FechaNacimiento`, `Email`, `Peso`, `Altura`, `Genero`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        connection.query(query, [dni, nombre_usuario, hashedPassword, nombre_regis, apellido_regis, fechaNacimiento, email, peso, altura, genero], (err, results) => {
          if (err) {
            console.error('Error inserting data:', err);
            event.reply('registration-response', 'Error al registrar en la sección de usuario');
          } else {
            console.log('Data inserted successfully in usuario:', results);

            query = 'INSERT INTO `nutricionalusuario`(`ID_nut`, `DNI_nut`, `ObjetivoNutricion`, `TipoAlimentacion`) VALUES (?, ?, ?, ?)';
            connection.query(query, ["", dni, objetivo_nutricional, dieta], (err, results) => {
              if (err) {
                console.error('Error inserting data in nutricionalusuario:', err);
                event.reply('registration-response', 'Error al registrar en la sección de nutrición');
              } else {
                console.log('Data inserted successfully in nutricionalusuario:', results);

                query = 'INSERT INTO `deportivousuario`(`ID_depor`, `DNI_depor`, `ObjetivosDeportivo`, `TipoDeporte`, `Frecuencia`, `Intensidad`) VALUES (?, ?, ?, ?, ?, ?)';
                connection.query(query, ["", dni, obj_deportivo, tipo_deporte, frecuencia, intensidad], (err, results) => {
                  if (err) {
                    console.error('Error inserting data in deportivousuario:', err);
                    event.reply('registration-response', 'Error al registrar en la sección de deporte');
                  }
                  else {
                    if (loginWindow) {
                      loginWindow.close();
                      loginWindow = null;
                    }
                    createWindowMain();
                  }
                });
              }
            });
          }
        });
      });
    }
  });
});

ipcMain.on('submit-ini', (event, data_ini) => {
  const { nombre_ini, email_ini, password_ini } = data_ini;

  const query = 'SELECT Nombre_usuario, Email, password FROM usuario WHERE Nombre_usuario = ? OR Email = ?';
  connection.query(query, [nombre_ini, email_ini], (err, results) => {
    if (err) {
      console.error('Error checking data:', err);
      event.reply('login-response', 'Error al verificar los datos');
    } else if (results.length > 0) {
      const user = results[0];

      bcrypt.compare(password_ini, user.password, (err, result) => {
        if (err) {
          console.error('Error comparing passwords:', err);
          event.reply('login-response', 'Error al verificar la contraseña');
        } else if (result) {
          // Cerrar la ventana de login y abrir la ventana principal
          if (loginWindow) {
            loginWindow.close();
            loginWindow = null;
          }
          createWindowMain();
          // Abre las herramientas de desarrollo
          mainWindow.webContents.openDevTools();
        } else {
          event.reply('login-response', 'Error: Contraseña incorrecta');
        }
      });
    } else {
      event.reply('login-response', 'Error: El Email o el Nombre de usuario no existen, intente de nuevo');
    }
  });
});

app.whenReady().then(createWindowLogin);
