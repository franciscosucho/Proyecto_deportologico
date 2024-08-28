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
