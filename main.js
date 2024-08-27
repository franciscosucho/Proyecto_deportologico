// comando para instalar en el cole " npm install --save-dev electron "
// 
const mysql = require('mysql2');
const { app, nativeTheme, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const bcrypt = require('bcrypt');

let mainWindow;

require('./index.js')

function createWindowMain() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    fullscreen: true,
    webPreferences: {
      nodeIntegration: false, // Mejor seguridad
      contextIsolation: true,
      enableRemoteModule: false,
      //preload: path.join(__dirname, 'preload.js') // Opcional si tienes un archivo preload
    },
  });

  mainWindow.loadURL('http://localhost:3000');
}

// Conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'proyecto_deportologico',
});
app.whenReady().then(createWindowMain);
