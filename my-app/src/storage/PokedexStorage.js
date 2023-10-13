import { getPokedexData,  getPokemonData} from "../api/PokedexApi.js";

export function savePokemon(name, pokemon){
    if(name === undefined || typeof(pokemon) !== "object"){
        throw new Error ("pokemons names must be defined and pokemon must be anad object")
    }

    try{
        localStorage.setItem(`pokemon-${name}`, JSON.stringify(pokemon));

    }catch(e){
        localStorage.clear();
    }
};

export function savePokemons(offset, limit, pokemons){
    if(offset === undefined || limit === undefined || typeof(pokemons) !== "object"){
        throw new Error("offset and limit must  be defined");
    }
    try{
        localStorage.setItem(`pokemons_${offset}_${limit}`, JSON.stringify(pokemons));

    }catch(e){
        localStorage.clear();
    }
};


export function loadPokemon(name){


    const pokemon = JSON.parse(localStorage.getItem(`pokemon-${name}`));

    if(!pokemon){
        throw new Error("pokemons name must be defined");
    }

    return pokemon;
};

export function loadPokemons(offset, limit){
    if(offset === undefined || limit === undefined){
        throw new Error("offset and limit must  be defined");
    };

    const pokemons = JSON.parse(localStorage.getItem(`pokemons_${offset}_${limit}`));

    return pokemons;
};