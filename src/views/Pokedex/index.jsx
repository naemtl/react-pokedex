import React, { useEffect, useState } from 'react'

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
            await loadPokemon(data.results)
            setLoading(false)
        }
        fetchData()
    }, [])

    const loadPokemon = async data => {
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
        await loadPokemon(data.results)
        setNextUrl(data.next)
        setPrevUrl(data.previous)
        setLoading(false)
    }

    const prev = async () => {
        if (!prevUrl) return
        setLoading(true)
        const data = await getAllPokemon(prevUrl)
        await loadPokemon(data.results)
        setNextUrl(data.next)
        setPrevUrl(data.previous)
        setLoading(false)
    }

    return (
        <div>
            {
                loading ? <h1>Loading...</h1> : (
                    <>
                        <div className="button-container">
                            <button onClick={prev}>Prev</button>
                            <button onClick={next}>Next</button>
                        </div>
                        <div className="grid-container">
                            {pokemonData.map((pokemon, i) => {
                                return <Card key={i} pokemon={pokemon} />
                            })}
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default Pokedex
