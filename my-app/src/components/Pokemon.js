import { Image } from "react-bootstrap"

export default function Pokemon ({ source, name, onClick, id }) {
    return (
        <Image 
        id={id}
        className="pokemon"
        alt={name}
        onClick={onClick}
        name={name}
        src={source}
        />      
    )
}