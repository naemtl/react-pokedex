import axios from "axios";

export async function getAllPokemon() {
    try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon")
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