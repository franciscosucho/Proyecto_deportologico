let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

document.querySelector('.next-button').addEventListener('click', function() {
    moveToNextSlide();
});

document.querySelector('.prev-button').addEventListener('click', function() {
    moveToPreviousSlide();
});

function updateSliderPosition() {
    const slider = document.querySelector('.slider');
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function moveToNextSlide() {
    if (currentSlide === totalSlides - 1) {
        currentSlide = 0;
    } else {
        currentSlide++;
    }
    updateSliderPosition();
}

function moveToPreviousSlide() {
    if (currentSlide === 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide--;
    }
    updateSliderPosition();
}

// Cambia de imagen automáticamente cada 5 segundos
setInterval(moveToNextSlide, 7000);

///////////////////////////////////////////////////
function downloadFile() {
    // Aquí puedes agregar la lógica para descargar un archivo
    alert('Descargando archivo...');
}

function openWeb() {
    // Aquí puedes redirigir a otra página web
    window.location.href = 'https://tu-web.com';
}
