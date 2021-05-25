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
        const numberOfEvolutions = evoData['evolves_to'].length;

        evoChain.push({
            "species_name": evoData.species.name,
            "min_level": !evoDetails ? 1 : evoDetails.min_level,
            "trigger_name": !evoDetails ? null : evoDetails.trigger.name,
            "item": !evoDetails ? null : evoDetails.item
        });

        if (numberOfEvolutions > 1) {
            for (let i = 1; i < numberOfEvolutions; i++) {
                evoChain.push({
                    "species_name": evoData.evolves_to[i].species.name,
                    "min_level": !evoData.evolves_to[i].evoDetails ? 1 : evoData.evolves_to[i].evoDetails.min_level,
                    "trigger_name": !evoData.evolves_to[i].evoDetails ? null : evoData.evolves_to[i].evoDetails.trigger.name,
                    "item": !evoData.evolves_to[i].evoDetails ? null : evoData.evolves_to[i].evoDetails.item
                });
            }
        }

        evoData = evoData['evolves_to'][0];
    } while (!!evoData && evoData.hasOwnProperty('evolves_to'));

    return evoChain.filter(chain => !checkIfNextGen(chain.species_name))
}


function checkIfNextGen(name) {
    if (name === "espeon"
        || name === "umbreon"
        || name === "leafeon"
        || name === "glaceon"
        || name === "sylveon"
        || name === "slowking"
        || name === "steelix"
        || name === "crobat"
        || name === "bellossom"
        || name === "perrserker"
        || name === "politoed"
        || name === "magnezone"
        || name === "rhyperior"
        || name === "happiny"
        || name === "blissey"
        || name === "tangrowth"
        || name === "kingdra"
        || name === "mr-rime"
        || name === "scizor"
        || name === "porygon2"
        || name === "porygon-z"
        || name === "hitmonlee"
        || name === "hitmonchan"
        || name === "electivire"
        || name === "magmortar"
        || name === "munchlax"
        || name === "magby"
        || name === "elekid"
        || name === "smoochum"
        || name === "mime-jr"
        || name === "tyrogue"
        || name === "hitmontop"
        || name === "igglybuff"
        || name === "pichu"
        || name === "cleffa"
    ) {
        return true
    } else {
        return false
    }
}