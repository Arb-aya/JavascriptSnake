"use strict";

const food_loaded = true;

export default food_loaded;

import { GameObject } from './gameobject.js';
/**
 * The food the snake eats
 */
export class Food extends GameObject {

    /**
     * @param {number}                          canvasWidth         Width of the html 5 canvas
     * @param {number}                          canvasHeight        Height of the html 5 canvas
     * @param {CanvasRenderingContext2D }       context             Context object from a html 5 canvas  
     * @param {string}                          [colour=green]      Colour food is displayed as
     * @param {number}                          [size=10]           Dictates height and width of food 
     */
    constructor(canvasWidth, canvasHeight, context, colour = "green", size = 10) {
        super(0, 0, context, colour, size);
        this._canvasWidth = canvasWidth;
        this._canvasHeight = canvasHeight;
        this.x = Food.getRandomPosition(0, this._canvasWidth, this._size)
        this.y = Food.getRandomPosition(0, this._canvasHeight, this._size)

    }

    /**
     * Generate new x and y location for the food object
     */
    newPosition() {
        this.x = Food.getRandomPosition(this._size, this._canvasWidth, this._size);
        this.y = Food.getRandomPosition(this._size, this._canvasHeight, this._size);
    }

    /**
     * Generates a random number from min-max rounded to the nearest size.
     * Help with the math was taken from:
     * https://stackoverflow.com/questions/11022488/javascript-using-round-to-the-nearest-10/11022517
     * @param {number} min      Minimum number in range of numbers to generate one from
     * @param {number} max      Maximum number in range of numbers to generate from 
     * @param {number} size     Number returned, should be returned to the nearest size.
     */
    static getRandomPosition(min, max, size = 10) {
        //Get a random number between min and max inclusive
        const num = Math.floor(Math.random() * (max - min)) + min;

        //Round the number to the nearest "size"
        const roundedNum = Math.ceil((num + 1) / size) * size;

        //If the rounded number is greater than or equal to max, bring
        //it back in bounds and set it to max - size.
        return (roundedNum >= max) ? max - size : roundedNum;
    }
}