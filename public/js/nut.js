// datos del html
const dataNutri = document.getElementById('data_nut');
var peso = parseFloat(dataNutri.getAttribute("data-peso"));
const genero = dataNutri.getAttribute("data-genero");
var fecha_nac = parseInt(dataNutri.getAttribute("data-nac"));
const edad = calcularEdad(fecha_nac);
const altura = parseFloat(dataNutri.getAttribute("data-altura"));
const objetivoNutricional = dataNutri.getAttribute("data-obj-nut");



function calcularIMC(peso, altura) {
    // Convertir la altura a metros,si está en centímetros
    let alturaEnMetros = altura / 100;
    let imc = peso / (alturaEnMetros * alturaEnMetros);
    // Redondear el IMC a una cifra decimal
    return imc.toFixed(1);
}

function interpretarIMC(imc, edad, genero) {
    let categoria;

    // Interpretación basada en el IMC
    if (imc < 18.5) {
        categoria = "Bajo peso";
    } else if (imc < 25) {
        categoria = "Peso normal";
    } else if (imc < 30) {
        categoria = "Sobrepeso";
    } else {
        categoria = "Obesidad";
    }

    // Ajustes según la edad y genero
    if (edad >= 65) {
        if (genero === "F" && imc < 23) {
            categoria = "Bajo peso (mayor riesgo en mujeres mayores de 65 años)";
        } else if (genero === "M" && imc < 23) {
            categoria = "Bajo peso (mayor riesgo en hombres mayores de 65 años)";
        }
    }

    if (edad < 18) {
        // Para menores de edad, el IMC se interpreta de manera diferente
        categoria = "Interpretación para menores de edad requiere percentiles específicos";
    }

    return categoria;
}

function posicionarIndicador(imc) {
    const indicator = document.querySelector('.indicator');
    let leftPosition;

    if (imc < 18.5) {
        leftPosition = "10%"; // Bajo peso
    } else if (imc < 25) {
        leftPosition = "35%"; // Peso normal
    } else if (imc < 30) {
        leftPosition = "70%"; // Sobrepeso
    } else {
        leftPosition = "90%"; // Obesidad
    }

    indicator.style.left = leftPosition;
}

// Calcular IMC
let imc = calcularIMC(peso, altura);
let categoria = interpretarIMC(imc, edad, genero);

// Mostrar resultados en el DOM
const imcValueElement = document.querySelector('.imc-value');
const suggestionElement = document.querySelector('.suggestion');
if (imcValueElement) {
    imcValueElement.textContent = imc;
    alert(categoria)
    // Puedes cambiar el color según la categoría
    if (categoria === "Bajo peso") {
        imcValueElement.style.color = "#ffc107"; // Amarillo
    } else if (categoria === "Peso normal") {
        
        imcValueElement.style.color = "#28a745"; // Verde
    } else if (categoria === "Sobrepeso") {
        imcValueElement.style.color = "#17a2b8"; // Azul
    } else {
        imcValueElement.style.color = "#dc3545"; // Rojo
    }
}

posicionarIndicador(imc);
function calcularEdad(fechaNacimiento) {
    // Convertir la fecha de nacimiento a un objeto Date
    const nacimiento = new Date(fechaNacimiento);

    // Obtener la fecha actual
    const hoy = new Date();

    // Calcular la diferencia de años
    let edad = hoy.getFullYear() - nacimiento.getFullYear();

    // Ajustar si la fecha de nacimiento no ha ocurrido aún este año
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }

    return edad;
}