import { ProgressBar } from "react-bootstrap"

export default function Stats({stats}) {
    return(
        <div id='stats'>
            <h1 className="display-6">Stats</h1>
            <label>HP</label>
            <ProgressBar max={255} id="selected-pokemon-hp" variant="success" now={stats[0].base_stat} label={`${stats[0].base_stat} / 255`} />
            <label>ATTACK</label>
            <ProgressBar max={255} id="selected-pokemon-attack" variant="danger" now={stats[1].base_stat} label={`${stats[1].base_stat} / 255`} />
            <label> DEFENSE</label>
            <ProgressBar max={255} id="selected-pokemon-defense" variant="info" now={stats[2].base_stat} label={`${stats[2].base_stat} / 255`} />
            <label>SPECIAL ATTACK</label>
            <ProgressBar max={255} id="selected-pokemon-special-attack" variant="warning" now={stats[3].base_stat} label={`${stats[3].base_stat} / 255`} />
            <label>SPECIAL DEFENSE</label>
            <ProgressBar max={255} id="selected-pokemon-special-defense" variant="secondary" now={stats[4].base_stat} label={`${stats[4].base_stat} / 255`} />
            <label>SPEED</label>
            <ProgressBar max={255} id="selected-pokemon-speed" now={stats[5].base_stat} label={`${stats[5].base_stat} / 255`} />
        </div>
    )
}