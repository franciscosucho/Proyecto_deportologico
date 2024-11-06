var monthName = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
    "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

var now = new Date();

var year = now.getFullYear(); // Obtiene el año (YYYY)
var month = String(now.getMonth() + 1).padStart(2, '0'); // Obtiene el mes (MM) y agrega un 0 si es necesario
var today = String(now.getDate()).padStart(2, '0'); // Obtiene el día (DD) y agrega un 0 si es necesario

var fechaFormateada = `${year}-${month}-${today}`;



today = now.getDate(); // Día actual para resaltar
month = now.getMonth();
year = now.getFullYear();
var selectedDay = today; // Día seleccionado por el usuario (inicialmente es el día actual)







initCalender();

function initCalender() {
    $("#text_day").text(selectedDay); // Mostrar el día seleccionado o el día actual
    $("#text_month").text(monthName[month]);
    $("#text_month_02").text(monthName[month]);
    $("#text_year").text(year);

    $(".item_day").remove();

    // Agregar los días del mes anterior (días "previos")
    for (let i = startDay(); i > 0; i--) {
        $(".container_days").append(
            `<span class="week_days_item item_day prev_days">${getTotalDays(month - 1) - (i - 1)}</span>`
        );
    }

    // Agregar los días del mes actual
    for (let i = 1; i <= getTotalDays(month); i++) {
        let classes = 'week_days_item item_day';
        if (i === today && month === now.getMonth()) {
            classes += ' today';
        }
        if (i === selectedDay) {
            classes += ' selected';
        }
        $(".container_days").append(
            `<span class="${classes}">${i}</span>`
        );
    }

    // Agregar el evento de clic para seleccionar un día
    $(".item_day").click(function () {
        // Remover la clase 'selected' de todos los días
        $(".item_day").removeClass("selected");
        // Agregar la clase 'selected' al día que se ha hecho clic
        $(this).addClass("selected");
        // Actualizar el día seleccionado
        selectedDay = parseInt($(this).text());
        $("#text_day").text(selectedDay);

        // Actualizar el mes si el día seleccionado es de un mes diferente (previo o próximo)
        if ($(this).hasClass('prev_days')) {
            getPrevMonth();
        } else if ($(this).hasClass('next_days')) {
            getNextMonth();
        } else {
            $("#text_month").text(monthName[month]);
        }
        //

        fechaFormateada = `${year}-${month}-${selectedDay}`;
        console.log(fechaFormateada)
        fetch(`http://localhost:3000/calendario/update/${fechaFormateada}`, { method: 'POST' })
            .then(() => {
                window.location.reload(true); // Recargar la página después de la solicitud POST
            })
            .catch(err => console.error('Error:', err));

    });

}

function getNextMonth() {
    if (month < 11) {
        month++;
    } else {
        month = 0;
        year++;
    }
    selectedDay = 1; // Reinicia el día seleccionado al cambiar de mes
    initCalender();
}

function getPrevMonth() {
    if (month > 0) {
        month--;
    } else {
        month = 11;
        year--;
    }
    selectedDay = 1; // Reinicia el día seleccionado al cambiar de mes
    initCalender();
}

function startDay() {
    var start = new Date(year, month, 1);
    return start.getDay();
}

function leapMonth() {
    return ((year % 400 === 0) || (year % 4 === 0) && (year % 100 !== 0));
}

function getTotalDays(monthIndex) {
    if (monthIndex === undefined) {
        monthIndex = month;
    }

    const daysInMonth = [31, leapMonth() ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return daysInMonth[monthIndex];
}

// Event listeners para los botones de cambio de mes
$("#next_month").click(function () {
    getNextMonth();
});
$("#last_month").click(function () {
    getPrevMonth();
});

// Añadir eventos a los checkboxes con la clase 'item_act'
const item_act = document.querySelectorAll(".item_act");
item_act.forEach(item => {
    item.addEventListener("click", (e) => {
        var estado = e.target.checked;
        var id = e.target.getAttribute('data-id');

        fetch(`http://localhost:3000/calendario/chequear/${estado}/${id}`, { method: 'POST' })
            .then(() => {

            })
            .catch(err => console.error('Error:', err));
        location.reload(true);
    });
});



const btn_enviar_act = document.getElementById("btn_enviar_act");
btn_enviar_act.addEventListener('click', (event) => { // Pasamos `event` como parámetro

    const fecha_us = document.getElementById("fecha_us").value;
    let fecha_act = new Date(obtenerFechaActual()[0]);
    let fecha_comparacion = new Date(fecha_us);

    const fechaActSinHora = fecha_act.toISOString().split('T')[0];
    const fechaCompSinHora = fecha_comparacion.toISOString().split('T')[0];

    if (fechaCompSinHora >= fechaActSinHora) {
        location.reload(true); // Recarga la página
    } else {
        event.preventDefault(); // Cancela la recarga
        alert("La fecha ingresada debe ser mayor o igual a la fecha actual.");
    }
});

function obtenerFechaActual() {
    const fecha = new Date();
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 (enero) a 11 (diciembre)
    const día = String(fecha.getDate()).padStart(2, '0');
    const fecha_completa = `${año}-${mes}-${día}`;
    return [fecha_completa, año, mes, día];

}