import React from 'react';
import { useEffect, useReducer } from "react";
import {getPokedexData, getPokemonData} from "../api/PokedexApi.js" 


export const fetchReducer = (state, action) => {

    const {type, payload} = action;

    switch(type){
        case "LOAD":
            return {loading: true, data: null, error: null};
        case "SUCCESS":
            return {...[state], loading: false, data: payload, error: null};
        case "FAILURE":
            return {...[state], loading: false, data: null, error: payload};
        default:
            return state; 
    };
};


const initialState = {loading: true, data: null, error: null};

async function getPokemonListData(offset){
    const pokedexData = await getPokedexData(offset);
    const pokemonsData = []; 
    for(let i = 0; i < pokedexData.results.length; i++){
        const pokemonData = await getPokemonData(pokedexData.results[i].name);
        pokemonsData.push(pokemonData);

    }

    return {pokedexData, pokemonsData};
};


export const useFetchReducer = (currentPage, setCurrentPage) => {
    const [state, dispatch] = useReducer(fetchReducer, initialState);
    const [offset, setOffset] = React.useState((currentPage-1) * 20);
    const [totalPages, setTotalPages] = React.useState(null)
    const [changedPage, setChangedPage] = React.useState(currentPage);
    const [selectedPokemon, setSelectedPokemon] = React.useState(null);

    
    
    const handleGoClick = () => {
        if(currentPage === changedPage && currentPage +1 <= totalPages && currentPage > 0){
            dispatch({type: "LOAD", payload: null});
            setCurrentPage(currentPage+1);
            setChangedPage(currentPage+1);
            setOffset((currentPage) * 20);
        }else if(currentPage !== changedPage && currentPage <= totalPages && currentPage > 0){
            dispatch({type: "LOAD", payload: null});
            setChangedPage(currentPage);
            setOffset((currentPage - 1) * 20);
        }
    };
    const handleBackClick = () => {
        if(currentPage - 1 > 0 && currentPage - 1 <= totalPages){
            dispatch({type: "LOAD", payload: null});
            setCurrentPage(currentPage-1);
            setChangedPage(currentPage-1);
            setOffset((currentPage - 2) * 20);
        }
    };
    const handlePokemonSelection = async (event) => {
        const pokemonData = await getPokemonData(event.target.name);
        setSelectedPokemon(pokemonData);
    };
    const handleCloseButton = () => {
        setSelectedPokemon(null);
    };


    useEffect(()=>{

        if(state.loading){
            const getData = async () => {

                try{
                    const {pokedexData, pokemonsData} = await getPokemonListData(offset);
                    setTotalPages(Math.ceil(pokedexData.count/20));
                    dispatch({type: "SUCCESS", payload: pokemonsData});

                }catch(e){
                    dispatch({type: "FAILURE", payload: e});
                }
                
            };

            getData();
            
        };

    }, [fetchReducer, offset]);

    

    return {state, totalPages, handleGoClick, handleBackClick, handlePokemonSelection, selectedPokemon, handleCloseButton};
}
/*
export const PokedexUseState =  (currentPage, setCurrentPage) => {
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
                const pokedexData = await getPokedexData(offset);
                setTotalPages(Math.ceil(pokedexData.count/20));
                const pokemonListData = [];

                for(let i = 0; i < pokedexData.results.length; i++){
                    const pokemonData = await getPokemonData(pokedexData.results[i].name);
                    pokemonListData.push(pokemonData);

                };

               
                setPokemonsListData(pokemonListData);
                setData(pokedexData);
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
}*/

