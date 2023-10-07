import React from 'react';
import { useEffect } from "react";
import {getPokedexData, getPokemonData} from "../src/api/PokedexApi.js" 

const PokedexUseState =  (currentPage, setCurrentPage) => {
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

    const handleCloseButton = () =>{
        setSelectedPokemon(null);
    };
    

    return {
        pokemonsListData, totalPages, handleGoButton, 
        loading, handleBackButton, handlePokemonSelection, 
        selectedPokemon, handleCloseButton
    };
}

export default PokedexUseState;