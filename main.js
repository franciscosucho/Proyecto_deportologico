// comando para instalar en el cole " npm install --save-dev electron "
// 

const { app, BrowserWindow } = require('electron');

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
      // preload: path.join(__dirname, 'preload.js') // Opcional si tienes un archivo preload
    },
  });

  mainWindow.loadURL('http://localhost:3000');
}



// Iniciar la ventana
app.whenReady().then(() => {
  createWindowMain()

  // Condicion para que no se creen mas de una ventana
  app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindowMain()
  })
})

// Terminar el proceso de la aplicacion cuando se cierren todas las ventanas
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})