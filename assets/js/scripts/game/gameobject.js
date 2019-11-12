"use strict";

/**
 *  Base class for each GameObject. Contains basic functionality to place and draw it.
 */
export class GameObject {
    /**
     *  Constructs a new colour GameObject at x,y via context at a size of size.
     * @param    {number}                          x        x location for this GameObject
     * @param    {number}                          y        y location for this GameObject
     * @param    {CanvasRenderingContext2D }       context  context object from a html 5 canvas     
     * @param    {string}                          colour   colour of this GameObject
     * @param    {number}                          size     defines the height and width of this unit
     */
    constructor(x, y, context, colour, size) {
        this._x = x;
        this._y = y;

        this._size = size;

        this._colour = colour;

        this._context = context;

    }

    /**
     * Draws the GameObject on the html5 canvas, via the context object.
     */
    draw() {
        this._context.fillStyle = this._colour;
        this._context.fillRect(this._x, this._y, this._size, this._size);
    }

    /**
     * @param {number} value the new x position 
     */
    set x(value) {
        this._x = value;
    }

    /**
     * @param {number} value the new y position 
     */
    set y(value) {
        this._y = value;
    }

    /**
     * Get GameObjects's x location
     */
    get x() {
        return this._x;
    }

    /**
     * Get GameObjects's y location
     */
    get y() {
        return this._y;
    }

    /**
     * Get the colour of this snakepart
     */
    get colour() {
        return this._colour;
    }

    /**
     * @param {string} value   The colour this GameObject should be
     */
    set colour(value) {
        this._colour = value;
    }

    /**
     * Get the size of this GameObject
     */
    get size() {
        return this._size;
    }

    /**
     * @param {number} value Size the GameObject should be. Used for height and width.
     */
    set size(value) {
        this._size = value;
    }
}

/**
 * Snakebodys have all functionality of a gameobject,
 * but also keep track of their previous x and y location.
 */