import React from 'react'
import "../App.css"
import {Button} from './Button'
import "./HeroSection.css";

function HeroSection() {
    return (
        <div className="hero-container">
            <video src="/videos/video-2.mp4" autoPlay loop muted />
            <h1>Improve your aim</h1>
            <p>Like a real g-g-g-gamer</p>
            <br/>
            <div className="hero-btns">
                <Button classname="btns" buttonStyle="btn--outline" buttonSize="btn--large">Classic</Button>
                <Button classname="btns" buttonStyle="btn--outline" buttonSize="btn--large">Flick</Button>
                <Button classname="btns" buttonStyle="btn--outline" buttonSize="btn--large">Mode 3</Button>
                <Button classname="btns" buttonStyle="btn--outline" buttonSize="btn--large">Mode 4</Button>
            </div>
        </div>
    )
}

export default HeroSection
