"use strict";

const sound_loaded = true;

export default sound_loaded;

/**
 * Class to control playing and stopping sounds required for the game
 * Code taken from 
 * https://www.w3schools.com/graphics/game_sound.asp
 */
export class Sound {
    /**
     * @param {string} soundPath Path to the sound file 
     */
    constructor(soundPath) {
        this._sound = document.createElement("audio");
        this._sound.src = soundPath;
        this._sound.setAttribute("preload", "auto");
        this._sound.setAttribute("controls", "none");
        this._sound.style.display = "none";
    }

    /**
     * Because this cannot be done in the contrustor (this hasn't finished constructing)
     * Onus is on the user to do it after constructing a sound. 
     */
    attach() {
        document.body.appendChild(this._sound);
    }

    play() {
        this._sound.play();
    }

    stop() {
        this._sound.pause();
    }
}