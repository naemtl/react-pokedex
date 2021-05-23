import React, { useEffect, useState } from 'react';

import { getAllPokemon, getSinglePokemon } from "./services";

const App = () => {
  const [pokemonData, setPokemonData] = useState([])
  const [nextUrl, setNextUrl] = useState("")
  const [prevUrl, setPrevUrl] = useState("")
  const [loading, setLoading] = useState(true)
  // const initialUrl = "https://pokeapi.co/api/v2/pokemon"

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
    console.log("pokemon DATA", pokemonData);
  }

  return (
    <div>
      {
      loading ? <h1>Loading...</h1> : (
          <h1>Who's that Pokemon?</h1>
        )
      }
    </div>
  )
}

export default App
