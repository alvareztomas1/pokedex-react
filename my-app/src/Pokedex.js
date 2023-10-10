import React from 'react';
import { useEffect } from "react";
import "./Pokedex.css";
import logoImage from "../src/img/logo.png"
import {PokedexUseState, useFetchReducer} from "../src/PokedexUseState.js"
import Title from "../src/components/Title.js"
import Pagination from './components/Pagination.js';
import Loading from './components/Loading.js';
import PokemonList from './components/PokemonsList.js';
import SelectedPokemon from "./components/SelectedPokemon.js"



const Pokedex = () => {

    const [currentPage, setCurrentPage] = React.useState(1);
    const {state, totalPages, handleGoClick, handleBackClick, handlePokemonSelection, selectedPokemon, handleCloseButton} = useFetchReducer(currentPage, setCurrentPage);

    return (
        <React.Fragment>
            <Loading loading={state.loading}/>

            <div className='pokedex' style={{ display: state.loading ? 'none' : 'grid' }}>

                <Title 
                    logo={logoImage}/>
                <PokemonList 
                    pokemonsListData={state.data}
                    pokemonOnClick={(event) => {handlePokemonSelection(event)}}
                    selectedPokemon={selectedPokemon}
                    />
                <Pagination
                    page={currentPage}
                    totalPages={totalPages}
                    onChange={(event)=>{
                        setCurrentPage(Number(event.target.value))}}
                    goButtonOnClick={() =>handleGoClick()}
                    backButtonOnClick={()=>{handleBackClick()}}
                    selectedPokemon={selectedPokemon}
                    />
                <SelectedPokemon 
                    selectedPokemon={selectedPokemon}
                    handleCloseButton={() => {handleCloseButton()}}
                    />

  
            </div>
        </React.Fragment>
        
    );

    /*const { pokemonsListData, totalPages, handleGoButton, loading, handleBackButton, handlePokemonSelection, selectedPokemon, handleCloseButton
    } = PokedexUseState(currentPage, setCurrentPage);*/
    

   /* return (
        <React.Fragment>

        <Loading loading={loading}/>


        <div className='pokedex' style={{ display: loading ? 'none' : 'grid' }}>

            <Title 
                logo={logoImage}/>
            <PokemonList 
                selectedPokemon={selectedPokemon} 
                pokemonOnClick={handlePokemonSelection} pokemonsListData={pokemonsListData} />
            <SelectedPokemon 
                handleCloseButton = {()=>handleCloseButton()} 
                selectedPokemon={selectedPokemon}/>

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
    );*/
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
