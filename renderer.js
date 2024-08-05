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


// // Sentencia SQL para insertar datos


// parte de los addlisterner de el form
const btn_iniciar = document.getElementById("btn_iniciar");
const btn_registrar = document.getElementById("btn_registrar");
const btn_enviar_sesion = document.getElementById("btn_enviar_sesion");
const cont_registrar = document.getElementById("cont_registrar");
const cont_iniciar = document.getElementById("cont_iniciar");
const datos_personales = document.getElementById("datos_personales");
const datos_nutricionales = document.getElementById("datos_nutricionales");
const datos_fisicos = document.getElementById("datos_fisicos");

// Inicializa el primer formulario como visible
let formularioActual = 0;


btn_iniciar.addEventListener("click", () => {
    btn_registrar.classList.toggle("activo");
    btn_iniciar.classList.toggle("activo");
    cont_registrar.classList.toggle("desac");
    cont_iniciar.classList.toggle("desac");
})
btn_registrar.addEventListener("click", () => {
    btn_registrar.classList.toggle("activo");
    btn_iniciar.classList.toggle("activo");
    cont_registrar.classList.toggle("desac");
    cont_iniciar.classList.toggle("desac");

})

btn_enviar_sesion.addEventListener("click", () => {
    const nombre_ini = document.getElementById('nombre_ini').value;
    const password_ini = document.getElementById('password_ini').value;
    event.preventDefault();
    // // Ejecutar la consulta
   
    const query = 'SELECT * FROM usuario WHERE Nombre_usuario = ? AND password = ?';
    connection.query(query, [nombre_ini, password_ini], (error, results) => {
        if (error) {
           console.log("error")
            return;
        }

        if (results.length > 0) {
           
            alert("JJ")
            
        } else {
          console.log('Nombre de usuario o contraseña incorrectos' );
        }
    });
    
})


const texto_span = [
    "Paso 1: Datos básicos.",
    "Paso 2: Datos de acceso",
    "Paso 3: Datos nutricionales",
    "Paso 4: Datos deportivos"
];
const cont_registro= document.getElementById("registro");
const contenedor = document.getElementById('cont_registrar');
const subForms = contenedor.getElementsByClassName('sub_form');
const botones = contenedor.getElementsByClassName('btn_enviar_sesion');
const botones_atras = contenedor.getElementsByClassName('btn_atras');
const texto_regs = document.getElementById("texto_regs");
function btn_siguiente() {

    if (formularioActual === 0) {
        texto_regs.innerHTML = texto_span[formularioActual];
        subForms[formularioActual].classList.remove("desac");
    }

    // añade el event listener cuando haga click
    Array.from(botones).forEach((boton, indice) => {
        boton.addEventListener('click', function (event) {
            // Evita que el formulario se envíe y recargue la página
            event.preventDefault();

            if (formularioActual < subForms.length - 1) {
                subForms[formularioActual].classList.add("desac");
                formularioActual++;
                subForms[formularioActual].classList.remove("desac");
                texto_regs.innerHTML = texto_span[formularioActual];
            } else if (formularioActual === subForms.length - 1) {
                formularioActual++;
                cont_registro.classList.add("desac");
                // //Recolectar datos de cada formulario
                // if (index === 0) {
                //     formData.nombreCompleto = document.querySelector('#datos_personales input[type="text"]').value;
                //     formData.dni = document.querySelector('#datos_personales input[type="number"]').value;
                //     formData.fechaNacimiento = document.querySelector('#datos_personales input[type="date"]').value;
                //     formData.genero = document.querySelector('#datos_personales select#opciones').value;
                //     formData.peso = document.querySelector('#datos_personales input[placeholder="Escriba su peso en kgs"]').value;
                //     formData.altura = document.querySelector('#datos_personales input#altura').value;
                // } else if (index === 1) {
                //     formData.nombreUsuario = document.querySelector('#datos_acceso input[type="text"]').value;
                //     formData.email = document.querySelector('#datos_acceso input[type="email"]').value;
                //     formData.password = document.querySelector('#datos_acceso input[type="password"]').value;
                // } else if (index === 2) {
                //     formData.tipoDieta = document.querySelector('#datos_nutricionales select#dieta').value;
                //     formData.objetivoNutricional = document.querySelector('#datos_nutricionales select#objetivo_nutricional').value;
                // } else if (index === 3) {
                //     formData.deporte = document.querySelector('#datos_deportivos input[placeholder="Eliga su deportivo"]').value;
                //     formData.objetivoDeportivo = document.querySelector('#datos_deportivos input[placeholder="Eliga su Objetivo deportivo"]').value;
                //     formData.frecuencia = document.querySelector('#datos_deportivos input[placeholder="Frecuencia con la que realiza el deporte"]').value;
                //     formData.intensidad = document.querySelector('#datos_deportivos input[placeholder="Intensidad con la que realiza el deporte"]').value;

                //     // Al hacer clic en el último botón "Siguiente", enviar los datos al servidor
                   
                // }
                // enviarDatosAlServidor(formData);
              
            }
        });
    });
    // añade el event listener cuando haga click
    Array.from(botones_atras).forEach((boton, indice) => {
        boton.addEventListener('click', function (event) {
            // Evita que el formulario se envíe y recargue la página

            event.preventDefault();

            if (formularioActual < subForms.length && formularioActual > 0) {
                subForms[formularioActual].classList.add("desac");
                formularioActual--;
                subForms[formularioActual].classList.remove("desac");
                texto_regs.innerHTML = texto_span[formularioActual];
            }
        });
    });
}
btn_siguiente();



