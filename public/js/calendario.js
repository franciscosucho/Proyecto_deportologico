var monthName = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
    "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

var now = new Date();
var today = now.getDate(); // Día actual para resaltar
var month = now.getMonth();
var currentMonth = month;
var year = now.getFullYear();
var selectedDay = today; // Día seleccionado por el usuario (inicialmente es el día actual)

initCalender();

function initCalender() {
    $("#text_day").text(selectedDay); // Mostrar el día seleccionado o el día actual
    $("#text_month").text(monthName[currentMonth]);
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
        if (i === today && month === currentMonth) {
            classes += ' today';
        }
        if (i === selectedDay && month === currentMonth) {
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