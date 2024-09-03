document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('modal-info');
    const modalNombre = document.getElementById('modal-nombre');
    const modalEdad = document.getElementById('modal-edad');
    const modalProfesion = document.getElementById('modal-profesion');
    const modalDescripcion = document.getElementById('modal-descripcion');
    const closeBtn = document.querySelector('.modal .close');

    document.querySelectorAll('.more-info').forEach(button => {
        button.addEventListener('click', function () {
            const nombre = this.getAttribute('data-nombre');
            const edad = this.getAttribute('data-edad');
            const profesion = this.getAttribute('data-profesion');
            const descripcion = this.getAttribute('data-descripcion');

            modalNombre.textContent = nombre;
            modalEdad.textContent = edad;
            modalProfesion.textContent = profesion;
            modalDescripcion.textContent = descripcion;

            modal.style.display = 'flex';
            modal.classList.add('show');
        });
    });

    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
        modal.classList.remove('show');
    });

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            modal.classList.remove('show');
        }
    });
});
/* 
calculos para calcular la distribucion de macro nutrientes.


1-Calcular el Gasto Energético Basal (BMR)
    *calculo para hombres:
    BMR=88.362+(13.397×peso en kg)+(4.799×altura en cm)−(5.677×edad en años)
    *Para mujeres:
    BMR=447.593+(9.247×peso en kg)+(3.098×altura en cm)−(4.330×edad en años)

2-Calcular el Gasto Energético Total (TDEE)

    Sedentario (poco o ningún ejercicio): BMR × 1.2
    Ligera actividad (ejercicio ligero 1-3 días a la semana): BMR × 1.375
    Moderada actividad (ejercicio moderado 3-5 días a la semana): BMR × 1.55
    Alta actividad (ejercicio intenso 6-7 días a la semana): BMR × 1.725
    Extremadamente activo (ejercicio muy intenso o trabajo físico muy demandante): BMR × 1.9

*/

function calcularMacros(edad, peso, altura, nivelActividad, objetivo) {
    // Calcular el BMR usando la fórmula de Harris-Benedict para hombres y mujeres
    function calcularBMR(sexo, peso, altura, edad) {
        if (sexo === 'masculino') {
            return 88.362 + (13.397 * peso) + (4.799 * altura) - (5.677 * edad);
        } else {
            return 447.593 + (9.247 * peso) + (3.098 * altura) - (4.330 * edad);
        }
    }

    // Factor de actividad
    function obtenerFactorActividad(nivelActividad) {
        switch (nivelActividad) {
            case 'sedentario': return 1.2;
            case 'ligera': return 1.375;
            case 'moderada': return 1.55;
            case 'activa': return 1.725;
            case 'muy activa': return 1.9;
            default: return 1.2;
        }
    }

    // Distribución de macronutrientes para cada objetivo
    const macros = {
        mantener: { proteina: 0.20, grasa: 0.30, carbohidratos: 0.50 },
        perder: { proteina: 0.30, grasa: 0.30, carbohidratos: 0.40 },
        ganar: { proteina: 0.25, grasa: 0.30, carbohidratos: 0.45 }
    };

    // Seleccionar la distribución según el objetivo
    const macrosSeleccionados = macros[objetivo] || macros.mantener;

    // Calcular BMR y TDEE
    const BMR = calcularBMR('masculino', peso, altura, edad); // Ajusta 'masculino' a 'femenino' si es necesario
    const factorActividad = obtenerFactorActividad(nivelActividad);
    const TDEE = BMR * factorActividad;

    // Calcular las calorías y gramos de macronutrientes
    const caloriasProteina = TDEE * macrosSeleccionados.proteina;
    const caloriasGrasa = TDEE * macrosSeleccionados.grasa;
    const caloriasCarbohidratos = TDEE * macrosSeleccionados.carbohidratos;

    const gramosProteina = caloriasProteina / 4; // 4 calorías por gramo de proteína
    const gramosGrasa = caloriasGrasa / 9; // 9 calorías por gramo de grasa
    const gramosCarbohidratos = caloriasCarbohidratos / 4; // 4 calorías por gramo de carbohidrato

    return {
        TDEE,
        gramosProteina,
        gramosGrasa,
        gramosCarbohidratos
    };
}

// Ejemplo de uso
const edad = 30; // Edad en años
const peso = 70; // Peso en kg
const altura = 175; // Altura en cm
const nivelActividad = 'moderada'; // Nivel de actividad
const objetivo = 'mantener'; // Objetivo: 'mantener', 'perder', 'ganar'

const resultado = calcularMacros(edad, peso, altura, nivelActividad, objetivo);

console.log(`TDEE: ${resultado.TDEE.toFixed(2)} calorías`);
console.log(`Proteínas: ${resultado.gramosProteina.toFixed(2)} gramos`);
console.log(`Grasas: ${resultado.gramosGrasa.toFixed(2)} gramos`);
console.log(`Carbohidratos: ${resultado.gramosCarbohidratos.toFixed(2)} gramos`);
