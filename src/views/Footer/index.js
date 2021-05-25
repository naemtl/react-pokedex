import React from 'react'

import pokemonCry from "../../assets/sounds/oldPokemonCry.mp3";
import "./styles.css"

const Footer = () => {
    const audio = new Audio(pokemonCry)
    const playAudio = () => {
        audio.play()
    }

    return (
        <div className="footer-container">
            <div className="footer-container-inner">
                &copy; Developed by <a href="https://github.com/naemtl" onClick={playAudio} target="_blank" rel="noopener noreferrer">Matthew Stinis</a>, 2021
            </div>
        </div>
    )
}

export default Footer
