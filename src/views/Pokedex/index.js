import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react';
import pokeballIcon from '@iconify-icons/mdi/pokeball';

import Card from "../../components/Card";

import { loadPokemonArray, parseEvolutionData } from "../../helpers/pokedex";
import { getAllPokemon } from "../../services";

import "./styles.css"

const Pokedex = () => {
    const [pokemonData, setPokemonData] = useState([])
    const [selectedPokemon, setSelectedPokemon] = useState(null)
    const [evolvesToArray, setEvolvesToArray] = useState(null)
    const [nextUrl, setNextUrl] = useState("")
    const [prevUrl, setPrevUrl] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            const data = await getAllPokemon()
            setNextUrl(data.next)
            setPrevUrl(data.previous)
            await loadPokemonArray(data.results, setPokemonData)
            setLoading(false)
        }
        fetchData()
    }, [])

    const next = async () => {
        setLoading(true)
        const data = await getAllPokemon(nextUrl)

        if (data.results[10].name === "mew") {
            const newResults = data.results.slice(0, 11)
            await loadPokemonArray(newResults, setPokemonData)
            setNextUrl("")
        } else {
            await loadPokemonArray(data.results, setPokemonData)
            setNextUrl(data.next)
        }

        setPrevUrl(data.previous)
        setLoading(false)
    }

    const prev = async () => {
        if (!prevUrl) return
        setLoading(true)
        const data = await getAllPokemon(prevUrl)
        await loadPokemonArray(data.results, setPokemonData)
        setNextUrl(data.next)
        setPrevUrl(data.previous)
        setLoading(false)
    }

    const pokedexListEntryOnClick = (pokemonEntry, pokemonEvolutionChain) => {
        setSelectedPokemon(pokemonEntry)
        setEvolvesToArray(parseEvolutionData(pokemonEvolutionChain))
    }

    return (
        <div className="master-container">
            <div className="pokedex-container">
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
                        <Card pokemon={selectedPokemon} evolvesToArray={evolvesToArray} />
                    </div>
                    <div className="pokedex-hinge">
                        <div></div>
                        <div></div>
                    </div>
                    <div className="pokedex-list-container">
                        <div className="pokedex-list-container-inner">
                            <div className={`pokedex-list ${loading ? "" : "list-columns"}`}>
                                {
                                    loading ? (
                                        <div className="loading-icon-container">
                                            <Icon className="loading-icon" icon={pokeballIcon} />
                                        </div>
                                    ) : (pokemonData.map((pokemon) => {
                                        const { pokemonEntry, pokemonEvolutionChain } = pokemon
                                        return (
                                            <div className="pokedex-list-item" key={pokemonEntry.id} onClick={() => pokedexListEntryOnClick(pokemonEntry, pokemonEvolutionChain)}>
                                                {`${pokemonEntry.id}. ${pokemonEntry.name}`}
                                            </div>
                                        )
                                    }))}
                            </div>
                        </div>
                        <div className="pagination-controls">
                            <button onClick={prev} disabled={!prevUrl}>Prev</button>
                            <button onClick={next} disabled={!nextUrl}>Next</button>
                        </div>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default Pokedex
