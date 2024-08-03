const mysql = require('mysql2');

// Configuración de la conexión
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'proyecto_deportologico'
});

// Conectar a la base de datos
connection.connect((err) => {
    if (err) {
        console.error('Error al conectarse a la base de datos: ' + err.stack);
        return;
    }
 
});

// // Datos a insertar
// const dni = '47098781';
// const nombreApellido = 'francisco suchomela';
// const fechaNacimiento = '1990-01-01';
// const email = 'franciscosuchomela@gmail.com';
// const peso = '75';
// const altura = '180';
// const genero = 'Masculino';

// // Sentencia SQL para insertar datos
// const sql = `INSERT INTO usuario (DNI, NombreApellido, FechaNacimiento, Email, Peso, Altura, Genero) 
//              VALUES (?, ?, ?, ?, ?, ?, ?)`;

var sql_query;

// // Ejecutar la consulta
// connection.query(sql, [dni, nombreApellido, fechaNacimiento, email, peso, altura, genero], (error, results) => {
//     if (error) {
//         return console.error('Error al insertar datos: ' + error.message);
//     }
//     console.log('Datos insertados con éxito, ID: ' + results.insertId);
// });

// // Cerrar la conexión
// connection.end();



const btn_iniciar = document.getElementById("btn_iniciar");
const btn_registrar = document.getElementById("btn_registrar");
const btn_enviar_sesion =document.getElementById("btn_enviar_sesion")
btn_iniciar.addEventListener("click", () => {
    btn_iniciar.classList.add("activo");
    btn_iniciar.classList.remove("desactivo");
    btn_registrar.classList.add("desactivo");
    btn_registrar.classList.remove("activo");
})
btn_registrar.addEventListener("click", () => {
    btn_registrar.classList.add("activo");
    btn_registrar.classList.remove("desactivo");
    btn_iniciar.classList.add("desactivo");
    btn_iniciar.classList.remove("activo");
})
btn_enviar_sesion.addEventListener("click", () => {
// // Ejecutar la consulta
sql_query='SELECT  `Nombre_usuario`, `password`  FROM `usuario` WHERE Nombre_usuario=? AND password=?';
// connection.query(sql, [dni, nombreApellido, fechaNacimiento, email, peso, altura, genero], (error, results) => {
//     if (error) {
//         return console.error('Error al insertar datos: ' + error.message);
//     }
//     console.log('Datos insertados con éxito, ID: ' + results.insertId);
// });
})