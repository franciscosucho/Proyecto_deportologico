

// Función para traducir texto
async function traducirTexto(texto) {
    // Clave y endpoint de tu servicio de traducción
    const key = "AAtpHWDgeRn5NtufpCiIdWtrXUmEw46jQnS3GPB0tHAz0dlDHhhzJQQJ99AKACYeBjFXJ3w3AAAbACOGLL3k";
    const endpoint = "https://api.cognitive.microsofttranslator.com/";
    const location = "East US";

    
    const path = '/translate';
    const url = `${endpoint}${path}?api-version=3.0&from=en&to=en&to=es`;

    // Configuración de la solicitud
    const options = {
        method: 'POST',
        headers: {
            'Ocp-Apim-Subscription-Key': key,
            'Ocp-Apim-Subscription-Region': location,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify([{ 'Text': texto }])
    };

    try {
        // Llamada a la API
        const response = await fetch(url, options);
        const data = await response.json();

        // Mostrar resultados de traducción
        console.log(data);
        return data; // Devuelve el resultado para procesarlo más adelante
    } catch (error) {
        console.error("Error en la traducción:", error);
    }
}

// Ejemplo de uso
traducirTexto("Hello, how are you?");