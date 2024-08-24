var monthName = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
    "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

var now = new Date();
var today = now.getDate(); // Día actual para resaltar
var month = now.getMonth();
var year = now.getFullYear();
var currentMonth = month; // Mes actual que no puede cambiarse
var currentYear = year;   // Año actual para referencia
var selectedDays = {};    // Objeto para almacenar los días seleccionados por mes

initCalender();

function initCalender() {
    // Establecer el mes y año actuales en la interfaz
    let displayDay = today; // Por defecto, mostrar el día actual

    if (selectedDays[`${year}-${month}`] && selectedDays[`${year}-${month}`].length > 0) {
        displayDay = selectedDays[`${year}-${month}`][0]; // Mostrar el primer día seleccionado si hay uno
    }

    $("#text_day").text(displayDay);
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

        // Resaltar el día actual si estamos en el mes actual
        if (i === today && month === currentMonth && year === currentYear) {
            classes += ' today';
        }

        // Resaltar los días seleccionados previamente
        if (selectedDays[`${year}-${month}`] && selectedDays[`${year}-${month}`].includes(i)) {
            classes += ' selected';
        }

        $(".container_days").append(
            `<span class="${classes}">${i}</span>`
        );
    }

    // Agregar los días del mes siguiente (días "próximos")
    let nextDays = 7 - ($(".container_days .item_day").length % 7);
    if (nextDays < 7) {
        for (let i = 1; i <= nextDays; i++) {
            $(".container_days").append(
                `<span class="week_days_item item_day next_days">${i}</span>`
            );
        }
    }

    // Agregar el evento de clic para seleccionar un día
    $(".item_day").click(function () {
        let day = parseInt($(this).text());

        // Si el día ya está seleccionado, deseleccionarlo
        if (selectedDays[`${year}-${month}`] && selectedDays[`${year}-${month}`].includes(day)) {
            $(this).removeClass("selected");
            selectedDays[`${year}-${month}`] = selectedDays[`${year}-${month}`].filter(d => d !== day);
        } else {
            // Seleccionar un nuevo día
            if (!selectedDays[`${year}-${month}`]) {
                selectedDays[`${year}-${month}`] = [];
            }
            selectedDays[`${year}-${month}`].push(day);
            $(this).addClass("selected");
        }

        $("#text_day").text(day);

        // Actualizar el mes si el día seleccionado es de un mes diferente (previo o próximo)
        if ($(this).hasClass('prev_days')) {
            getPrevMonth();
        } else if ($(this).hasClass('next_days')) {
            getNextMonth();
        }
    });
}

function getNextMonth() {
    if (month !== 11) {
        month++;
    } else {
        year++;
        month = 0;
    }
    initCalender();
}

function getPrevMonth() {
    if (month !== 0) {
        month--;
    } else {
        year--;
        month = 11;
    }
    initCalender();
}

function startDay() {
    var start = new Date(year, month, 1);
    return start.getDay();
}

function leapMonth() {
    return ((year % 400 === 0) || (year % 4 === 0) && (year % 100 !== 0));
}

function getTotalDays() {
    if (month === -1) month = 11;

    var numMonthReal = month + 1;

    if (numMonthReal == 3 || numMonthReal == 5 || numMonthReal == 8 || numMonthReal == 10) {
        return 30;
    } else if (numMonthReal == 0 || numMonthReal == 2 || numMonthReal == 4 || numMonthReal == 6
        || numMonthReal == 7 || numMonthReal == 9 || numMonthReal == 10) {
        return 31;
    } else {
        return leapMonth() ? 29 : 28;
    }
}

// Event listeners para los botones de cambio de mes
$("#next_month").click(function () {
    getNextMonth();
});
$("#last_month").click(function () {
    getPrevMonth();
});
