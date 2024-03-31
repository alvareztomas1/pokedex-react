import { Button, Container, Image } from "react-bootstrap";
import Stats from "./selected_pokemon/Stats";
import Types from "./selected_pokemon/Types";
import Name from "./selected_pokemon/Name";
import Physical from "./selected_pokemon/Physical";

const SelectedPokemon = ({ selectedPokemon, handleCloseButton }) => {
    if (selectedPokemon) {
        return (
            <Container id="selected-pokemon" className="pokemon-info">
                <Image id="selected-pokemon-image" className="selected-pokemon" src={selectedPokemon.sprites.other['official-artwork'].front_default} />
                <Name name={selectedPokemon.name} />
                <Types types={selectedPokemon.types} />
                <Physical height={selectedPokemon.height} weight={selectedPokemon.weight} />
                <Stats stats={selectedPokemon.stats} />
                <br></br>
                <Button id="back-button" variant="outline-dark" onClick={handleCloseButton}>Back</Button>

            </Container>
        )
    };
};

export default SelectedPokemon;