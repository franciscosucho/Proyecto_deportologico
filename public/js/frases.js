let i = 0; // Contador para las solicitudes
const url = 'https://api.api-ninjas.com/v1/quotes?category=inspirational'; // Endpoint para citas inspiracionales

async function getapi() {
  try {
    // Hacer 8 solicitudes para obtener 8 frases
    while (i < 6) {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-Api-Key': 'iOJKkr79JPPXQJeYGp6tIQ==HuYECca5mLCMGc04',
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud: ' + response.statusText);
      }

      const data = await response.json();
      // Asegúrate de que `data` tenga la estructura esperada
      create_frase(data[0]); // Usar el primer elemento de la respuesta
      i++;
    }

  } catch (error) {
    console.error('Error fetching the API:', error);
  }
}
// Updated create_frase function to handle asynchronous translation
async function create_frase(fraseJson) {
  const main_frases = document.getElementById("cont_frases_sub");
  const cont_frase = document.createElement("div");
  cont_frase.classList.add('cont_frase');

  const text = document.createElement('p');
  text.classList.add('text');
  

  text.textContent = await traducirTexto(fraseJson.quote);

  const author = document.createElement('h4');

  author.textContent =  fraseJson.author
  author.classList.add('author');

  cont_frase.appendChild(author);
  cont_frase.appendChild(text);

  main_frases.appendChild(cont_frase);
}

getapi();



// Clave y endpoint para la traducción
const key = "eQIFoJcy8xWDZEHxGewZh78ZxtCzYL2DhapjGWQSgdcarLtnJIF1JQQJ99AKACYeBjFXJ3w3AAAbACOGTs9G";
const endpoint = "https://api.cognitive.microsofttranslator.com/";
const regionLocation = "eastus";

// Función para traducir texto
async function traducirTexto(texto) {
  const path = '/translate';
  const url = `${endpoint}${path}?api-version=3.0&from=en&to=es`;

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
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data[0].translations[0].text;
  } catch (error) {
    console.error("Error en la traducción:", error);
  }
}