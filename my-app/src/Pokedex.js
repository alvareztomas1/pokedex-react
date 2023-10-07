import React from 'react';
import { useEffect } from "react";
import "./Pokedex.css";
import logoImage from "../src/img/logo.png"
import PokedexUseState from "../src/PokedexUseState.js"


const Title = ({logo}) => {
    return (
        <div className="title">
            <img src={logo}/>
        </div>
    );
};
const Pagination = ({page, totalPages, onChange, goButtonOnClick, backButtonOnClick, selectedPokemon}) => {
    return (
        <div style={{display: selectedPokemon ? "none" : "block"}} id="pagination">
            <button onClick ={backButtonOnClick} className='pagination-button' id="back-button">Back</button>
            <input type="number" value={page} onChange={onChange} className='pagination-input' id="page-number"></input>
            <label className='total-pages'>{totalPages}</label>
            <button onClick={goButtonOnClick} className='pagination-button' id="next-button">Go </button> 
        </div>
        
    );
}
const Loading = ({loading}) => {
    return(
        <h1 className='loading'>{(loading ? "Cargando...": "")}</h1>
    );
}
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

    return (
        <div  className='pokemon-list' style={{display: selectedPokemon ? "none" : "grid"}}>
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

const SelectedPokemon = ({ selectedPokemon, handleCloseButton }) => {
    if(selectedPokemon){
        return (
            
            <div className='pokemon-info' style={{display: selectedPokemon ?  "block" : "none"}}>
                <button onClick={handleCloseButton} className='close-button'>X</button>

                
                <div className='container'>
                    
                    <img className='selected-pokemon'
                        src={selectedPokemon.sprites.other['official-artwork'].front_default}
                    />
                    <h2>{selectedPokemon.name.toUpperCase()}</h2>
                    
                    <div className='types'>
                        {selectedPokemon.types.map((type) =>{
                            return <h3 className={`type ${type.type.name}`}>{type.type.name}</h3>
                        })}
                    </div>
                    <ul>{`Height: ${selectedPokemon.height} Cm.`}</ul>
                    <ul>{`Weight: ${selectedPokemon.weight/10} Kg.`}</ul>
                    <div className='stats'>
                        {
                            selectedPokemon.stats.map((stat) => {
                                return <ul>{`${stat.stat.name.toUpperCase()}: ${stat.base_stat}`}</ul>
                            })
                        }
                    </div>
                   
                    
    
                </div>
    
            </div>
        )
    };
   
};



const Pokedex = () => {

    const [currentPage, setCurrentPage] = React.useState(1);
    const { pokemonsListData, totalPages, handleGoButton, loading, handleBackButton, handlePokemonSelection, selectedPokemon, handleCloseButton
    } = PokedexUseState(currentPage, setCurrentPage);
   

    return (
        <React.Fragment>

        <Loading loading={loading}/>


        <div className='pokedex' style={{ display: loading ? 'none' : 'grid' }}>

            <Title logo={logoImage}/>
            <PokemonList selectedPokemon={selectedPokemon} pokemonOnClick={handlePokemonSelection} pokemonsListData={pokemonsListData} />
            <SelectedPokemon handleCloseButton = {()=>handleCloseButton()} selectedPokemon={selectedPokemon}/>

            <Pagination 

                backButtonOnClick = {() => {handleBackButton()}}
                goButtonOnClick = { () => handleGoButton() }
                onChange={ (event) => setCurrentPage(event.target.value) } 
                page={currentPage} 
                totalPages={totalPages}
                selectedPokemon = {selectedPokemon}

            />  
        
        </div>
       
        </React.Fragment>
    );
}


export default Pokedex;




/*async function getPokedexData(offset){
    const URL = `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offset}`;
    try{
        const response = await fetch(URL);
        const responseJSON = await response.json();

        return responseJSON;
    }catch(e){
        console.error("FAILED", e);
    }
}
async function getPokemonData(name){
    const URL = `https://pokeapi.co/api/v2/pokemon/${name}`
    try{
        const response = await fetch(URL);
        const responseJSON = await response.json();
        
        return responseJSON;
    }catch(e){
        console.error("FAILED", e);
    } 
}*/


/*const PokedexUseState =  (currentPage, setCurrentPage) => {
    const [data, setData] = React.useState(null);
    const [offset, setOffset] = React.useState((Number(currentPage)-1) * 20);
    const [pokemonsListData, setPokemonsListData] = React.useState([]);
    const [totalPages, setTotalPages] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [changedPage, setChangedPage] = React.useState(currentPage);
    const [selectedPokemon, setSelectedPokemon] = React.useState(null);

    const handleGoButton = () => {
     
        if(currentPage !== changedPage && currentPage <= totalPages && currentPage > 0){
           
            setLoading(true);
            setChangedPage(currentPage);
            setOffset((Number(currentPage)-1) * 20);


        }
        
        else if(currentPage === changedPage && currentPage <= totalPages && currentPage > 0){
            setLoading(true);
            setOffset(Number(currentPage) * 20);
            setCurrentPage(Number(currentPage)+1);
            setChangedPage(Number(currentPage)+1);

        };
    };

    const handleBackButton = () => {
        if(currentPage <= totalPages && currentPage-1 > 0){
            setLoading(true);
            setCurrentPage(Number(currentPage)-1);
            setChangedPage(Number(currentPage)-1);
            setOffset((currentPage - 2 ) * 20);
        }
        

    };

    useEffect(() => {
        const getData = async() => {
            try{
                const dataPokedex = await getPokedexData(offset);
                setTotalPages(Math.ceil(dataPokedex.count/20));
                const pokemonListData = [];

                for(let i = 0; i < dataPokedex.results.length; i++){
                    const pokemonData = await getPokemonData(dataPokedex.results[i].name);
                    pokemonListData.push(pokemonData);

                };

               
                setPokemonsListData(pokemonListData);
                setData(dataPokedex);
                setLoading(false);
                
            }catch(e){
                console.error("FAILED", e);
            };
        };
        
        if(loading === true){
            getData();
            return;                     
        };
        
        
    }, [data, offset, loading, pokemonsListData]);

    const handlePokemonSelection = async (event) => {
        if(event.target.className === "pokemon"){
            const selectedPokemonData = await getPokemonData(event.target.name);
            setSelectedPokemon(selectedPokemonData);


        }
    };
    

    return {pokemonsListData, totalPages, handleGoButton, loading, handleBackButton, handlePokemonSelection, selectedPokemon};
}*/
