const express = require('express')

const path = require('node:path')

const app = express()

// Configuracion
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', (req, res) => {
    res.render('formulario', { titulo: 'ewjk3340984323412' })
})

app.post

// Encender servidor
app.listen(3000, () => {
    console.log('Servidor encendido')
})