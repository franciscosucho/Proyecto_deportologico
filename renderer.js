const mysql = require('mysql2');
const { ipcRenderer } = require('electron');
// parte de los addlisterner de el form
const btn_iniciar = document.getElementById("btn_iniciar");
const btn_registrar = document.getElementById("btn_registrar");
const cont_registrar = document.getElementById("cont_registrar");
const cont_iniciar = document.getElementById("cont_iniciar");

//  registro
btn_registrar.addEventListener("click", () => {
    btn_registrar.classList.toggle("activo");
    btn_iniciar.classList.toggle("activo");
    cont_registrar.classList.toggle("desac");
    cont_iniciar.classList.toggle("desac");
});
document.getElementById('btn_enviar_registro').addEventListener('click', (event) => {
    event.preventDefault();  // Evita que la página se recargue
    // para llenar la tabla usurario
    const dni = document.getElementById('dni').value.trim();
    const nombre_usuario = document.getElementById('nombre_usuario_regis').value.trim();
    const password = document.getElementById('password_regis').value.trim();
    const nombre_regis = document.getElementById('nombre_regis').value.trim();
    const apellido_regis = document.getElementById('apellido_regis').value.trim();
    const fechaNacimiento = document.getElementById('nacimiento').value.trim();
    const email = document.getElementById('email_regis').value.trim();
    const peso = document.getElementById('peso').value.trim();
    const altura = document.getElementById('altura').value.trim();
    const dieta = document.getElementById('dieta').value.trim();
    const objetivo_nutricional = document.getElementById('objetivo_nutricional').value.trim();
    const tipo_deporte = document.getElementById('tipo_deporte').value.trim();
    const obj_deportivo = document.getElementById('obj_deportivo').value.trim();
    const frecuencia = document.getElementById('frecuencia').value.trim();
    const intensidad = document.getElementById('intensidad').value.trim();
    const genero = document.getElementById('opciones_genero').value.trim();

    if (dni && nombre_usuario && obj_deportivo && dieta && objetivo_nutricional && tipo_deporte && frecuencia && intensidad && password && apellido_regis && nombre_regis && fechaNacimiento && email && peso && altura && genero) {
        const formData = {
            dni,
            nombre_usuario,
            password,
            nombre_regis,
            apellido_regis,
            fechaNacimiento,
            email,
            peso,
            altura,
            genero,
            //datos de dieta
            objetivo_nutricional,
            dieta,
            //datos deportivos
            obj_deportivo,
            tipo_deporte,
            frecuencia,
            intensidad
        };


        // Enviar datos al proceso principal
        ipcRenderer.send('submit-registration', formData);
        document.getElementById("ventana_prin").classList.toggle("desac")
        document.getElementById("registro").classList.toggle("desac")
    } else {
        alert("Por favor, complete todos los campos.");
    }
});



// logeo
document.getElementById('btn_ini_sesion').addEventListener('click', (event) => {
    event.preventDefault();  // Evita que la página se recargue

    // datos del logeo
    const nombre_ini = document.getElementById('nombre_ini').value.trim();
    const email_ini = document.getElementById('nombre_ini').value.trim();
    const password_ini = document.getElementById('password_ini').value.trim();

    if (nombre_ini && email_ini && password_ini) {
        const data_ini = {
            nombre_ini,
            email_ini,
            password_ini,
        };

        // Enviar datos al proceso principal
        ipcRenderer.send('submit-ini', data_ini);
    } else {
        alert("Por favor, complete todos los campos.");
    }
});

// Escuchar la respuesta del proceso principal
ipcRenderer.on('login-response', (event, response) => {
    if (response === 'success') {
        // Si el logeo fue exitoso, cambiar la visibilidad de las ventanas
        document.getElementById("ventana_prin").classList.toggle("desac");
        document.getElementById("registro").classList.toggle("desac");
    } else {
        alert(response);  // Mostrar un mensaje de error si la autenticación falla
    }
});

// Inicializa el primer formulario como visible
let formularioActual = 0;


btn_iniciar.addEventListener("click", () => {
    btn_registrar.classList.toggle("activo");
    btn_iniciar.classList.toggle("activo");
    cont_registrar.classList.toggle("desac");
    cont_iniciar.classList.toggle("desac");
})

const texto_span = [
    "Paso 1: Datos básicos.",
    "Paso 2: Datos de acceso",
    "Paso 3: Datos nutricionales",
    "Paso 4: Datos deportivos"
];
const cont_registro = document.getElementById("registro");
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



