const cont_recetas_main = document.getElementById("cont_recetas_main")
const apiId = '31f5fad495dc42f0b38d901ddaf47e9a';
var url = `https://api.spoonacular.com/recipes/random?apiKey=${apiId}&number=4&diet=Vegetarian`;
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
    url = `https://api.spoonacular.com/recipes/random?apiKey=${apiId}&number=5&include-tags=vegetariano,dessert&query=${Comida_val}
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

document.addEventListener('DOMContentLoaded', () => {
    fetch_recetas(url);
})

function fetch_recetas(url) {


    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            create_recetas(data)
        });
}




function create_recetas(receta) {
    var i=0;
    while (i < receta.recipes.length) {

        const cont_receta = document.createElement('div');
        const id_receta = receta.recipes[i].id
        cont_receta.setAttribute('data-id', id_receta);
        cont_receta.classList.add('cont_receta');



        const sprite = document.createElement('img');
        sprite.classList.add("sprite");
        sprite.src = receta.recipes[i].image;



        const text = document.createElement('div');
        text.classList.add('text');


        //tiempo receta
        const cont_tiempo = document.createElement('div');
        cont_tiempo.classList.add("cont_tiempo")
        const icon_tiempo = document.createElement("i");

        // Agregar múltiples clases al elemento
        icon_tiempo.classList.add("fa-light", "fa-clock", "clock");
        const tiempo = receta.recipes[i].readyInMinutes
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
        dieta_receta.textContent = receta.recipes[i].diets



        const name = document.createElement('h3');
        name.classList.add('name_receta');
        name.textContent = receta.recipes[i].title;


        const info = document.createElement('div')
        info.classList.add('info');
        info.innerHTML = receta.recipes[i].summary
        const link = document.createElement('a')
        link.classList.add('btn_receta');
        const ver_receta = document.createElement('span')
        ver_receta.textContent = "Ver receta"
        //Mandar las etiquetas
        const icon_arrow = document.createElement('i')
        icon_arrow.classList.add('fa-solid', 'fa-arrow-right')
        link.href = '/receta_focus/' + id_receta;
        link.appendChild(ver_receta)
        link.appendChild(icon_arrow)

        text.appendChild(name);
        text.appendChild(dieta_receta);
        text.appendChild(cont_tiempo);
        text.appendChild(info)
        text.appendChild(link)
        cont_receta.appendChild(sprite);
        cont_receta.appendChild(text);
        cont_recetas_main.appendChild(cont_receta);
        i++;
    }

}






