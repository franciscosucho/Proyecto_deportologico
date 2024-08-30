let i = 0;

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

while (i <= 5) {
    peticion_api();
    i++;
}
