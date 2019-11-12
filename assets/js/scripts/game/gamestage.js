"use strict";

const gamestage_loaded = true;

export default gamestage_loaded;

/**
 * Wrapper class for the html5 canvas.
 */
export class GameStage {
    /**
     * 
     * @param {number} width  Width of canvas
     * @param {number} height Height of canvas
     */
    constructor(width, height) {

        /**
         * Check to see if gameCanvas already exists, if it does 
         * reference that. Otherwise create the canvas.
         */
        let el = document.getElementById('gameCanvas');
        if (!el) {
            //Create and insert canvas to index.html
            this._canvas = document.createElement("canvas");
            this._canvas.setAttribute('id', 'gameCanvas');
            this._canvas.height = height;
            this._canvas.width = width;

            document.getElementById("gameStage").appendChild(this._canvas);
        }
        else {
            this._canvas = el;
        }


        this._context = this._canvas.getContext("2d");

        this._score = 0;
    }

    /**
     * Clear the HTML 5 canvas
     */
    clear() {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }

    /**
     * @return {Number} The width of the canvas
     */
    get width() {
        return this._canvas.width;
    }

    /**
     * @return {Number} The height of the canvas
     */
    get height() {
        return this._canvas.height;
    }

    /**
     * @return {CanvasRenderingContext2D} Context of html 5 canvas
     */
    get context() {
        return this._context;
    }

    /**
     * @return {number} Score the player currently has
     */
    get score() {
        return this._score;
    }

    /**
     * Increase the score by points amount
     * @param {number} [points=10] How much to increase the score by 
     */
    increaseScore(points = 10) {
        this._score += points;
    }

    resetScore() {
        this._score = 0;
    }

    draw() {
        this._context.font = "30px Arial";
        this._context.fillStyle = "#696969";
        this._context.textAlign = "center";
        this._context.fillText(this._score, this._canvas.width / 2, 30);
    }


    /*
     * Setters are empty to allow the use of getters. 
     */

    //Don't need to set the context
    set context(context) { }

    //We can only add to the score, I don't want to set it.
    set score(score) { }

    /*To change the width and height of the canvas would require more work than just using
    these setters
    */
    set width(width) { }
    set height(height) { }
}

