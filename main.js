
//Para arrancar el programa escribir en la terminal "npm run start"

const { app, BrowserWindow } = require('electron');
const path = require('path');
function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        icon: path.join(__dirname, './resources/mental-strong.ico'), // Cambia el camino al icono
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false, // Asegúrate de que esto esté configurado según tus necesidades de seguridad
        }
    });

    mainWindow.loadFile('index.html');

    // Abre las herramientas de desarrollo
    mainWindow.webContents.openDevTools();

    // Alternativamente, puedes agregar un listener para abrir las herramientas con F12
    mainWindow.webContents.on('before-input-event', (event, input) => {
        if (input.key === 'F12') {
            mainWindow.webContents.openDevTools();
        }
    });
}

app.whenReady().then(createWindow);