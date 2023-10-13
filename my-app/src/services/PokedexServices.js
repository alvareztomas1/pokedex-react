import { getPokedexDataFromApi, getPokemonDataFromApi } from "../api/PokedexApi";
import { loadPokemons, savePokemons, savePokemon, loadPokemon } from "../storage/PokedexStorage";

export async function getPokedexData(offset){
    const POKEMONS_LIMIT  = 20;
    try{
        return loadPokemons(offset);
    }catch(e){
        const pokemonsData = await getPokedexDataFromApi(offset);
        savePokemons(offset, POKEMONS_LIMIT, pokemonsData);

        return pokemonsData;
    };
};

export async function getPokemonData(name){
    try{

        return loadPokemon(name);
    }catch(e){

        const pokemonData = await getPokemonDataFromApi(name);
        savePokemon(pokemonData.name, pokemonData);
        return pokemonData;
    }
};