const mysql = require('mysql2');
const { ipcRenderer } = require('electron');

// Escuchar los datos del usuario enviados desde el proceso principal

/* 
ipcRenderer.on('user-data_ini', (event, data_ini) => {

    console.log('Datos del usuario recibidos:', data_ini);
    alert("ss")
});
*/ 
function callApi() {
    const apiId = '31f5fad495dc42f0b38d901ddaf47e9a';
    const url = `https://api.spoonacular.com/recipes/random?apiKey=${apiId}&number=1&include-tags=vegetariano,dessert&exclude-tags=quinoa
`; //esto siempre en comillas simpres
    //'https://api.spoonacular.com/recipes/complexSearch' probando a ver si nos vincula con la api.


    fetch(url)
        .then(data => {
            return data.json();
        })
        .then(dataJSON => {
            //console.log(dataJSON)
            if (dataJSON.cod === '404') {
                showError('Ciudad no encontrada...');
            } else {
                clearHTML();
                showWeather(dataJSON);
            }
        })
        .catch(error => {
        })
}

callApi()