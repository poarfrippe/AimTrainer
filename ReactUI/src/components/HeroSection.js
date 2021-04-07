import React from 'react'
import "../App.css"
import {Button} from './Button'
import "./HeroSection.css";

function HeroSection() {
    return (
        <div className="hero-container">
            <video src="videos/Sparber_Trim.mp4" autoPlay loop muted />
            <h1>Improve your aim</h1>
            <p>Become a real g-g-g-gamer</p>
            <div className="hero-btns">

                <Button classname="btns" buttonStyle="btn--outline" buttonSize="btn--large" onClick={loadClassic}>Classic</Button>
                <Button classname="btns" buttonStyle="btn--outline" buttonSize="btn--large" onClick={loadFlick}>Flick</Button>
                <Button classname="btns" buttonStyle="btn--outline" buttonSize="btn--large" onClick={loadnix}>Coming</Button>
                <Button classname="btns" buttonStyle="btn--outline" buttonSize="btn--large" onClick={loadnix}>Soon</Button>
            </div>
        </div>
    )
}

function loadClassic(){
    window.location.replace("classic/")
}

function loadFlick(){
    window.location.replace("flick/")
}

function loadnix(){
    window.location.replace("/")
}

export default HeroSection
