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

// Función para crear la frase en el DOM
function create_frase(fraseJson) {
  const main_frases = document.getElementById("cont_frases_sub");
  const cont_frase = document.createElement("div");
  cont_frase.classList.add('cont_frase');

  const text = document.createElement('p');
  text.classList.add('text');
  text.textContent = fraseJson.quote; // Cambia 'quote' si es necesario

  const author = document.createElement('h4');
  author.textContent = fraseJson.author; // Cambia 'author' si es necesario
  author.classList.add('author');
  cont_frase.appendChild(author);
  cont_frase.appendChild(text);

  main_frases.appendChild(cont_frase);
}

// Llamar a la función para obtener las frases
getapi();
