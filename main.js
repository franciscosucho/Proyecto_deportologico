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
  const { dni, nombre_usuario, password, nombreApellido, fechaNacimiento, email, peso, altura, genero } = formData;

  const query = `INSERT INTO usuario (DNI, Nombre_usuario, password, NombreApellido, FechaNacimiento, Email, Peso, Altura, Genero) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  connection.query(query, [dni, nombre_usuario, password, nombreApellido, fechaNacimiento, email, peso, altura, genero], (err, results) => {
    if (err) {
      console.error('Error inserting data:', err);
      event.reply('registration-response', 'Error al registrar');
    } else {
      console.log('Data inserted successfully:', results);
      event.reply('registration-response', 'Registro exitoso');
    }
  });
});

app.whenReady().then(createWindow);