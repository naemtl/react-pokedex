import React from 'react'

import typeColors from "../../helpers/typeColors";

import "./styles.css"

const Card = ({ pokemon, evolvesToArray }) => {
    console.log(evolvesToArray);
    return (
        <div className="card-container-inner">
            <div className="card-screen">
                {pokemon ? (
                    <>
                        <div className="card-name-id-container">
                            <div className="card-name">
                                {pokemon.name}
                            </div>
                            <div className="card-id">#{pokemon.id}</div>
                        </div>
                        <div className="card-image-types-container">
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
                            <div className="card-weight-height-container">
                                <div className="card-data card-data-weight">
                                    <div className="title">Avg. weight:</div>
                                    <div>{pokemon.weight} lbs.</div>
                                </div>
                                <div className="card-data card-data-height">
                                    <div className="title">Avg. height:</div>
                                    <div>{pokemon.height} ft.</div>
                                </div>
                            </div>
                            <div className="card-data card-evolution-container">
                                <div className="title">Evolution family</div>
                                <div className="card-evolution-list">
                                    {!evolvesToArray || evolvesToArray.length <= 1 ? "Not applicable" : (
                                        evolvesToArray.map((evolution, i) => (
                                            <div className="evolution-name" key={i}>{`${i + 1}. ${evolution.species_name}`}</div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </>) : "Select a Pokemon!"
                }
            </div>
        </div>
    )
}

export default Card
