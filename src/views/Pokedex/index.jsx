import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react';
import pokeballIcon from '@iconify-icons/mdi/pokeball';

import Card from "../../components/Card";

import { getAllPokemon, getSinglePokemon } from "../../services";

import "./styles.css"

const Pokedex = () => {
    const [pokemonData, setPokemonData] = useState([])
    const [selectedPokemon, setSelectedPokemon] = useState(null)
    const [nextUrl, setNextUrl] = useState("")
    const [prevUrl, setPrevUrl] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            const data = await getAllPokemon()
            setNextUrl(data.next)
            setPrevUrl(data.previous)
            await loadPokemonPage(data.results)
            setLoading(false)
        }
        fetchData()
    }, [])

    const loadPokemonPage = async data => {
        const pokemonArray = await Promise.all(
            data.map(async pokemon => {
                const pokemonEntry = await getSinglePokemon(pokemon.url)
                return pokemonEntry
            }))

        setPokemonData(pokemonArray)
    }

    const next = async () => {
        setLoading(true)
        const data = await getAllPokemon(nextUrl)

        if (data.results[10].name === "mew") {
            const newResults = data.results.slice(0, 11)
            await loadPokemonPage(newResults)
            setNextUrl("")
        } else {
            await loadPokemonPage(data.results)
            setNextUrl(data.next)
        }

        setPrevUrl(data.previous)
        setLoading(false)
    }

    const prev = async () => {
        if (!prevUrl) return
        setLoading(true)
        const data = await getAllPokemon(prevUrl)
        await loadPokemonPage(data.results)
        setNextUrl(data.next)
        setPrevUrl(data.previous)
        setLoading(false)
    }

    return (
        <div className="master-container">
            <div className="pokedex-container">
                {
                    loading ? <div><Icon className="loading-icon" icon={pokeballIcon} /></div> : (
                        <div className="pokedex-container-inner">
                            <div className="pokedex-card-container">
                                <div className="pokedex-camera-container">
                                    <div className="pokedex-camera-lense">
                                        <div className="lense-inner">
                                            <div className="lense-glare"></div>
                                        </div>
                                    </div>
                                    <div className="pokedex-camera-lights">
                                        <div className="red"></div>
                                        <div className="yellow"></div>
                                        <div className="green"></div>
                                    </div>
                                </div>
                                <Card pokemon={selectedPokemon} />
                            </div>
                            <div className="pokedex-hinge">
                                <div></div>
                                <div></div>
                            </div>
                            <div className="pokedex-list-container">
                                <div className="pokedex-list-container-inner">
                                    <div className="pokedex-list">
                                        {pokemonData.map((pokemon) => {
                                            return (
                                                <div className="pokedex-list-item" key={pokemon.id} onClick={() => setSelectedPokemon(pokemon)}>
                                                    {`${pokemon.id}. ${pokemon.name}`}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="pagination-controls">
                                    <button onClick={prev} disabled={!prevUrl}>Prev</button>
                                    <button onClick={next} disabled={!nextUrl}>Next</button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div >
        </div>
    )
}

export default Pokedex
