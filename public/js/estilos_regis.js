
// parte de los addlisterner de el form
const btn_iniciar = document.getElementById("btn_iniciar");
const btn_registrar = document.getElementById("btn_registrar");
const cont_registrar = document.getElementById("cont_registrar");
const cont_iniciar = document.getElementById("cont_iniciar");
//uso de las depencias para hashear contras


//  registro
btn_registrar.addEventListener("click", () => {
    btn_registrar.classList.toggle("activo");
    btn_iniciar.classList.toggle("activo");
    cont_registrar.classList.toggle("desac");
    cont_iniciar.classList.toggle("desac");
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