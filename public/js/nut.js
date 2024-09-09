


// datos del html
const dataNutri = document.getElementById('data_nut');
var peso = parseFloat(dataNutri.getAttribute("data-peso"));
const genero = dataNutri.getAttribute("data-genero");
var fecha_nac = parseInt(dataNutri.getAttribute("data-nac"));
const edad = calcularEdad(fecha_nac);
const altura = parseFloat(dataNutri.getAttribute("data-altura"));
const objetivoNutricional = dataNutri.getAttribute("data-obj-nut");
const frecuencia = dataNutri.getAttribute("data-frecuencia");
const intensidad = dataNutri.getAttribute("data-intensidad");
const obj_nut = dataNutri.getAttribute("data-obj-nut");
var suggestion = document.getElementById("suggestion");
const cont_rec = document.getElementById("cont_rec");
const valor_rec = document.getElementById("valor_rec");
const categoria_cal_dom = document.getElementById("categoria_cal_dom");

const info = document.querySelectorAll(".info");
const question = document.querySelectorAll(".question");

question.forEach((qst, index) => {
    qst.addEventListener("click", () => {
        // Alternar la clase 'desac' en el contenedor info correspondiente
        info[index].classList.toggle("desac");
    });
});









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
const categoria_dom = document.getElementById("categoria")

if (imcValueElement) {
    imcValueElement.textContent = imc;
    let alturaEnMetros = altura / 100;
    var text_suggestion = promedio_peso(alturaEnMetros)
    suggestion.textContent = text_suggestion;
    categoria_dom.textContent = categoria
    // Puedes cambiar el color según la categoría
    if (categoria === "Bajo peso") {
        imcValueElement.style.color = "#ffc107"; // Amarillo
        categoria_dom.style.color = "#ffc107"; // Amarillo
    } else if (categoria === "Peso normal") {
        imcValueElement.style.color = "#28a745"; // Verde
        categoria_dom.style.color = "#28a745"; // Verde
    } else if (categoria === "Sobrepeso") {
        imcValueElement.style.color = "#17a2b8"; // Azul
        categoria_dom.style.color = "#17a2b8"; // Azul
    } else {
        imcValueElement.style.color = "#dc3545"; // Rojo
        categoria_dom.style.color = "#dc3545"; // Rojo
    }
}

promedio_peso(altura)





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

function promedio_peso(alturaEnMetros) {
    imc_menor = 18.5 * (alturaEnMetros * alturaEnMetros)
    imc_mayor = 24.9 * (alturaEnMetros * alturaEnMetros)
    return `Su rango de peso saludable mediante su altura va desde ${imc_menor.toFixed(1)} Kg hasta ${imc_mayor.toFixed(1)} Kg`
}
var TMB;
var categoria_cal
var calorias_consumir;
categoria_cal = calculo_TMB(peso, altura, edad, genero)
valor_rec.textContent = calorias_consumir;
categoria_cal_dom.textContent = categoria_cal;
function calculo_TMB(peso, altura, edad, genero) {
    let categoria;
    if (genero === "M") {
        TMB = (10 * peso) + (6.25 * altura) - (5 * edad) + 5
    }
    else if (genero === "F") {
        TMB = (10 * peso) + (6.25 * altura) - (5 * edad) - 161
    }

    if (frecuencia == "3/7") {
        calorias_consumir = TMB * 1.375
    }
    else if (frecuencia == "4/7") {
        calorias_consumir = TMB * 1.55
    }
    else if (frecuencia == "5/7") {
        calorias_consumir = TMB * 1.55
    }
    else if (frecuencia == "6/7") {
        calorias_consumir = TMB * 1.725
    }
    else if (frecuencia == "7/7") {
        calorias_consumir = TMB * 1.725
    }
    else if (frecuencia == "7/7" && intensidad == "Alta") {
        calorias_consumir = TMB * 1.9
    }

    if (obj_nut == "Pérdida de peso") {
        categoria = "Déficit calórico";
        calorias_consumir -= 400;
    }
    else if (obj_nut == "Ganar peso") {
        categoria = "Superávit calórico";
        calorias_consumir += 300;
    }
    calorias_consumir = calorias_consumir.toFixed(1);
    return categoria;
}

const getDataColors = opacity => {
    const colors = ['#32a852', '#2a9d8f', '#264653', '#f4f4f4', '#ffffff', '#5c5c5c', '#ffc300', '#003566']
    return colors.map(color => opacity ? `${color + opacity}` : color)
}
const printChart = (calorias, obj_nut) => {
    const resultado = distribucion_macros(calorias, obj_nut);
    renderModelChart(resultado);
}
const renderModelChart = (macros) => {
    const totalGramos = macros.grasas + macros.proteinas + macros.carbohidratos;
    
    const data = {
        labels: ['Grasas', 'Proteínas', 'Carbohidratos'],
        datasets: [{
            data: [
                parseFloat(macros.grasas.toFixed(1)),       // Grasas
                parseFloat(macros.proteinas.toFixed(1)),    // Proteínas
                parseFloat(macros.carbohidratos.toFixed(1)) // Carbohidratos
            ],
            borderColor: getDataColors(0),
            backgroundColor: getDataColors(20)
        }]
    };

    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        const value = tooltipItem.raw;
                        return value + ' g'; // Agrega el signo de gramos 'g'
                    }
                }
            },
            datalabels: {
                formatter: (value) => {
                    const porcentaje = (value / totalGramos * 100).toFixed(1);
                    return porcentaje + '% ';
                },
                color: '#fff',
                font: {
                    weight: 'bold'
                }
            }
        }
    };

    new Chart('modelsChart', {
        type: 'doughnut',
        data: data,
        options: options,
        plugins: [ChartDataLabels] 
    });
}

// Función que calcula la distribución de macronutrientes
function distribucion_macros(calorias, obj_nut) {
    let macros = {
        carbohidratos: 0,
        proteinas: 0,
        grasas: 0
    };

    // Distribuciones por objetivo nutricional
    switch (obj_nut) {
        case "Mantener peso":
            macros.carbohidratos = 0.55; 
            macros.proteinas = 0.20;    
            macros.grasas = 0.25;      
            break;

        case "Pérdida de peso":
            macros.carbohidratos = 0.40; 
            macros.proteinas = 0.35;    
            macros.grasas = 0.25;  
            break;

        case "Ganar peso":
            macros.carbohidratos = 0.50;
            macros.proteinas = 0.25;     
            macros.grasas = 0.25;     
            break;
    }

    // Cálculo de gramos de macronutrientes basado en calorías
    let gramos_carbohidratos = (calorias * macros.carbohidratos) / 4;
    let gramos_proteinas = (calorias * macros.proteinas) / 4;
    let gramos_grasas = (calorias * macros.grasas) / 9;

    return {
        carbohidratos: gramos_carbohidratos,
        proteinas: gramos_proteinas,
        grasas: gramos_grasas
    };
}

// renderizar el gráfico con los datos calculados
printChart(calorias_consumir, obj_nut);
