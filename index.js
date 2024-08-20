const express = require('express')
const path = require('node:path')
const mysql = require('mysql2');
const { View } = require('electron');
const app = express()



// Configuracion
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(path.join(__dirname,'css')))



app.get('/', (req, res) => {
    res.render('login', { titulo: 'ewjk3340984323412' })
})


// Conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'proyecto_deportologico',
});



app.post('/enviar', (req, res) => {
    const { nombre_regis } = req.body
    const { apellido_regis } = req.body
    const { dni } = req.body
    const { nacimiento } = req.body
    const { opciones_genero } = req.body
    const { peso } = req.body
    const { altura } = req.body
    const { nombre_usuario_regis } = req.body
    const { email_regis } = req.body
    const { password_regis } = req.body
    const { dieta } = req.body
    const { objetivo_nutricional } = req.body
    const { tipo_deporte } = req.body
    const { obj_deportivo } = req.body
    const { frecuencia } = req.body
    const { intensidad } = req.body

    const query_ant = 'SELECT DNI, Nombre_usuario, Email FROM usuario WHERE DNI = ? OR Nombre_usuario = ? OR Email = ?';
    connection.query(query, [dni, nombre_usuario_regis, email_regis], (err, results) => {
        if (err) {
            console.error('Error checking data:', err);
            res.render('login.ejs', {
                error: 'Error al verificar los datos'
            });
        } else if (results.length > 0) {
            if (results.some(row => row.DNI === dni)) {
                res.render('login.ejs', {
                    error: 'Error: El DNI ya está registrado'
                });
            } else if (results.some(row => row.Nombre_usuario === nombre_usuario)) {

                res.render('login.ejs', {
                    error: 'Error: El Nombre de usuario ya está tomado'
                });

            } else if (results.some(row => row.Email === email)) {


                res.render('login.ejs', {
                    error: 'Error: Error: El Email ya está registrado'
                });
            }
        }
        else {
            // Hasheando la contraseña antes de insertar en la base de datos
            bcrypt.hash(password_regis, 10, (err, hashedPassword) => {
                if (err) {
                    res.render('login.ejs', {
                        error: 'Error al procesar la contraseña'
                    });
                    return;
                }
                else {
                    const query_usuario = 'INSERT INTO `usuario`(`DNI`, `Nombre_usuario`, `password`, `Nombre`, `Apellido`, `FechaNacimiento`, `Email`, `Peso`, `Altura`, `Genero`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

                    connection.query(query_usuario, [dni, nombre_usuario_regis, hashedPassword, nombre_regis, apellido_regis, nacimiento, email_regis, peso, altura, opciones_genero])

                    const query_nutri = 'INSERT INTO `nutricionalusuario`(`ID_nut`, `DNI_nut`, `ObjetivoNutricion`, `TipoAlimentacion`) VALUES (?, ?, ?, ?)';

                    connection.query(query_nutri, [, dni, objetivo_nutricional, dieta])


                    const query_deport = 'INSERT INTO `deportivousuario`(`ID_depor`, `DNI_depor`, `ObjetivosDeportivo`, `TipoDeporte`, `Frecuencia`, `Intensidad`) VALUES (?, ?, ?, ?, ?, ?)';
                    connection.query(query_deport, [, dni, obj_deportivo, tipo_deporte, frecuencia, intensidad])
                }
            })


        }


    })


}) 

// Encender servidor
app.listen(3000, () => {
    console.log('Servidor encendido')
})