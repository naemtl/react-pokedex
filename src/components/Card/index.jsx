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
                        <div>#{pokemon.id}</div>
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
                    <div className="card-info">
                        <div className="card-data card-data-weight">
                            <div className="title">Weight</div>
                            <div>{pokemon.weight}</div>
                        </div>
                        <div className="card-data card-data-height">
                            <div className="title">Height</div>
                            <div>{pokemon.height}</div>
                        </div>
                    </div>
                    <div className="card-data card-data-evolution">
                        <div className="title">Evolutions</div>
                    </div>
                </>) : "Select a Pokemon!"
            }
        </div>
    )
}

export default Card
