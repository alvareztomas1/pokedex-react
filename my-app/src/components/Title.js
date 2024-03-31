import { Image } from "react-bootstrap";

const Title = ({logo}) => {
    return (
        <Image alt="pokedex logo" id="title" src={logo}/>
    );
};

export default Title;