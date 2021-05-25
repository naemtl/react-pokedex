import { getSinglePokemon, getSinglePokemonEvolutionChain, getSinglePokemonSpecies } from "../services";

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

export function parseEvolutionData(evolutionChain) {
    const evoChain = [];
    let evoData = evolutionChain.chain;

    do {
        const evoDetails = evoData['evolution_details'][0];

        evoChain.push({
            "species_name": evoData.species.name,
            "min_level": !evoDetails ? 1 : evoDetails.min_level,
            "trigger_name": !evoDetails ? null : evoDetails.trigger.name,
            "item": !evoDetails ? null : evoDetails.item
        });

        evoData = evoData['evolves_to'][0];
    } while (!!evoData && evoData.hasOwnProperty('evolves_to'));

    return evoChain
}