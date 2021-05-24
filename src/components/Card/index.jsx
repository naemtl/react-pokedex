import React from 'react'

import "./styles.css"

const Card = ({ pokemon }) => {
    return (
        <div className="card-container">
            <div className="card-image">
                <img src={pokemon.sprites.front_default} alt={`Sprite of ${pokemon.name}`} />
            </div>
            <div className="card-name">
                {pokemon.name}
            </div>
            <div className="card-types">
                {pokemon.types.map(type => {
                    return <div className="card-single-type">{type.type.name}</div>
                })}
            </div>
            <div className="card-info">
                <div className="card-data card-data-weight">
                    <p className="title">Weight</p>
                    <p>{pokemon.weight}</p>
                </div>
                <div className="card-data card-data-height">
                    <p className="title">Height</p>
                    <p>{pokemon.height}</p>
                </div>
                <div className="card-data card-data-ability">
                    <p className="title">Ability</p>
                    <p>{pokemon.abilities[0].ability.name}</p>
                </div>
            </div>

        </div>
    )
}

export default Card
