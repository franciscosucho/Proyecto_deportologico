
const apiId = '31f5fad495dc42f0b38d901ddaf47e9a';

function fecth_recetas(id) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            createpokemon(data, id)
        });
}



function create_recetas(pokemon, id) {

    const card = document.createElement('div');
    card.classList.add('pokemon-block');
    card.classList.add('id' + id);

    const spriteContainer = document.createElement('div');
    spriteContainer.classList.add('img-container');

    const sprite = document.createElement('img');
    sprite.classList.add("sprite");
    sprite.src = pokemon.sprites.other.home.front_default;

    spriteContainer.appendChild(sprite);

    const num = document.createElement('p')
    num.textContent = `#${pokemon.id.toString().padStart(3, 0)}`; //padstart agreaga ceros al principio del num

    const name = document.createElement('p');
    name.classList.add('name');
    name.textContent = pokemon.name;

    card.appendChild(spriteContainer);
    card.appendChild(num);
    card.appendChild(name);
    pokemonContainer.appendChild(card);
}