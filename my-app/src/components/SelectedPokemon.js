const SelectedPokemon = ({ selectedPokemon, handleCloseButton }) => {
   
    if(selectedPokemon){
        return (
            
            <div className={selectedPokemon ? 'pokemon-info' : "hidden" }>
                <button onClick={handleCloseButton} className='close-button'>X</button>
                
                <div className='container'>
                    
                    <img className='selected-pokemon'
                        src={selectedPokemon.sprites.other['official-artwork'].front_default}
                    />
                    <h2>{selectedPokemon.name.toUpperCase()}</h2>
                    
                    <div className='types'>
                        {selectedPokemon.types.map((type, index) =>{
                            return <h3 key={`${type}-${index}`} className={`type ${type.type.name}`}>{type.type.name}</h3>
                        })}
                    </div>
                    <ul>{`Height: ${selectedPokemon.height} Cm.`}</ul>
                    <ul>{`Weight: ${selectedPokemon.weight/10} Kg.`}</ul>
                    <div className='stats'>
                        {
                            selectedPokemon.stats.map((stat, index) => {
                                return <ul key={`${stat}-${index}`}>{`${stat.stat.name.toUpperCase()}: ${stat.base_stat}`}</ul>
                            })
                        }
                    </div>
                   
                    
    
                </div>
    
            </div>
        )
    };
   
};

export default SelectedPokemon;