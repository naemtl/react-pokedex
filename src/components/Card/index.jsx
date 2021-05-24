import React from 'react'

import typeColors from "../../helpers/typeColors";

import "./styles.css"

const Card = ({ pokemon }) => {
    return (
        <div className="card-container-inner">
            {pokemon ? (
                <>
                    <div className="name-id-container">
                        <div className="card-name">
                            {pokemon.name}
                        </div>
                        <div className="card-id">#{pokemon.id}</div>
                    </div>
                    <div className="image-types-container">
                        <div className="card-image">
                            <img src={pokemon.sprites.front_default} alt={`Sprite of ${pokemon.name}`} />
                        </div>
                        <div className="card-types">
                            {pokemon.types.map((type, i) => {
                                return <div key={i} className="card-single-type" style={{ backgroundColor: typeColors[type.type.name] }}>{type.type.name}</div>
                            })}
                        </div>
                    </div>
                    <div className="card-info-container">
                        <div className="weight-height-container">
                            <div className="card-data card-data-weight">
                                <div className="title">Avg. weight:</div>
                                <div>{pokemon.weight} lbs.</div>
                            </div>
                            <div className="card-data card-data-height">
                                <div className="title">Avg. height:</div>
                                <div>{pokemon.height} ft.</div>
                            </div>
                        </div>
                        <div className="card-data card-data-evolution">
                            <div className="title">Evolutions:</div>
                            <div className="evolution-list">
                                <div>One</div>
                                <div>Two</div>
                                <div>Three</div>
                            </div>
                        </div>
                    </div>
                </>) : "Select a Pokemon!"
            }
        </div>
    )
}

export default Card
