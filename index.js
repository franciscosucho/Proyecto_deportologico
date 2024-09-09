const express = require('express')
const path = require('node:path')
const mysql = require('mysql2');
const { View } = require('electron');
const app = express()
const session = require('express-session')

// Conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'proyecto_deportologico',
});


const isLogged = (req, res, next) => {
    if (req.session.user_name == '' || typeof req.session.user_name == 'undefined') {
        res.redirect('/')
    } else {
        next()
    }
}


// Configuracion
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/receta_focus', express.static(path.join(__dirname, 'public')))

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


    })
})


app.post('/calendario/update/:fechaFormateada', (req, res) => {
    var { fechaFormateada } = req.params
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

    const query_act_dia = 'SELECT * FROM `actividad_dia` WHERE Dni_act=? AND Fecha=?'
    connection.query(query_act_dia, [user_dni, fechaFormateada], (err, results) => {
        if (err) {
            console.error('Error al verificar los datos:', err);
            return res.render('login.ejs', { error: 'Error al verificar los datos' });

        }

        res.render('index', { results, user_name, user_dni, user_pass, user_nac, user_genero, user_peso, user_altura, user_email, user_dieta, user_obj_nut, user_deporte, user_obj_dep, user_frecuencia, user_intensidad })
    })
})

app.post('/nueva_actividad', (req, res) => {
    var user_dni = req.session.user_dni
    const {
        info_act, fecha_act
    } = req.body;

    const query_agregar_act = 'INSERT INTO actividad_dia( Dni_act, Fecha, Objetivos, MarcadorCumplido) VALUES (?,?,?,?)';
    connection.query(query_agregar_act, [user_dni, fecha_act, info_act, 0], (err, results) => {
        if (err) {
            console.error('Error al verificar los datos:', err);
            return res.render('login.ejs', { error: 'Error al verificar los datos' });

        }
        console.log("se envio")
    })
    res.redirect('/index');
})



app.get('/nutricion', (req, res) => {

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
    var user_intolerancia = req.session.user_intolerancia
    var user_intensidad = req.session.user_intensidad

    res.render('nutricion', { user_name, user_intolerancia, user_dni, user_pass, user_nac, user_genero, user_peso, user_altura, user_email, user_dieta, user_obj_nut, user_deporte, user_obj_dep, user_frecuencia, user_intensidad })

})

app.get('/index', isLogged, (req, res) => {
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
    var user_racha = req.session.user_racha
    var now = new Date();
    var year = now.getFullYear(); // Obtiene el año (YYYY)
    var month = String(now.getMonth() + 1).padStart(2, '0'); // Obtiene el mes (MM) y agrega un 0 si es necesario
    var today = String(now.getDate()).padStart(2, '0'); // Obtiene el día (DD) y agrega un 0 si es necesario

    const fechaFormateada = `${year}-${month}-${today}`;

    const query_act_dia = 'SELECT * FROM `actividad_dia` WHERE Dni_act=? AND Fecha=? '
    connection.query(query_act_dia, [user_dni, fechaFormateada], (err, results) => {
        if (err) {
            console.error('Error al verificar los datos:', err);
            return res.render('login.ejs', { error: 'Error al ver   ificar los datos' });

        }
        res.render('index', { results, user_racha, user_name, user_dni, user_pass, user_nac, user_genero, user_peso, user_altura, user_email, user_dieta, user_obj_nut, user_deporte, user_obj_dep, user_frecuencia, user_intensidad })

    })


})

app.get('/datos_us', (req, res) => {
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
    var user_racha = req.session.user_racha
    res.render('datos_us', {  user_racha, user_name, user_dni, user_pass, user_nac, user_genero, user_peso, user_altura, user_email, user_dieta, user_obj_nut, user_deporte, user_obj_dep, user_frecuencia, user_intensidad })
});

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
    var user_intolerancia = req.session.user_intolerancia
    var user_intensidad = req.session.user_intensidad
    res.render('recetas', { user_name, user_intolerancia, user_dni, user_pass, user_nac, user_genero, user_peso, user_altura, user_email, user_dieta, user_obj_nut, user_deporte, user_obj_dep, user_frecuencia, user_intensidad })

})

app.get('/receta_focus/:id_receta', (req, res) => {


    var id_receta = req.params.id_receta
    var data = require('./public/js/info_receta.json')
    const apiId = '31f5fad495dc42f0b38d901ddaf47e9a';

    var url = `https://api.spoonacular.com/recipes/${id_receta}/information?apiKey=${apiId}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            res.render('receta_focus', { data })

        });
    // res.render('receta_focus', { data})
})



app.get('/asesoramiento', (req, res) => {
    const query_ase = 'SELECT * FROM `profesional` WHERE 1';

    connection.query(query_ase, [], (err, results) => {
        if (err) {
            console.error('Error al verificar los datos:', err);
            return res.render('login.ejs', { error: 'Error al verificar los datos' });
        }

        res.render('asesoramiento', { results })
    })
})



app.get('/frases', (req, res) => {

    res.render('frases', {})
})






// // Obtén la fecha actual
const hoy = new Date();
const añoActual = hoy.getFullYear();
const mesActual = String(hoy.getMonth() + 1).padStart(2, '0'); // Se suma 1 porque los meses comienzan desde 0
const díaActual = String(hoy.getDate()).padStart(2, '0');
const fechaActual = `${añoActual}-${mesActual}-${díaActual}`;

// Obtener la fecha del día anterior
const ayer = new Date(hoy);
ayer.setDate(hoy.getDate() - 1);
const añoAyer = ayer.getFullYear();
const mesAyer = String(ayer.getMonth() + 1).padStart(2, '0');
const díaAyer = String(ayer.getDate()).padStart(2, '0');
const fechaAyer = `${añoAyer}-${mesAyer}-${díaAyer}`;


app.post('/enviar', (req, res) => {
    let {
        nombre_regis, apellido_regis, dni, nacimiento, opciones_genero, peso, altura,
        nombre_usuario_regis, email_regis, password_regis, dieta, objetivo_nutricional,
        tipo_deporte, obj_deportivo, frecuencia, intensidad, intolerancia
    } = req.body;

    const query_ant = `
        SELECT DNI, Nombre_usuario, Email 
        FROM usuario 
        WHERE DNI = ? OR Nombre_usuario = ? OR Email = ?
    `;

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
            nombre_regis = capitalizarPrimeraLetra(nombre_regis);
            apellido_regis = capitalizarPrimeraLetra(apellido_regis);
            connection.query(query_usuario, [dni, nombre_usuario_regis, password_regis, nombre_regis, apellido_regis, nacimiento, email_regis, peso, altura, opciones_genero], (err) => {
                if (err) {
                    console.error('Error al insertar en usuario:', err);
                    return res.render('login.ejs', { error: 'Error al registrar el usuario' });
                }

                // Inserción en la tabla `nutricionalusuario`
                const query_nutri = `
                    INSERT INTO nutricionalusuario (DNI_nut, intolerancia, ObjetivoNutricion, TipoAlimentacion)
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

                        // Inserción en la tabla `racha`
                        const fechaActual = obtenerFechaActual()

                        //INSERT INTO racha (Dni_racha,dias,Fecha_ultimo_Ingreso) VALUES (?,?,?,?)
                        const query_racha = `
                            INSERT INTO racha (Dni_racha, dias ,  Fecha_ultimo_Ingreso) VALUES (?, ?, ?)`;
                        connection.query(query_racha, [dni, 1, fechaActual], (err) => {
                            if (err) {
                                console.error('Error al insertar en racha:', err);
                                return res.render('login.ejs', { error: 'Error al registrar la racha' });
                            }

                            // Variables de sesión
                            req.session.user_name = nombre_usuario_regis;
                            req.session.user_dni = dni;
                            req.session.user_pass = password_regis;
                            req.session.user_nac = nacimiento;
                            req.session.user_genero = opciones_genero;
                            req.session.user_peso = peso;
                            req.session.user_altura = altura;
                            req.session.user_email = email_regis;
                            req.session.user_dieta = dieta;
                            req.session.user_intolerancia = intolerancia
                            req.session.user_obj_nut = objetivo_nutricional;
                            req.session.user_deporte = tipo_deporte;
                            req.session.user_obj_dep = obj_deportivo;
                            req.session.user_frecuencia = frecuencia;
                            req.session.user_intensidad = intensidad;
                            req.session.user_fecha_comienzo = fechaActual;

                            res.redirect('/index');
                        });
                    });
                });
            });
        }
    });
});




app.get('/iniciar', (req, res) => {
    const { nombre_ini, password_ini } = req.query;

    const query_ini = 'SELECT * FROM usuario WHERE(Nombre_usuario = ? OR Email = ?) AND password = ? ';
    connection.query(query_ini, [nombre_ini, nombre_ini, password_ini], (err, results) => {
        if (err) {
            return res.render('login.ejs', {
                error: 'Error al verificar los datos'
            });
        }

        if (results.length > 0) {
            const dni = results[0].DNI;
            // Variables de sesión del usuario
            req.session.user_name = results[0].Nombre_usuario;
            req.session.user_dni = results[0].DNI;
            req.session.user_pass = results[0].password;
            req.session.user_nac = results[0].FechaNacimiento;
            req.session.user_email = results[0].Email;
            req.session.user_peso = results[0].Peso;
            req.session.user_altura = results[0].Altura;
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
                    req.session.user_dieta = results[0].TipoAlimentacion;
                    req.session.user_obj_nut = results[0].ObjetivoNutricion;
                }
            });

            const query_deport = `
            SELECT * FROM deportivousuario WHERE DNI_depor = ?`;
            connection.query(query_deport, [dni], (err, results) => {
                if (err) {
                    return res.render('login.ejs', {
                        error: 'Error al verificar los datos'
                    });
                }
                if (results.length > 0) {
                    req.session.user_deporte = results[0].TipoDeporte;
                    req.session.user_obj_dep = results[0].ObjetivosDeportivo;
                    req.session.user_frecuencia = results[0].Frecuencia;
                    req.session.user_intensidad = results[0].Intensidad;
                }
            });

            // Verificar y actualizar racha
            const query_racha = `
            SELECT * FROM racha WHERE Dni_racha = ?`;
            connection.query(query_racha, [dni], (err, results) => {
                if (err) {
                    return res.render('login.ejs', {
                        error: 'Error al verificar la racha'
                    });
                }
                if (results.length > 0) {
                    let racha = results[0].dias;
                    let fechaUltimoIngreso = results[0].Fecha_ultimo_Ingreso; // Asumiendo que esta es una fecha en formato ISO
                    let fecha = new Date(fechaUltimoIngreso);

                    let anio = fecha.getFullYear();
                    let mes = ("0" + (fecha.getMonth() + 1)).slice(-2); // Sumamos 1 porque getMonth() devuelve un índice 0-11
                    let dia = ("0" + fecha.getDate()).slice(-2);

                    let fechaFormateada = `${anio}-${mes}-${dia}`;
                    fechaUltimoIngreso = fechaFormateada;

                    // Asegúrate de que fechaAyer y fechaActual estén también en formato YYYY-MM-DD
                    if (fechaUltimoIngreso === fechaAyer) {
                        // Incrementa la racha
                        racha++;
                    } else if (fechaUltimoIngreso < fechaAyer) {
                        // Si el usuario no ingresó ayer, se reinicia la racha
                        racha = 1;
                    }

                    req.session.user_racha = racha
                    // Actualiza la fecha del último ingreso y la racha
                    const query_actualizar_racha = `
                    UPDATE racha SET Fecha_ultimo_Ingreso = ?, dias = ? WHERE Dni_racha = ?`;
                    connection.query(query_actualizar_racha, [fechaActual, racha, dni], (err) => {
                        if (err) {
                            return res.render('login.ejs', {
                                error: 'Error al actualizar la racha'
                            });
                        }
                        // Redirigir a la página de inicio
                        return res.redirect('/index');
                    });
                }
            });
        } else {
            return res.render('login.ejs', {
                error: 'Usuario o contraseña incorrectos'
            });
        }
    });
});



// Encender servidor
app.listen(3000, () => {
    console.log('Servidor encendido')
})

module.exports = app



function obtenerFechaActual() {
    const fecha = new Date();
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 (enero) a 11 (diciembre)
    const día = String(fecha.getDate()).padStart(2, '0');

    return `${año}-${mes}-${día}`;
}
function capitalizarPrimeraLetra(texto) {
    if (!texto) return '';
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}