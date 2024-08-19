const mysql = require('mysql2');
const { ipcRenderer } = require('electron');

// Escuchar los datos del usuario enviados desde el proceso principal
ipcRenderer.on('user-data_ini', (event, data_ini) => {

    console.log('Datos del usuario recibidos:', data_ini);
    alert("ss")
});