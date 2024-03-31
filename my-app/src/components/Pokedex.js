import React from 'react';
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import logoImage from "../img/logo.png"
import { useFetchReducer } from "../hook/PokedexUseState.js"
import Title from "./Title.js"
import Pagination from './Pagination.js';
import Loading from './Loading.js';
import PokemonList from './PokemonsList.js';
import SelectedPokemon from "./SelectedPokemon.js"

import { Spinner } from "react-bootstrap"


const Pokedex = () => {

    const [currentPage, setCurrentPage] = React.useState(1);
    const { state, totalPages, handleGoClick, handleBackClick, handlePokemonSelection, selectedPokemon, handleCloseButton } = useFetchReducer(currentPage, setCurrentPage);

    return (
        <React.Fragment>
            <div className={state.loading ? "hidden" : "pokedex"}>

                <Title 
                    logo={logoImage}/>
                <PokemonList 
                    pokemonsListData={state.data}
                    pokemonOnClick={(event) => {handlePokemonSelection(event)}}
                    selectedPokemon={selectedPokemon}
                {state.loading &&
                    <Spinner id="loading" animation="border" variant="light" />
                }
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

}


export default Pokedex;




