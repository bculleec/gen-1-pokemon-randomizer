const pokemon_names = [];
const pokemon_urls = [];
const pokemon_descriptions = [];
const screen = document.querySelector('.image');
const display_name = document.querySelector('.pokemon-name');
const display_description = document.querySelector('.text');
const url = 'https://pokeapi.co/api/v2/pokedex/2';



async function GetPokemonData() {
    const response = await fetch(url);
    const data = await response.json();

    data.pokemon_entries.forEach(async entry => {
        pokemon_names.push(entry.pokemon_species.name);
        const pokemon_url = `https://pokeapi.co/api/v2/pokemon/${ entry.entry_number }/`;

        const response2 = await fetch(pokemon_url);
        const pokemon_data = await response2.json();

        sprite_url = pokemon_data.sprites.front_default;
        pokemon_urls.push(sprite_url);

        const pokemon_url_desc = `https://pokeapi.co/api/v2/pokemon-species/${ entry.entry_number }/`;
        const response3 = await fetch(pokemon_url_desc);
        const pokemon_data2 = await response3.json();

        let desc = pokemon_data2.flavor_text_entries[8].flavor_text;
        pokemon_descriptions.push(desc);
    })
}

GetPokemonData();

console.log(pokemon_names);
console.log(pokemon_urls);

function GenerateRandom() {
    const num = Math.floor(Math.random() * 151);
    screen.innerHTML = `<img class = "pokemon-image" src = "${ pokemon_urls[num] }">`;
    display_name.innerHTML = pokemon_names[num];
    display_description.innerHTML = pokemon_descriptions[num];
}