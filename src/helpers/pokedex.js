import { getSinglePokemon, getSinglePokemonEvolutionChain, getSinglePokemonSpecies } from "../services";

export async function loadPokemonArray(data, setPokemonData) {
    const pokemonArray = await Promise.all(
        data.map(async pokemon => {
            const pokemonEntry = await getSinglePokemon(pokemon.url)
            const pokemonSpecies = await getSinglePokemonSpecies(pokemon.name)
            const pokemonEvolutionChain = await getSinglePokemonEvolutionChain(pokemonSpecies.evolution_chain.url)
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


function checkIfNextGen(evoName) {
    if (
        evoName === "espeon"
        || evoName === "umbreon"
        || evoName === "leafeon"
        || evoName === "glaceon"
        || evoName === "sylveon"
        || evoName === "slowking"
        || evoName === "steelix"
        || evoName === "crobat"
        || evoName === "bellossom"
        || evoName === "perrserker"
        || evoName === "politoed"
        || evoName === "magnezone"
        || evoName === "rhyperior"
        || evoName === "happiny"
        || evoName === "blissey"
        || evoName === "tangrowth"
        || evoName === "kingdra"
        || evoName === "mr-rime"
        || evoName === "scizor"
        || evoName === "porygon2"
        || evoName === "porygon-z"
        || evoName === "hitmonlee"
        || evoName === "hitmonchan"
        || evoName === "electivire"
        || evoName === "magmortar"
        || evoName === "munchlax"
        || evoName === "magby"
        || evoName === "elekid"
        || evoName === "smoochum"
        || evoName === "mime-jr"
        || evoName === "tyrogue"
        || evoName === "hitmontop"
        || evoName === "igglybuff"
        || evoName === "pichu"
        || evoName === "cleffa"
    ) {
        return true
    } else {
        return false
    }
}