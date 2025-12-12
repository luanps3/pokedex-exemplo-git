const pokeApi = {}

function convertPokeApiDetailPokemon(pokeDetail){
    const pokemon = new Pokemon();
    
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types?.map((typeSlot) => typeSlot.type.name) || [];
    const [type] = types;

    const abilities = pokeDetail.abilities?.map((abilitieSlot) => abilitieSlot.ability.name) || [];
    const [ability] = abilities;

    const moves = pokeDetail.moves?.map((moveSlot) => moveSlot.move.name) || [];
    const [move] = moves; 

    pokemon.abilities = abilities;
    pokemon.ability = ability;

    pokemon.types = types;
    pokemon.type = type;

    pokemon.moves = moves;
    pokemon.move = move;

    pokemon.photo = pokeDetail.sprites?.other?.dream_world?.front_default || pokeDetail.sprites?.front_default;
    

    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequest) => Promise.all(detailRequest))
        .then((pokemonsDetails) => pokemonsDetails)
        
}

// Promise.all([
//     fetch('https://pokeapi.co/api/v2/pokemon/1'),
//     fetch('https://pokeapi.co/api/v2/pokemon/2'),
//     fetch('https://pokeapi.co/api/v2/pokemon/3'),
//     fetch('https://pokeapi.co/api/v2/pokemon/4'),
// ]).then((results) => console.log(results));
