const Pokemon = ({source, name, onClick}) => {
    return (
        <div className='container'>
            <img className='pokemon'
                onClick={onClick}
                name={name}
                src={source}
            />
        </div>
    )
    
}

const PokemonList = ({pokemonsListData, pokemonOnClick, selectedPokemon}) =>{

    if(pokemonsListData){
        return (
            <div  className={selectedPokemon ? "hidden" : "pokemon-list"} >
            {
                pokemonsListData.map((pokemon, index) => {
                    return <Pokemon
                            onClick={(event) => {pokemonOnClick(event)}} 
                            source = {pokemon.sprites.other['official-artwork'].front_default} 
                            key={`${pokemon.name}-${index}`} 
                            name={pokemon.name}
                        />
                })
            }
            </div>
        );
    }
    
};

export default PokemonList;