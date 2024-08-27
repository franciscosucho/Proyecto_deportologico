const cont_recetas_main = document.getElementById("cont_recetas_main")
const apiId = '31f5fad495dc42f0b38d901ddaf47e9a';
var url = `https://api.spoonacular.com/recipes/random?apiKey=${apiId}&number=1&include-tags=vegetariano,dessert&exclude-tags=quinoa
`;
var selectElement = document.getElementById('region');
var tiempo_receta = document.getElementById("tiempo_receta");
var proteina_min = document.getElementById("proteina_min");
var calorias_max = document.getElementById("calorias_max");
var Comida = document.getElementById("Comida_inp");
var aplicar = document.getElementById("aplicar");
var limpiar = document.getElementById("limpiar");

aplicar.addEventListener("click", () => {
    cont_recetas_main.innerHTML = "";
    selectElement_val = selectElement.value;
    Comida_val = Comida.value
    tiempo_receta_val = tiempo_receta.value
    proteina_min_val = proteina_min.value
    calorias_max_val = calorias_max.value

    const apiId = '31f5fad495dc42f0b38d901ddaf47e9a';
    url = `https://api.spoonacular.com/recipes/random?apiKey=${apiId}&number=1&include-tags=vegetariano,dessert&query=${Comida_val}
    &cuisine=${selectElement_val}&maxReadyTime=${tiempo_receta_val}&minProtein=${proteina_min_val}&maxCalories=${calorias_max_val}//`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
        });
})


limpiar.addEventListener("click", () => {
    Comida.value = ""
    proteina_min.value = ""
    calorias_max.value = ""
})
// codigo para traer las recetas desde la BD
function recetas_number(number, url) {

    for (let i = 1; i <= number; i++) {
        fecth_recetas(i, url);
    }
}

function fecth_recetas(id, url) {


    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            create_recetas(data, id)
        });
}




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


// recetas_number(2,url);