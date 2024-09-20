// Función para leer y guardar los datos de los divs con clase 'actividades'
function leerYGuardarDatos() {
    // Obtener todos los divs que contienen la información
    const divs = document.querySelectorAll('.actvidades');
    const datosGuardados = [];

    // Recorrer todos los divs y extraer los datos
    divs.forEach(div => {
        // Obtener el valor de la fecha y convertirla a formato 'día/mes/año'
        let fechaCompleta = div.getAttribute('data-fecha');
        let fecha = new Date(fechaCompleta);
        let fechaFormateada = fecha.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        // Obtener el valor del progreso
        let valor = div.getAttribute('data-valor');

        // Guardar la información en el array
        datosGuardados.push({
            fecha: fechaFormateada,
            valor: parseFloat(valor) // Convertir valor a número para usar en el gráfico
        });
    });

    // Retornar el array con los datos
    return datosGuardados;
}

// Llamar a la función para obtener los datos
const resultados = leerYGuardarDatos();
let fechas = [];
let valores = [];

// Rellenar los arrays con las fechas y los valores
resultados.forEach(actividad => {
    fechas.push(actividad.fecha);
    valores.push(actividad.valor);
});

// Función para renderizar el gráfico usando Chart.js
const renderChart = () => {
    const ctx = document.getElementById('activityChart').getContext('2d');

    // Datos del gráfico
    const data = {
        labels: fechas, // Fechas en el eje X
        datasets: [{
            label: 'Progreso en la actividad',
            data: valores, // Valores en el eje Y
            borderColor: 'rgba(62, 144, 95, 1)', // Color de la línea
            backgroundColor: 'rgba(62, 144, 95, 0.2)', // Color de relleno
            fill: true, // Rellenar debajo de la línea
            tension: 0.4 // Curvatura de la línea
        }]
    };

    // Opciones del gráfico
    const options = {
        scales: {
            x: {
                ticks: {
                    color: 'blue' // Cambiar el color de las fechas (eje X)
                }
            },
            y: {
                beginAtZero: true, // Asegurar que el eje Y empiece en 0
                ticks: {
                    color: 'red' // Cambiar el color de los valores (eje Y)
                }
            }
        },
        plugins: {
            legend: {
                display: true, // Mostrar la leyenda
                labels: {
                    color: 'green' // Cambiar color del texto en la leyenda
                }
            }
        }
    };

    // Crear el gráfico con Chart.js
    new Chart(ctx, {
        type: 'line', // Tipo de gráfico (línea)
        data: data, // Datos del gráfico
        options: options // Opciones configuradas
    });
};

// Llamar a la función para pintar el gráfico
renderChart();
