const express = require('express')
const path = require('node:path')
const mysql = require('mysql2');
const { View } = require('electron');
const app = express()
const session = require('express-session')




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
    if (req.session.user_dni != undefined) {
        res.redirect('/index')

        //req.destroy() para borrar las cookies.
    }
    else {
        res.render('login', {})
    }
})


app.post('/calendario/chequear/:valor/:id_act', (req, res) => {
    var { valor, id_act } = req.params
    const UPDATE_act = 'UPDATE actividad_dia SET MarcadorCumplido =? WHERE  ID_act=?'
    if (valor == "true") {
        valor = 1;
    }
    if (valor == "false") {
        valor = 0;
    }
    connection.query(UPDATE_act, [valor, id_act], (err, results) => {
        if (err) {
            console.error('Error al verificar los datos:', err);
            return res.render('login.ejs', { error: 'Error al verificar los datos' });

        }
        console.log(valor, id_act)

    })
})


app.get('/index', (req, res) => {
    var user_name = req.session.user_name
    var user_dni = req.session.user_dni
    var user_pass = req.session.user_pass
    var user_nac = req.session.user_nac
    var user_genero = req.session.user_genero
    var user_peso = req.session.user_peso
    var user_altura = req.session.user_altura
    var user_email = req.session.user_email
    var user_dieta = req.session.user_dieta
    var user_obj_nut = req.session.user_obj_nut
    var user_deporte = req.session.user_deporte
    var user_obj_dep = req.session.user_obj_dep
    var user_frecuencia = req.session.user_frecuencia
    var user_intensidad = req.session.user_intensidad


    const query_act_dia = 'SELECT * FROM `actividad_dia` WHERE Dni_act=?'
    connection.query(query_act_dia, [user_dni], (err, results) => {
        if (err) {
            console.error('Error al verificar los datos:', err);
            return res.render('login.ejs', { error: 'Error al verificar los datos' });

        }
        console.log(results)
        res.render('index', { results, user_name, user_dni, user_pass, user_nac, user_genero, user_peso, user_altura, user_email, user_dieta, user_obj_nut, user_deporte, user_obj_dep, user_frecuencia, user_intensidad })
    })




})

app.get('/recetas', (req, res) => {

    var user_name = req.session.user_name
    var user_dni = req.session.user_dni
    var user_pass = req.session.user_pass
    var user_nac = req.session.user_nac
    var user_genero = req.session.user_genero
    var user_peso = req.session.user_peso
    var user_altura = req.session.user_altura
    var user_email = req.session.user_email
    var user_dieta = req.session.user_dieta
    var user_obj_nut = req.session.user_obj_nut
    var user_deporte = req.session.user_deporte
    var user_obj_dep = req.session.user_obj_dep
    var user_frecuencia = req.session.user_frecuencia
    var user_intensidad = req.session.user_intensidad
    res.render('recetas', { user_name, user_dni, user_pass, user_nac, user_genero, user_peso, user_altura, user_email, user_dieta, user_obj_nut, user_deporte, user_obj_dep, user_frecuencia, user_intensidad })

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
        tipo_deporte, obj_deportivo, frecuencia, intensidad, intolerancia
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
                    INSERT INTO nutricionalusuario (DNI_nut,intolerancia,ObjetivoNutricion, TipoAlimentacion)
                    VALUES (?, ?, ?, ?)
                `;
                connection.query(query_nutri, [dni, intolerancia, objetivo_nutricional, dieta], (err) => {
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
                        req.session.user_name = nombre_usuario_regis;
                        req.session.user_dni = dni;
                        req.session.user_pass = password_regis;
                        //
                        req.session.user_nac = nacimiento;
                        req.session.user_genero = opciones_genero;
                        req.session.user_peso = peso;
                        //
                        req.session.user_altura = altura;
                        req.session.user_email = email_regis;
                        req.session.user_dieta = dieta;
                        //
                        req.session.user_obj_nut = objetivo_nutricional;
                        req.session.user_deporte = tipo_deporte;
                        req.session.user_obj_dep = obj_deportivo;
                        req.session.user_frecuencia = frecuencia;
                        req.session.user_intensidad = intensidad;
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

    const query_ini = `SELECT * FROM usuario 
        WHERE (Nombre_usuario = ? OR Email = ?) 
        AND password = ?`;

    connection.query(query_ini, [nombre_ini, nombre_ini, password_ini], (err, results) => {
        if (err) {
            return res.render('login.ejs', {
                error: 'Error al verificar los datos'
            });
        }

        if (results.length > 0) {
            const dni = results[0].DNI;
            // variabables de sesion user
            req.session.user_name = results[0].Nombre_usuario;
            req.session.user_dni = results[0].DNI;
            req.session.user_pass = results[0].password;
            req.session.user_nac = results[0].FechaNacimiento;
            req.session.user_email = results[0].Email;
            req.session.user_peso = results[0].peso;
            req.session.user_altura = results[0].altura;
            req.session.user_genero = results[0].Genero;

            const query_nutri = `
            SELECT * FROM nutricionalusuario WHERE DNI_nut = ?`;
            connection.query(query_nutri, [dni], (err, results) => {
                if (err) {
                    return res.render('login.ejs', {
                        error: 'Error al verificar los datos'
                    });
                }
                if (results.length > 0) {
                    // variabables de sesion nutri
                    req.session.user_dieta = results[0].TipoAlimentacion;
                    req.session.user_obj_nut = results[0].ObjetivoNutricion;
                }
            })

            const query_dep = `
            SELECT * FROM deportivousuario WHERE DNI_depor = ?`;
            connection.query(query_dep, [dni], (err, results) => {
                if (err) {
                    return res.render('login.ejs', {
                        error: 'Error al verificar los datos'
                    });
                }
                if (results.length > 0) {
                    // variabables de sesion deporte
                    req.session.user_obj_dep = results[0].ObjetivosDeportivo;
                    req.session.user_deporte = results[0].TipoDeporte;
                    req.session.user_frecuencia = results[0].Frecuencia;
                    req.session.user_intensidad = results[0].Intensidad;
                }
            })
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

