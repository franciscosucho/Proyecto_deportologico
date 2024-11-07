let text_prin = document.querySelector(".text_prin");
let text = document.querySelector(".text");
let ingredientes_ietm = document.querySelectorAll(".ingredientes_ietm");
let inst_juntas = document.querySelector(".inst_juntas");
let instruction_title = document.querySelectorAll(".instruction-title");
let step_description = document.querySelectorAll(".step-description");
let ingrediente = document.querySelectorAll(".ingrediente");
let equipment_item = document.querySelectorAll(".equipment-item");

// Clave y endpoint 
const key = "eQIFoJcy8xWDZEHxGewZh78ZxtCzYL2DhapjGWQSgdcarLtnJIF1JQQJ99AKACYeBjFXJ3w3AAAbACOGTs9G";
const endpoint = "https://api.cognitive.microsofttranslator.com/";
const regionLocation = "eastus";

// Función para traducir texto
async function traducirTexto(texto) {
    const path = '/translate';
    const url = `${endpoint}${path}?api-version=3.0&from=en&to=es`;

    // Configuración de la solicitud
    const options = {
        method: 'POST',
        headers: {
            'Ocp-Apim-Subscription-Key': key,
            'Ocp-Apim-Subscription-Region': regionLocation,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify([{ 'Text': texto }])
    };

    try {
        // Llamada a la API
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        // Devuelve solo el texto traducido
        return data[0].translations[0].text;

    } catch (error) {
        console.error("Error en la traducción:", error);
    }
}

// Función para traducir los elementos del DOM
async function traducirElementos() {
    // Traducir texto principal
    text_prin.textContent = await traducirTexto(text_prin.textContent);
    console.log( text_prin.textContent )
    
    // Traducir el texto dentro de la clase '.text'
    text.textContent = await traducirTexto(text.textContent);

    // Traducir los elementos de la clase '.ingredientes_ietm' usando forEach
    ingredientes_ietm.forEach(async (item) => {
        item.textContent = await traducirTexto(item.textContent);
    });

    // Traducir el texto dentro de la clase '.inst_juntas'
    inst_juntas.textContent = await traducirTexto(inst_juntas.textContent);

    // Traducir los títulos de las instrucciones usando forEach
    instruction_title.forEach(async (title) => {
        title.textContent = await traducirTexto(title.textContent);
    });

    // Traducir las descripciones de los pasos usando forEach
    step_description.forEach(async (description) => {
        description.textContent = await traducirTexto(description.textContent);
    });

    // Traducir los ingredientes usando forEach
    ingrediente.forEach(async (ing) => {
        ing.textContent = await traducirTexto(ing.textContent);
    });

    // Traducir los elementos de equipo usando forEach
    equipment_item.forEach(async (item) => {
        item.textContent = await traducirTexto(item.textContent);
    });
}

// Llamar a la función para traducir todo el contenido al español
traducirElementos();
