export default function Physical({ height, weight }) {
    return (
        <div id='physical'>
            <h6 id="selected-pokemon-height">{`Height: ${height} Cm.`}</h6>
            <h6 id="selected-pokemon-weight">{`Weight: ${weight / 10} Kg.`}</h6>
        </div>
    )
}