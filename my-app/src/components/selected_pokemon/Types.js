export default function Types({ types }) {
    return (
        <div className='types'>
            {types.map((type, index) => {
                return <h3 id={`selected-pokemon-type-${index}`} key={`${type}-${index}`} className={`display-6 type ${type.type.name}`}>{type.type.name.toUpperCase()}</h3>
            })}
        </div>
    );
}