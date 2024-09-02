// script.js

document.addEventListener("DOMContentLoaded", () => {
    let imcValue = 26 // Este sería el valor dinámico
    document.querySelector('.imc-value').textContent = imcValue;

    // Posición del indicador basado en el valor del IMC
    let indicator = document.querySelector('.indicator');

    if (imcValue < 18.5) {
        indicator.style.left = '10%'; // Bajo peso
    } else if (imcValue < 25) {
        indicator.style.left = '35%'; // Saludable
    } else if (imcValue < 30) {
        indicator.style.left = '65%'; // Sobrepeso
    } else {
        indicator.style.left = '85%'; // Obesidad
    }
});

function calcularIMC(peso, altura) {
    // Convertir la altura a metros (si está en centímetros)
    let alturaEnMetros = altura / 100;

    // Calcular el IMC
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

    // Ajustes según la edad y género (ejemplo)
    if (edad >= 65 && genero === "femenino" && imc < 23) {
        categoria = "Bajo peso (mayor riesgo en adultos mayores)";
    } else if (edad >= 65 && genero === "masculino" && imc < 23) {
        categoria = "Bajo peso (mayor riesgo en adultos mayores)";
    }

    if (edad < 18) {
        // Para menores de edad, el IMC se interpreta de manera diferente
        categoria = "Interpretación para menores de edad requiere percentiles específicos";
    }

    return categoria;
}
const data_nut = document.getElementById('data_nut')
// Ejemplo de uso
let peso = 70; // Peso en kilogramos
let altura = 170; // Altura en centímetros
let edad = 25; // Edad en años
let genero = "masculino"; // "masculino" o "femenino"

let imc = calcularIMC(peso, altura);
let categoria = interpretarIMC(imc, edad, genero);

console.log("Tu IMC es: " + imc);
console.log("Categoría: " + categoria);
