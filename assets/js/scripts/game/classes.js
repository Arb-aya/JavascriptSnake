'use strict';

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
class SnakePart {

    constructor(x, y, context, colour, size) {
        this._x = x;
        this._y = y;

        this._prevX = x;
        this._prevY = y;

        this._size = size;

        this._colour = colour;

        this._context = context;

    }

    draw() {
        this._context.fillStyle = this._colour;
        this._context.fillRect(this._x, this._y, this._size, this._size);
    }

    set x(x) {
        this._prevX = this._x;
        this._x = x;
    }

    set y(y) {
        this._prevY = this._y;
        this._y = y;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get prevX() {
        return this._prevX;
    }

    get prevY() {
        return this._prevY;
    }

    get colour() {
        return this._colour;
    }

    set colour(colour) {
        this._colour = colour;
    }

    get size() {
        return this._size;
    }

    set size(size) {
        this._size = size;
    }
}

class SnakeHead extends SnakePart {

    constructor(x, y, context, initialDirection, colour, size) {
        super(x, y, context, colour, size);
        this._direction = initialDirection;
    }

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

export class Snake {
    constructor(x, y, context, startingBodyLength = 5, intitalDirection = "UP", unitSize = 10, colour = "red") {
        this._body = [];
        const head = new SnakeHead(x, y, context, intitalDirection, colour, unitSize);
        this._body.push(head);

        for (let i = 1; i < startingBodyLength; i++) {
            this._body.push(new SnakePart(x, y, context, colour, unitSize));
        }
    }


    draw() {
        this._body.forEach(function (part) {
            part.draw();
        });
    }

    move(direction) {

        this._body[0].move(direction);

        for (let i = 1; i < this._body.length; i++) {
            this._body[i].x = this._body[i - 1].prevX;
            this._body[i].y = this._body[i - 1].prevY;
        }

    }

    changeDirection(direction) {
        this._body[0].direction = direction;
    }

    getDirection() {
        return this._body[0].direction;
    }
}








