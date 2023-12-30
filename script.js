const pokemon_names = [];
const pokemon_urls = [];
const screen = document.querySelector('.image');
const display_name = document.querySelector('.pokemon-name');

function GetPokemonData() {
    fetch('https://pokeapi.co/api/v2/pokedex/2')
    .then(res => {
        return res.json();
    })
    .then(data=>{
        data.pokemon_entries.forEach(element => {
            const markup = `<p>${ element.pokemon_species.name} ${ element.entry_number }</p>`;
            const pokemon_url = `https://pokeapi.co/api/v2/pokemon/${ element.entry_number }/`;
            let sprite_url = ``;
            
            pokemon_names.push(element.pokemon_species.name);
            fetch(pokemon_url)
            .then(response => {
                return response.json();
            })
            .then(pokemon_data =>{
                sprite_url = pokemon_data.sprites.front_default;
                pokemon_urls.push(sprite_url);
            })   
        });
    })
    .catch(error => console.log(error));
}

GetPokemonData();

console.log(pokemon_names);
console.log(pokemon_urls);

function GenerateRandom() {
    const num = Math.floor(Math.random() * 151);
    screen.innerHTML = `<img class = "pokemon-image" src = "${ pokemon_urls[num] }">`;
    display_name.innerHTML = pokemon_names[num];
}