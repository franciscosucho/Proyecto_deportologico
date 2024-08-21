const express = require('express')
const path = require('node:path')
const mysql = require('mysql2');
const { View } = require('electron');
const app = express()
const session= require('express-session')




// Configuracion
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
//
app.use(session({
    secret: 'keyboard cat', // CAMBIAR Y GUARDAR EN OTRO LADO MAS TARDE
    resave: true,
    saveUninitialized: true,
}))


app.get('/', (req, res) => {
    res.render('login', { titulo: 'ewjk3340984323412' })

})

app.get('/index', (req, res) => {
    var user_name=req.session.user_name
    var user_id=req.session.user_id
    var user_pass=req.session.user_pass
    res.render('index', {user_name,user_id,user_pass})

})


// Conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'proyecto_deportologico',
});


app.post('/enviar', (req, res) => {
    const {
        nombre_regis, apellido_regis, dni, nacimiento, opciones_genero, peso, altura,
        nombre_usuario_regis, email_regis, password_regis, dieta, objetivo_nutricional,
        tipo_deporte, obj_deportivo, frecuencia, intensidad
    } = req.body;

    const query_ant = 'SELECT DNI, Nombre_usuario, Email FROM usuario WHERE DNI = ? OR Nombre_usuario = ? OR Email = ?';
    
    connection.query(query_ant, [dni, nombre_usuario_regis, email_regis], (err, results) => {
        if (err) {
            console.error('Error al verificar los datos:', err);
            return res.render('login.ejs', { error: 'Error al verificar los datos' });
        }

        if (results.length > 0) {
            const existing = results[0];
            if (existing.DNI === dni) {
                return res.render('login.ejs', { error: 'Error: El DNI ya está registrado' });
            } else if (existing.Nombre_usuario === nombre_usuario_regis) {
                return res.render('login.ejs', { error: 'Error: El Nombre de usuario ya está tomado' });
            } else if (existing.Email === email_regis) {
                return res.render('login.ejs', { error: 'Error: El Email ya está registrado' });
            }
        } else {
            // Inserción en la tabla `usuario`
            const query_usuario = `
                INSERT INTO usuario (DNI, Nombre_usuario, password, Nombre, Apellido, FechaNacimiento, Email, Peso, Altura, Genero)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            connection.query(query_usuario, [dni, nombre_usuario_regis, password_regis, nombre_regis, apellido_regis, nacimiento, email_regis, peso, altura, opciones_genero], (err) => {
                if (err) {
                    console.error('Error al insertar en usuario:', err);
                    return res.render('login.ejs', { error: 'Error al registrar el usuario' });
                }

                // Inserción en la tabla `nutricionalusuario`
                const query_nutri = `
                    INSERT INTO nutricionalusuario (DNI_nut, ObjetivoNutricion, TipoAlimentacion)
                    VALUES (?, ?, ?)
                `;
                connection.query(query_nutri, [dni, objetivo_nutricional, dieta], (err) => {
                    if (err) {
                        console.error('Error al insertar en nutricionalusuario:', err);
                        return res.render('login.ejs', { error: 'Error al registrar los datos nutricionales' });
                    }

                    // Inserción en la tabla `deportivousuario`
                    const query_deport = `
                        INSERT INTO deportivousuario (DNI_depor, ObjetivosDeportivo, TipoDeporte, Frecuencia, Intensidad)
                        VALUES (?, ?, ?, ?, ?)
                    `;
                    connection.query(query_deport, [dni, obj_deportivo, tipo_deporte, frecuencia, intensidad], (err) => {
                        if (err) {
                            console.error('Error al insertar en deportivousuario:', err);
                            return res.render('login.ejs', { error: 'Error al registrar los datos deportivos' });
                        }

                       
                        // variabables de sesion
                        req.session.user_name=nombre_usuario_regis;
                        req.session.user_id=dni;
                        req.session.user_pass=password_regis;
                         // Redirigir a la página de inicio
                        return res.redirect('/index');
                    });
                });
            });
        }
    });
});

// cuando se inicia sesion se verifica los datos
app.get('/iniciar', (req, res) => {
    const { nombre_ini, password_ini } = req.query;

    const query_ini = `
        SELECT DNI,Nombre_usuario, Email, password 
        FROM usuario 
        WHERE (Nombre_usuario = ? OR Email = ?) 
        AND password = ?`;

    connection.query(query_ini, [nombre_ini, nombre_ini, password_ini], (err, results) => {
        if (err) {
            return res.render('login.ejs', {
                error: 'Error al verificar los datos'
            });
        }
        
        if (results.length > 0) {

            // variabables de sesion
            req.session.user_name=results[0].Nombre_usuario;
            req.session.user_id=results[0].DNI;
            req.session.user_pass=results[0].password;
             // Redirigir a la página de inicio
            return res.redirect('/index');

        } else {
            return res.render('login.ejs', {
                error: 'El Email o el Nombre de usuario no existen, o la contraseña es incorrecta'
            });
        }
    });
});



// Encender servidor
app.listen(3000, () => {
    console.log('Servidor encendido')
})

