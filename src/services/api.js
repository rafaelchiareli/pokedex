const BASE_URL = 'https://pokeapi.co/api/v2';

export async function fetchPokemons(limit = 20, offset = 0){
    const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
    const data = await response.json();
    return data.results;
}

export async function fetchPokemonDetails(url){
    const response = await fetch(url);
    return await response.json();
}

