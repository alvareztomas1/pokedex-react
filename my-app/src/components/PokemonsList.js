import { Col, Container, Row } from "react-bootstrap";
import Pokemon from "./Pokemon.js"



export default function PokemonList({ pokemonsListData, pokemonOnClick, selectedPokemon }){
    if (pokemonsListData) {
        return (
            <Container className={selectedPokemon ? "hidden" : ""} id="pokemons-list">
                <Row className="justify-content-md-center">
                    {
                        pokemonsListData.map((pokemon, index) => {
                            return <>
                                <Col md={3}>
                                    <Pokemon
                                        id={pokemon.id}
                                        onClick={(event) => { pokemonOnClick(event) }}
                                        source={pokemon.sprites.other['official-artwork'].front_default}
                                        key={`${pokemon.name}-${index}`}
                                        name={pokemon.name}
                                    />
                                </Col>
                            </>
                        })
                    }
                </Row>
            </Container>
        );
    }
};

