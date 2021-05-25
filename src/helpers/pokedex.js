import { getAllPokemon, getSinglePokemon, getSinglePokemonEvolutionChain, getSinglePokemonSpecies } from "../services";

export async function loadPokemonArray(data, setPokemonData) {
    const pokemonArray = await Promise.all(
        data.map(async pokemon => {
            const pokemonEntry = await getSinglePokemon(pokemon.url)
            const pokemonSpecies = await getSinglePokemonSpecies(pokemon.name)
            const pokemonEvolutionChain = await getSinglePokemonEvolutionChain(pokemonSpecies.evolution_chain)
            const pokemonObject = {
                pokemonEntry,
                pokemonSpecies,
                pokemonEvolutionChain
            }
            return pokemonObject
        }))

    setPokemonData(pokemonArray)
}