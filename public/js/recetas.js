
function recetas_number(number) {

    for (let i = 1; i <= number; i++) {
        fecth_recetas(i);
    }
}



function fecth_recetas(id) {
    const apiId = '31f5fad495dc42f0b38d901ddaf47e9a';
    const url = `https://api.spoonacular.com/recipes/random?apiKey=${apiId}&number=1&include-tags=vegetariano,dessert&exclude-tags=quinoa
`; 
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            create_recetas(data, id)
        });
}

const cont_recetas_main= document.getElementById("cont_recetas_main")

function create_recetas(receta, id) {

    const card = document.createElement('div');
    card.classList.add('cont_receta');
    card.classList.add('id' + id);

    const spriteContainer = document.createElement('div');
    spriteContainer.classList.add('img-container');

    const sprite = document.createElement('img');
    sprite.classList.add("sprite");
    sprite.src = receta.recipes[0].image;

    spriteContainer.appendChild(sprite);



    const name = document.createElement('h4');
    name.classList.add('name_receta');
    name.textContent = receta.recipes[0].title;

    card.appendChild(spriteContainer);
    card.appendChild(name);
    cont_recetas_main.appendChild(card);
}


recetas_number(2);