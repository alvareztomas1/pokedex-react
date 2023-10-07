export async function getPokedexData(offset){
    const URL = `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offset}`;
    try{
        const response = await fetch(URL);
        const responseJSON = await response.json();

        return responseJSON;
    }catch(e){
        console.error("FAILED", e);
    }
}
export async function getPokemonData(name){
    const URL = `https://pokeapi.co/api/v2/pokemon/${name}`
    try{
        const response = await fetch(URL);
        const responseJSON = await response.json();
        
        return responseJSON;
    }catch(e){
        console.error("FAILED", e);
    } 
}