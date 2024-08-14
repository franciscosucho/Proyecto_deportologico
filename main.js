const { app, BrowserWindow, ipcMain } = require('electron');
const mysql = require('mysql2');
const path = require('path');
function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,  // Permitir la integración de Node.js
      contextIsolation: false,
    },
  });
  win.webContents.on('before-input-event', (event, input) => {
    if (input.key === 'F12') {
      win.webContents.toggleDevTools();
    }
  });
  win.loadFile('index.html');
}


// Conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost', // Cambia esto si tu BD no está en localhost
  user: 'root', // Usuario de la BD
  password: '', // Contraseña de la BD
  database: 'proyecto_deportologico', // Nombre de la BD
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
  // Validación de los datos
  let query = 'SELECT DNI, Nombre_usuario, Email FROM usuario WHERE DNI = ? OR Nombre_usuario = ? OR Email = ?';
  connection.query(query, [dni, nombre_usuario, email], (err, results) => {
    if (err) {
      console.error('Error checking data:', err);
      event.reply('registration-response', 'Error al verificar los datos');
    } else if (results.length > 0) {
      // Verificar cuál campo ya existe
      if (results.some(row => row.DNI === dni)) {
        event.reply('registration-response', 'Error: El DNI ya está registrado');
      } else if (results.some(row => row.Nombre_usuario === nombre_usuario)) {
        event.reply('registration-response', 'Error: El Nombre de usuario ya está tomado');
      } else if (results.some(row => row.Email === email)) {
        event.reply('registration-response', 'Error: El Email ya está registrado');
      }
    } else {

      query = 'INSERT INTO `usuario`(`DNI`, `Nombre_usuario`, `password`, `Nombre`, `Apellido`, `FechaNacimiento`, `Email`, `Peso`, `Altura`, `Genero`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      connection.query(query, [dni, nombre_usuario, password, nombre_regis, apellido_regis, fechaNacimiento, email, peso, altura, genero], (err, results) => {
        if (err) {
          console.error('Error inserting data:', err);
          event.reply('registration-response', 'Error al registrar en la sección de usuario');
        } else {
          console.log('Data inserted successfully in usuario:', results);

          // Ahora insertar en nutricionalusuario
          query = 'INSERT INTO `nutricionalusuario`(`ID_nut`, `DNI_nut`, `ObjetivoNutricion`, `TipoAlimentacion`) VALUES (?, ?, ?, ?)';
          connection.query(query, ["", dni, objetivo_nutricional, dieta], (err, results) => {
            if (err) {
              console.error('Error inserting data in nutricionalusuario:', err);
              event.reply('registration-response', 'Error al registrar en la sección de nutrición');
            } else {
              console.log('Data inserted successfully in nutricionalusuario:', results);

              // Ahora insertar en deportivousuario
              query = 'INSERT INTO `deportivousuario`(`ID_depor`, `DNI_depor`, `ObjetivosDeportivo`, `TipoDeporte`, `Frecuencia`, `Intensidad`) VALUES (?, ?, ?, ?, ?, ?)';
              connection.query(query, ["", dni, obj_deportivo, tipo_deporte, frecuencia, intensidad], (err, results) => {
                if (err) {
                  console.error('Error inserting data in deportivousuario:', err);
                  event.reply('registration-response', 'Error al registrar en la sección de deporte');
                } else {
                  console.log('Data inserted successfully in deportivousuario:', results);
                  event.reply('registration-response', 'Registro exitoso en todas las secciones');
                }
              });
            }
          });
        }
      });
    }
  });
});





const bcrypt = require('bcrypt');

// En el evento de login
ipcMain.on('submit-ini', (event, data_ini) => {
  var { nombre_ini, email_ini, password_ini } = data_ini;

  var query = 'SELECT Nombre_usuario, Email, password FROM usuario WHERE Nombre_usuario = ? OR Email = ?';
  connection.query(query, [nombre_ini, email_ini], (err, results) => {
    if (err) {
      console.error('Error checking data:', err);
      event.reply('login-response', 'Error al verificar los datos');
    } else if (results.length > 0) {
      const user = results[0];
      
      // Comparar la contraseña sin hashear con la contraseña hasheada en la base de datos
      bcrypt.compare(password_ini, user.password, (err, result) => {
        if (err) {
          console.error('Error comparing passwords:', err);
          event.reply('login-response', 'Error al verificar la contraseña');
        } else if (result) {
          event.reply('login-response', 'success');
        } else {
          event.reply('login-response', 'Error: Contraseña incorrecta');
        }
      });
    } else {
      event.reply('login-response', 'Error: El Email o el Nombre de usuario no existen, intente de nuevo');
    }
  });
});
app.whenReady().then(createWindow);