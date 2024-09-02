$(document).ready(function() {
    const modal = $('#modal-info');
    const closeBtn = $('.close');

    $('.more-info').on('click', function() {
        const profId = $(this).data('prof-id');
        // Aquí deberías hacer una petición al servidor para obtener los detalles del profesional
        // Por ahora, vamos a simular la información
        // Por ejemplo:
        const professionalDetails = {
            1: { name: '', description: 'Experto en asesoramiento de salud mental.' },
            // Añade más detalles según sea necesario
        };

        // Establece la información en el modal
        $('#modal-title').text(professionalDetails[profId].name);
        $('#modal-description').text(professionalDetails[profId].description);

        // Muestra el modal
        modal.fadeIn();
    });

    closeBtn.on('click', function() {
        modal.fadeOut();
    });

    $(window).on('click', function(event) {
        if ($(event.target).is(modal)) {
            modal.fadeOut();
        }
    });
});
