const { app, BrowserWindow, ipcMain } = require('electron');
const mysql = require('mysql2');
const path = require('path');
function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 1000,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
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

// Escucha los datos enviados desde el renderer process
ipcMain.on('submit-registration', (event, formData) => {
  const { dni, nombre_usuario, password, nombre_regis, apellido_regis, fechaNacimiento, email, peso, altura, genero, objetivo_nutricional, dieta, obj_deportivo, tipo_deporte, frecuencia, intensidad } = formData;
  //validacion de los datos
  var query = 'SELECT DNI, Nombre_usuario, Email FROM usuario WHERE DNI = ? OR Nombre_usuario = ? OR Email = ?';
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
      // Si todos los campos son únicos, mandar los datos
      //mandar los datos alas tablas correspondientes.
      query = 'INSERT INTO `usuario`(`DNI`, `Nombre_usuario`, `password`, `Nombre`, `Apellido`, `FechaNacimiento`, `Email`, `Peso`, `Altura`, `Genero`) VALUES (? ,? ,? ,? ,? ,? ,? ,? ,? ,? )';
      connection.query(query, [dni, nombre_usuario, password, nombre_regis, apellido_regis, fechaNacimiento, email, peso, altura, genero], (err, results) => {
        if (err) {
          console.error('Error inserting data:', err);
          event.reply('registration-response', 'Error al registrar en la seccion de usuario');
        } else {
          console.log('Data inserted successfully:', results);
          event.reply('registration-response', 'Registro exitoso  en la seccion de usuario');
        }
      });

      query = 'INSERT INTO `nutricionalusuario`(`ID_nut`,`DNI_nut`, `ObjetivoNutricion`, `TipoAlimentacion`) VALUES (?,? ,? ,?)'
      connection.query(query, ["", dni, objetivo_nutricional, dieta], (err, results) => {
        if (err) {
          console.error('Error inserting data:', err);
          event.reply('registration-response', 'Error al registrar en la seccion de nutricion');
        } else {
          console.log('Data inserted successfully:', results);
          event.reply('registration-response', 'Registro exitoso en la seccion de nutricion');
        }
      });
      query = 'INSERT INTO `deportivousuario`(`ID_depor`, `DNI_depor`, `ObjetivosDeportivo`, `TipoDeporte`, `Frecuencia`, `Intensidad`) VALUES (?,?,?,?,?,?)'
      connection.query(query, ["", dni, obj_deportivo, tipo_deporte, frecuencia,
        intensidad], (err, results) => {
          if (err) {
            console.error('Error inserting data:', err);
            event.reply('registration-response', 'Error al registrar en la seccion de deporte');
          } else {
            console.log('Data inserted successfully:', results);
            event.reply('registration-response', 'Registro exitoso en la seccion de deporte');
          }
        });
    }
  });



});
ipcMain.on('submit-ini', (event, data_ini) => {
  const { nombre_ini, email_ini, password_ini } = data_ini;

  var query = 'SELECT Nombre_usuario, Email, password FROM usuario WHERE (Nombre_usuario = ? AND password = ?) OR (Email = ? AND password = ?)';
  connection.query(query, [nombre_ini, password_ini, email_ini, password_ini], (err, results) => {
      if (err) {
          console.error('Error checking data:', err);
          event.reply('login-response', 'Error al verificar los datos');
      } else if (results.length > 0) {
          event.reply('login-response', 'success');
      } else {
          event.reply('login-response', 'Error: El Email o el Nombre de usuario no existen, intente de nuevo');
      }
  });
});
app.whenReady().then(createWindow);