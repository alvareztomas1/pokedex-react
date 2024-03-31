export default function Name({name}){
    return(
        <h1 id="selected-pokemon-name" className="display-6">{name.toUpperCase()}</h1>
    )
}