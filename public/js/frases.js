/*
let i = 0;
const url = 'https://cors-anywhere.herokuapp.com/https://zenquotes.io/api/random';

async function getapi() {
  try {

    // Hacer 8 solicitudes para obtener 8 frases aleatorias
    for (let i = 0; i < 5; i++) {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data)
      create_frase(data);
    }

  } catch (error) {
    console.error('Error fetching the API:', error);
  }
}

getapi();
*/
function peticion_api() {
  fetch('https://api.quotable.io/random?tags=wisdom&lang=en')
    .then(response => response.json())
    .then(data => {
      const fraseJson = { content: data.content, author: data.author };
      create_frase(fraseJson);
    })
    .catch(error => console.error('Error:', error));
}

function create_frase(fraseJson) {
  const main_frases = document.getElementById("cont_frases_sub");
  const cont_frase = document.createElement("div");
  cont_frase.classList.add('cont_frase');

  const text = document.createElement('p');
  text.classList.add('text');
  text.textContent = fraseJson.content;

  const author = document.createElement('h4');
  author.textContent = fraseJson.author;
  author.classList.add('author');
  cont_frase.appendChild(author);
  cont_frase.appendChild(text);

  main_frases.appendChild(cont_frase);
}
let
while (i <= 5) {
  peticion_api();
  i++;
}

/*
function create_frase(fraseJson) {
    const main_frases = document.getElementById("cont_frases_sub");
    const cont_frase = document.createElement("div");
    cont_frase.classList.add('cont_frase');

    const text = document.createElement('p');
    text.classList.add('text');
    text.textContent = fraseJson[0].q;

    const author = document.createElement('h4');
    author.textContent = fraseJson[0].a;
    author.classList.add('author');
    cont_frase.appendChild(author);
    cont_frase.appendChild(text);

    main_frases.appendChild(cont_frase);
}
*/