const express = require('express');
const path = require('node:path');
const mysql = require('mysql2');
const session = require('express-session');

// Clase para gestionar la conexión a la base de datos
class Database {
    constructor(config) {
        this.connection = mysql.createConnection(config);
    }

    query(sql, params) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, params, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }
}

// Clase para gestionar la sesión de usuario
class UserSession {
    constructor(req) {
        this.req = req;
    }

    isLoggedIn() {
        return this.req.session.user_name && typeof this.req.session.user_name !== 'undefined';
    }

    setSessionData(data) {
        Object.assign(this.req.session, data);
    }

    getSessionData() {
        return this.req.session;
    }
}

// Clase para gestionar las rutas y la lógica de negocio
class AppRoutes {
    constructor(app, db) {
        this.app = app;
        this.db = db;
        this.initRoutes();
    }

    initRoutes() {
        // Rutas principales
        this.app.get('/', (req, res) => this.login(req, res));
        this.app.post('/calendario/chequear/:valor/:id_act', (req, res) => this.updateActividad(req, res));
        this.app.post('/calendario/update/:fechaFormateada', (req, res) => this.updateCalendario(req, res));
        this.app.post('/nueva_actividad', (req, res) => this.nuevaActividad(req, res));
        this.app.get('/nutricion', (req, res) => this.renderNutricion(req, res));
        this.app.get('/index', (req, res) => this.renderIndex(req, res));
        this.app.get('/recetas', (req, res) => this.renderRecetas(req, res));
        this.app.get('/receta_focus/:id_receta', (req, res) => this.renderRecetaFocus(req, res));
        this.app.get('/asesoramiento', (req, res) => this.renderAsesoramiento(req, res));
        this.app.get('/frases', (req, res) => this.renderFrases(req, res));
        this.app.post('/enviar', (req, res) => this.registrarUsuario(req, res));
    }

    // Controladores
    login(req, res) {
        const userSession = new UserSession(req);
        if (userSession.isLoggedIn()) {
            res.redirect('/index');
        } else {
            res.render('login', {});
        }
    }

    async updateActividad(req, res) {
        const { valor, id_act } = req.params;
        const updateQuery = 'UPDATE actividad_dia SET MarcadorCumplido = ? WHERE ID_act = ?';
        const newValue = valor === 'true' ? 1 : 0;
        try {
            await this.db.query(updateQuery, [newValue, id_act]);
            res.status(200).send('Actividad actualizada');
        } catch (err) {
            console.error('Error al actualizar actividad:', err);
            res.status(500).send('Error en el servidor');
        }
    }

    async updateCalendario(req, res) {
        const { fechaFormateada } = req.params;
        const userSession = new UserSession(req);
        const user = userSession.getSessionData();
        const query = 'SELECT * FROM actividad_dia WHERE Dni_act = ? AND Fecha = ?';

        try {
            const results = await this.db.query(query, [user.user_dni, fechaFormateada]);
            res.render('index', { results, ...user });
        } catch (err) {
            console.error('Error al actualizar calendario:', err);
            res.status(500).render('login', { error: 'Error al verificar los datos' });
        }
    }

    async nuevaActividad(req, res) {
        const userSession = new UserSession(req);
        const user_dni = userSession.getSessionData().user_dni;
        const { info_act, fecha_act } = req.body;
        const query = 'INSERT INTO actividad_dia(Dni_act, Fecha, Objetivos, MarcadorCumplido) VALUES (?,?,?,?)';

        try {
            await this.db.query(query, [user_dni, fecha_act, info_act, 0]);
            res.redirect('/index');
        } catch (err) {
            console.error('Error al agregar nueva actividad:', err);
            res.render('login', { error: 'Error al verificar los datos' });
        }
    }

    renderNutricion(req, res) {
        const userSession = new UserSession(req);
        const user = userSession.getSessionData();
        res.render('nutricion', user);
    }

    async renderIndex(req, res) {
        const userSession = new UserSession(req);
        if (!userSession.isLoggedIn()) {
            return res.redirect('/');
        }

        const user = userSession.getSessionData();
        const today = new Date();
        const fechaFormateada = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        const query = 'SELECT * FROM actividad_dia WHERE Dni_act = ? AND Fecha = ?';

        try {
            const results = await this.db.query(query, [user.user_dni, fechaFormateada]);
            res.render('index', { results, ...user });
        } catch (err) {
            console.error('Error al obtener actividades del día:', err);
            res.render('login', { error: 'Error al verificar los datos' });
        }
    }

    renderRecetas(req, res) {
        const userSession = new UserSession(req);
        const user = userSession.getSessionData();
        res.render('recetas', user);
    }

    renderRecetaFocus(req, res) {
        const { id_receta } = req.params;
        const apiId = '31f5fad495dc42f0b38d901ddaf47e9a';
        const url = `https://api.spoonacular.com/recipes/${id_receta}/information?apiKey=${apiId}`;

        fetch(url)
            .then(response => response.json())
            .then(data => res.render('receta_focus', { data }))
            .catch(err => {
                console.error('Error al obtener los datos de la receta:', err);
                res.status(500).send('Error en el servidor');
            });
    }

    async renderAsesoramiento(req, res) {
        const query = 'SELECT * FROM profesional WHERE 1';
        try {
            const results = await this.db.query(query);
            res.render('asesoramiento', { results });
        } catch (err) {
            console.error('Error al obtener asesoramiento:', err);
            res.status(500).send('Error en el servidor');
        }
    }

    renderFrases(req, res) {
        res.render('frases', {});
    }

    async registrarUsuario(req, res) {
        // Procesar el registro de usuario y manejar la lógica similar al código original
        // Aquí se mantendrá la lógica, pero organizada en métodos separados.
    }
}

// Configuración del servidor y base de datos
const app = express();
const db = new Database({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'proyecto_deportologico',
});

// Configuración de vistas y middlewares
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
}));

// Inicializar rutas
new AppRoutes(app, db);

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});
