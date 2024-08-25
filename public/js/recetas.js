
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


const cont_recetas_main = document.getElementById("cont_recetas_main")

function create_recetas(receta, id) {

    const card = document.createElement('div');
    card.classList.add('cont_receta');
    card.classList.add('id' + id);

   

    const sprite = document.createElement('img');
    sprite.classList.add("sprite");
    sprite.src = receta.recipes[0].image;

   


    //tiempo receta
    const cont_tiempo = document.createElement('div');
    cont_tiempo.classList.add("cont_tiempo")
    const icon_tiempo = document.createElement("i");

    // Agregar múltiples clases al elemento
    icon_tiempo.classList.add("fa-light", "fa-clock", "clock");
    const tiempo = receta.recipes[0].readyInMinutes
    const tiempo_receta = document.createElement('p');
    tiempo_receta.classList.add("tiempo_receta");
    let centenas = Math.floor(tiempo / 100);
    let decenas = Math.floor((tiempo % 100) / 10);
    tiempo_receta.textContent = centenas + "h " + decenas + "0min"
    cont_tiempo.appendChild(icon_tiempo)
    cont_tiempo.appendChild(tiempo_receta)


    // dieta
    const dieta_receta = document.createElement('h4');
    dieta_receta.classList.add('dieta');
    dieta_receta.textContent = receta.recipes[0].diets



    const name = document.createElement('h3');
    name.classList.add('name_receta');
    name.textContent = receta.recipes[0].title;


    //Mandar las etiquetas
    card.appendChild(dieta_receta);
    card.appendChild(sprite);
    card.appendChild(name);
    card.appendChild(cont_tiempo);
    cont_recetas_main.appendChild(card);
}


// recetas_number(2);