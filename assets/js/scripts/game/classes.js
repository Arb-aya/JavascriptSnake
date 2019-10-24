"use strict";

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
 *  Base class for each part of the snake. Contains basic functionality to move and draw it.
 */
class SnakePart {

    /**
     *  Constructs a new colour snakepart at x,y via context at a size of size.
     * @param    {number}                          x        x location for this snake part
     * @param    {number}                          y        y location for this snake part
     * @param    {CanvasRenderingContext2D }       context  context object from a html 5 canvas     
     * @param    {string}                          colour   colour of this snake part
     * @param    {number}                          size     defines the height and width of this unit
     * @property {number}                          prevX    When the x location changes, the old location is stored in prevX
     * @property {number}                          prevY    When the y location changes, the old location is stored in prevY
     */
    constructor(x, y, context, colour, size) {
        this._x = x;
        this._y = y;

        this._prevX = x;
        this._prevY = y;

        this._size = size;

        this._colour = colour;

        this._context = context;

    }

    /**
     * Draws the snakepart on the html5 canvas, via the context object.
     */
    draw() {
        this._context.fillStyle = this._colour;
        this._context.fillRect(this._x, this._y, this._size, this._size);
    }

    /**
     * @param {number} x the new x position to change to
     * Stores the old x value in prevX
     */
    set x(x) {
        this._prevX = this._x;
        this._x = x;
    }

    /**
     * @param {number} y the new y position to change to
     * Stores the old y value in prevY
     */
    set y(y) {
        this._prevY = this._y;
        this._y = y;
    }

    /**
     * Get snakepart's x location
     */
    get x() {
        return this._x;
    }

    /**
     * Get snakepart's y location
     */
    get y() {
        return this._y;
    }

    /**
     * Get the old x location of this snakepart
     */
    get prevX() {
        return this._prevX;
    }

    /**
     * Get the old y location of this snakepart
     */
    get prevY() {
        return this._prevY;
    }

    /**
     * Get the colour of this snakepart
     */
    get colour() {
        return this._colour;
    }

    /**
     * @param {string} colour   The colour this snakepart should be
     */
    set colour(colour) {
        this._colour = colour;
    }

    /**
     * Get the size of this snakepart
     */
    get size() {
        return this._size;
    }

    /**
     * @param {number} size Size the snakepart should be. Used for height and width.
     */
    set size(size) {
        this._size = size;
    }
}

/**
 * Extends snakepart class with added functionality of moving and direction.
 * @see SnakePart
 */
class SnakeHead extends SnakePart {

    /**
     * @see SnakePart
     * @param {string} initialDirection Direction the snake should start moving in
     */
    constructor(x, y, context, initialDirection, colour, size) {
        super(x, y, context, colour, size);
        this._direction = initialDirection;
    }

    /**
     * Changes the x or y location of the snake based on snake's direction
     * @param {direction} [direction = this.direction] Direction to move in 
     */
    move(direction = this._direction) {
        switch (direction) {
            case "UP":
                this.y -= this.size;
                this.x = this.x;
                break;

            case "DOWN":
                this.y += this.size;
                this.x = this.x;
                break;

            case "LEFT":
                this.x -= this.size;
                this.y = this.y;
                break;

            case "RIGHT":
                this.x += this.size;
                this.y = this.y;
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

/**
 * Snake class manages the snake body and moving each part of the body.
 */
export class Snake {
    /**
     * @see SnakePart
     * @see SnakeHead
     * @param {number}                  startingBodyLength How many units the body should be composed of at the start of the game
     * @property {SnakePart/SnakeHead}  body               Array that contains SnakeHead and SnakePart. SnakeHead always the first element.
     */
    constructor(x, y, context, startingBodyLength = 5, intitalDirection = "UP", unitSize = 10, colour = "red") {
        this._body = [];
        const head = new SnakeHead(x, y, context, intitalDirection, colour, unitSize);
        this._body.push(head);

        for (let i = 1; i < startingBodyLength; i++) {
            this._body.push(new SnakePart(x, y, context, colour, unitSize));
        }
    }


    /**
     * Call the draw method on each snake part.
     */
    draw() {
        this._body.forEach(function (part) {
            part.draw();
        });
    }

    /**
     * Calls the move method of the SnakeHead. For each body part
     * sets the x and y coordinate to the prevX and prevY of the element
     * before it in the array.
     * @param {string} direction Direction to move the snake in.
     */
    move(direction) {

        this._body[0].move(direction);

        for (let i = 1; i < this._body.length; i++) {
            this._body[i].x = this._body[i - 1].prevX;
            this._body[i].y = this._body[i - 1].prevY;
        }

    }

    /**
     * Get the direction of the head of the snake.
     */
    getDirection() {
        return this._body[0].direction;
    }
}








