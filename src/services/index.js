import axios from "axios";

export async function getAllPokemon(url = "https://pokeapi.co/api/v2/pokemon") {
    try {
        const response = await axios.get(url)
        return response.data
    } catch (error) {
        console.error("Request failed", error)
    }
}

export async function getSinglePokemon(url) {
    try {
        const response = await axios.get(url)
        return response.data
    } catch (error) {
        console.error("Request failed", error)
    }
}