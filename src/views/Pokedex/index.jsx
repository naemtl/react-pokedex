import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react';
import pokeballIcon from '@iconify-icons/mdi/pokeball';

import Card from "../../components/Card";

import { getAllPokemon, getSinglePokemon } from "../../services";

const Pokedex = () => {
    const [pokemonData, setPokemonData] = useState([])
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
        <div>
            {
                loading ? <div><Icon className="loading-icon" icon={pokeballIcon} /></div> : (
                    <>
                        <div className="button-container">
                            <button onClick={prev} disabled={!prevUrl}>Prev</button>
                            <button onClick={next} disabled={!nextUrl}>Next</button>
                        </div>
                        <div className="grid-container">
                            {/* {pokemonData.map((pokemon) => {
                                return (<div key={pokemon.id}>{`${pokemon.id}. ${pokemon.name}`}</div>)
                            })} */}
                            {pokemonData.map((pokemon, i) => {
                                return <Card key={i} pokemon={pokemon} />
                            })}
                        </div>
                    </>
                )
            }
        </div >
    )
}

export default Pokedex
