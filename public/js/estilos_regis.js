

// Inicializa el primer formulario como visible
let formularioActual = 0;


const cont_registro = document.getElementById("registro");
const contenedor = document.getElementById('cont_registrar');
const subForms = contenedor.getElementsByClassName('sub_form');
const botones = contenedor.getElementsByClassName('btn_enviar_sesion');
const botones_atras = contenedor.getElementsByClassName('btn_atras');
const texto_regs = document.getElementById("texto_regs");
const opc = contenedor.getAttribute("data-opc");
var texto_span = [
    "Paso 1: Datos básicos.",
    "Paso 2: Datos de acceso",
    "Paso 3: Datos nutricionales",
    "Paso 4: Datos deportivos"
];
if (opc === "enviar_2") {
    texto_span = [
        "Paso 2: Datos de acceso",
        "Paso 3: Datos nutricionales",
        "Paso 4: Datos deportivos"
    ];
}
function btn_siguiente() {

    if (formularioActual === 0 ) {
        texto_regs.innerHTML = texto_span[formularioActual];
        subForms[formularioActual].classList.remove("desac");

    }

    // añade el event listener cuando haga click
    Array.from(botones).forEach((boton) => {
        boton.addEventListener("click", function (event) {
            // Variable para verificar si todos los campos están completos
            let inputs = subForms[formularioActual].querySelectorAll(".input");
            let camposCompletos = true;

            // Recorre todos los inputs y verifica si alguno está vacío
            inputs.forEach((element) => {
                if (element.value === "") {
                    alert("Complete el campo: " + (element.placeholder || element.name));
                    camposCompletos = false;
                }
            });

            // Solo avanza al siguiente formulario si todos los campos están completos
            if (camposCompletos) {
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