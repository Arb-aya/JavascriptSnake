const classes_loaded = true;

export default classes_loaded;

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
        //Create and insert canvas to index.html
        this._canvas = document.createElement("canvas");
        this._canvas.setAttribute('id', 'gameCanvas');
        this._canvas.height = height;
        this._canvas.width = width;
        document.getElementById("gameStage").appendChild(this._canvas);

        //context object from canvas
        this._context = this._canvas.getContext("2d");
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

    /*
     * Setters are empty to allow the use of getters. 
     * To dynamically change the size of the canvas would
     * require more functionality than this.
     */
    set context(context) { }
    set width(width) { }
    set height(height) { }
}

/**
 * Abstract SnakePart that contains common functionality for both
 * the SnakeBody and SnakeHead.
 */
export class SnakePart {
    /**
     * SnakePart Constructor
     * @param   {number} x                          X location on the canvas.
     * @param   {number} y                          Y location on the canvas.
     * @param   {CanvasRenderingContext2D} context  Context from the canvas.
     * @param   {string} colour                     Colour the snake should be on the canvas.
     * @param   {number} height                     Height snake should be drawn on the canvas.
     * @param   {number} width                      Width snake should be drawn on the canvas.
     * 
     */

    constructor(x, y, context, colour, height, width) {
        this._x = x;
        this._y = y;

        this._height = height;
        this._width = width;;

        this._colour = colour;

        this._context = context;

    }

    /**
     * Draws the SnakeBodyPart on the canvas using x, y, width,
     * height and colour
     */
    draw() {
        this._context.fillStyle = this._colour;
        this._context.fillRect(this._x, this._y, this._width, this._height);
    }

    /**
     * Get SnakeBodyPart's x position
     */
    get x() {
        return this._x;
    }

    /**
     * @param {number} x new x position for SnakeBodyPart
     */
    set x(x) {
        this._x = x;
    }

    /**
     * Get SnakeBodyPart's y position
     */
    get y() {
        return this._y;
    }

    /**
     * @param {number} y new y position for SnakeBodyPart
     */
    set y(y) {
        this._y = y;
    }

    /**
     * Get SnakeBodyPart's colour
     */
    get colour() {
        return this._colour;
    }

    /**
     * @param {string} colour new colour for SnakeBodyPart
     */
    set colour(colour) {
        this._colour = colour;
    }

    /**
     * Get SnakeBodyPart's height
     */
    get height() {
        return this._height;
    }

    /**
     * @param {number} height new height for SnakeBodyPart
     */
    set height(height) {
        this._height = height;
    }

    /**
     * Get SnakeBodyPart's width
     */
    get width() {
        return this._width;
    }

    /**
     * @param {number} width new width for SnakeBodyPart
     */
    set width(width) {
        this._width = width;
    }


}

/**
 * Extends the functionality of SnakePart by
 * keeping track of it's previous X and Y co-oridnates when
 * its position is updated.
 */
export class SnakeBody extends SnakePart {

    /**
     * @see SnakeBodyPart
     */
    constructor(x, y, context, colour = "red", height = 10, width = 10) {
        super(x, y, context, colour, height, width);
    }
    /**
     * @param {number} x new x position for SnakeBodyPart
     */
    set x(x) {
        this._prevX = this._x;
        this._x = x;
    }

    /**
     * @param {number} y new y position for SnakeBodyPart
     */
    set y(y) {
        this._prevY = this._y;
        this._y = y;
    }

    /**
     * Get SnakeBodyPart's previous x position
     */
    get prevX() {
        return this._oldX;
    }

    /**
     * Get SnakeBodyPart's previous y position
     */
    get prevY() {
        return this._oldY;
    }
}


/**
 * Class to contain all information and functionality
 * required for the Head of the snake. This part of the snake
 * dictates direction and velocity.
 */
export class SnakeHead extends SnakeBodyPart {
    /**
     * @see SnakeBodyPart
     * @param   {string} [direction = "DOWN"]       Show which direction the snake is moving.  
     * @param   {number} [velocity = 0.1]           Speed at which the snake moves on the canvas.   
     */
    constructor(x, y, context, colour = "red", height = 10, width = 10, direction = "DOWN", velocity = 0.1) {
        super(x, y, context, colour, height, width);
        this._direction = direction;
        this._velocity = velocity;
    }

    /**
     * Changes snake's x or y according to the direction
     * the snake is moving in.
     * @param {number} delta    Time since update of gameloop was last called 
     */
    move(delta) {
        switch (this._direction.toUpperCase()) {
            case "UP":
                this._y -= this._velocity * delta;
                break;

            case "DOWN":
                this._y += this._velocity * delta;
                break;

            case "LEFT":
                this._x -= this._velocity * delta;
                break;

            case "RIGHT":
                this._x += this._velocity * delta;
                break;

            default:
                return false;
        }
    }

    /**
     * @param {string} direction new direction for snake. Should be UP DOWN LEFT or RIGHT.
     */
    set direction(direction) {
        this._direction = direction;
    }

    /**
     * Get Snake's direction
     */
    get direction() {
        return this._direction;
    }
}










