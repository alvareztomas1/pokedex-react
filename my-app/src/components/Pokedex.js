import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import logoImage from "../img/logo.png"
import { useFetchReducer } from "../hook/PokedexUseState.js"
import Title from "./Title.js"
import Pagination from './Pagination.js';
import PokemonList from './PokemonsList.js';
import SelectedPokemon from "./SelectedPokemon.js"
import { Spinner } from "react-bootstrap"


const Pokedex = () => {

    const [currentPage, setCurrentPage] = React.useState(1);
    const { state, totalPages, handleGoClick, handleBackClick, handlePokemonSelection, selectedPokemon, handleCloseButton } = useFetchReducer(currentPage, setCurrentPage);

    return (
        <React.Fragment>
                {state.loading &&
                    <Spinner id="loading" animation="border" variant="light" />
                }
                {!state.loading && <div id="pokedex">

                    <Title
                        logo={logoImage} />
                    <PokemonList
                        pokemonsListData={state.data}
                        pokemonOnClick={(event) => { handlePokemonSelection(event) }}
                        selectedPokemon={selectedPokemon}
                    />
                    <Pagination
                        page={currentPage}
                        totalPages={totalPages}
                        onChange={(event) => {
                            setCurrentPage(Number(event.target.value))
                        }}
                        goButtonOnClick={() => handleGoClick()}
                        backButtonOnClick={() => { handleBackClick() }}
                        selectedPokemon={selectedPokemon}
                    />
                    <SelectedPokemon
                        selectedPokemon={selectedPokemon}
                        handleCloseButton={() => { handleCloseButton() }}
                    />
                </div>}

        </React.Fragment>

    );

}


export default Pokedex;




