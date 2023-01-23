// Js para modo Dark

// cria uma variavel para pegar a mudanca do estado do botao
const changeThemeBtn = document.querySelector("#change-theme");

// Toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

// Load light or dark mode
function loadTheme() {
    const darkMode = localStorage.getItem("dark");

    if (darkMode) {
        toggleDarkMode();
    }
}

loadTheme();

changeThemeBtn.addEventListener("change", function () {
    toggleDarkMode();

    // Save or remove dark mode from localStorage
    localStorage.removeItem("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("dark", 1);
    }
});


// aqui inicia o script para consumir API atraves do fecth

// cria uma variavel para enviar dentro da tag html 
const pokemonId = document.querySelector('.pokemon_id');
const pokemonName = document.querySelector('.pokemon_name');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');

const fetchPokemon = async (pokemon) => {
    const APIresponse = await fetch (`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);
    
    if (APIresponse.status === 200){
        const data = await  APIresponse.json();
    // console.log(data);
        return data;

    }
    
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading ...';
    const data = await fetchPokemon(pokemon);

    if(data) {
        // console.log(data);
    //pego a informacao dentro do campo name e coloco na variavel que ira jogar dentro do html
        pokemonName.innerHTML = data.name;
        pokemonId.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

        input.value = '';

    }else{
        pokemonName.innerHTML = 'Not Found :';
        pokemonImage.innerHTML ='';
    }

    
}

//renderPokemon('12')

// fetchPokemon('25');

form.addEventListener('submit' , (event) =>{
    event.preventDefault();
    
    renderPokemon(input.value);
    //console.log(input.value)
    


});

renderPokemon('10');