"use strict";

const snake_loaded = true;

export default snake_loaded;

import { GameObject } from './gameobject.js';
/**
 * Snakebodys have all functionality of a gameobject, 
 * but also keep track of their previous x and y location.
 */
class SnakeBody extends GameObject {
    /**
    * @see GameObject
    * @property {number}                         _prevX    When the x location changes, the old location is stored in prevX
    * @property {number}                         _prevY    When the y location changes, the old location is stored in prevY
    */
    constructor(x, y, context, colour, size) {
        super(x, y, context, colour, size);
        this._prevX = x;
        this._prevY = y;
    }


    /**
     * @param {number} value New x position
     */
    set x(value) {
        this._prevX = this._x;
        this._x = value;
    }

    /**
     * @param {number} value New y position
     */
    set y(value) {
        this._prevY = this._y;
        this._y = value;
    }

    /** 
     * Because we override the setters of GameObject, we also need to overload the
     * getters. Regardless of the same functionality.
     */
    get x() {
        return this._x;
    }

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
}

/**
 * Extends snakepart class with added functionality of moving and direction.
 * @see SnakeBody
 */
class SnakeHead extends SnakeBody {

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
        this._direction = direction;
        switch (direction) {
            case "UP":
                this.y -= this.size;
                break;

            case "DOWN":
                this.y += this.size;
                break;

            case "LEFT":
                this.x -= this.size;
                break;

            case "RIGHT":
                this.x += this.size;
                break;

            default:
                return false;
        }

        /**
         * Although this seems redundant without it the snake head moves on an offset 
         * to the body. I'm not sure why, but this does fix the issue.
         */
        this.x = this.x;
        this.y = this.y;
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
     * @see SnakeBody
     * @see SnakeHead
     * @param {number}                  startingBodyLength How many units the body should be composed of at the start of the game
     * @property {SnakePart/SnakeHead}  body               Array that contains SnakeHead and SnakePart. SnakeHead always the first element.
     */
    constructor(x, y, context, startingBodyLength = 5, intitalDirection = "UP", unitSize = 10, colour = "red") {
        this._colour = colour;
        this._context = context;
        this._size = unitSize;

        //Used to test if the game should continue. 
        this._isAlive = true;

        this._body = [];
        const head = new SnakeHead(x, y, context, intitalDirection, colour, unitSize);
        this._body.push(head);

        //Add new body parts until the length is startingBodyLength
        for (let i = 1; i < startingBodyLength; i++) {
            this._body.push(new SnakeBody(x, y, context, colour, unitSize));
        }
    }


    /**
     * If x and y location of snakehead and obj are the same
     * they have collided.
     * 
     * @param {object} obj Object to check for collision with
     */
    hasEaten(obj) {
        if (this._body[0].x === obj.x && this._body[0].y === obj.y) {
            return true;
        }
        return false;
    }

    /**
     * 
     * @param {number} [growAmount=1] number of new body parts the snake should grow by
     */
    grow(growAmount = 1) {
        if (growAmount <= 0)
            growAmount = 1;

        for (let i = 0; i < growAmount; i++) {
            const lastX = this._body[this._body.length - 1].x;
            const lastY = this._body[this._body.length - 1].y;

            this._body.push(new SnakeBody(lastX, lastY, this._context, this._colour, this._size));
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

    die() {
        this._isAlive = false;
    }

    /**
     * Calls the move method of the SnakeHead. For each body part
     * sets the x and y coordinate to the prevX and prevY of the element
     * before it in the array.
     * @param {string} direction Direction to move the snake in.
     */
    move(direction) {
        /*
         * If the direction is the direction opposite of the current direction. 
         * Continue moving in the same direction previously.
         */
        if ((direction === "LEFT" && this._body[0].direction === "RIGHT") ||
            (direction === "RIGHT" && this._body[0].direction === "LEFT") ||
            (direction === "UP" && this._body[0].direction === "DOWN") ||
            (direction === "DOWN" && this._body[0].direction === "UP")) {
            direction = this._body[0].direction;
        }

        this._body[0].move(direction);

        for (let i = 1; i < this._body.length; i++) {

            /**
             * If the head of the snake collides with another
             * body part. End the game.
             */
            if (this._body[0].x === this._body[i].x &&
                this._body[0].y === this._body[i].y) {
                this._isAlive = false;
            }
            else {
                this._body[i].x = this._body[i - 1].prevX;
                this._body[i].y = this._body[i - 1].prevY;
            }
        }
    }

    /**
     * @return {boolean} If snake is alive (game hasn't ended)
     */
    isAlive() {
        return this._isAlive;
    }

    get colour() {
        return this._colour;
    }

    /**
     * If colour provided is different to current colour
     * change colour of each snakepart
     * 
     * @param {string} value  New colour of snake
     */
    set colour(value) {
        if (this._colour !== value) {
            this._colour = value;
            this._body.forEach(function (part) {
                part.colour = value;
            });
        }
    }

    /**
     * Getters and setters 
     */
    get direction() {
        return this._body[0].direction;
    }

    set direction(value) {
        this._body[0].direction = value;
    }

    get y() {
        return this._body[0].y;
    }

    get x() {
        return this._body[0].x;
    }

    set y(value) {
        this._body[0].y = value;
    }

    set x(value) {
        this._body[0].x = value;
    }

    get size() {
        return this._size;
    }

    set size(value) {
        this._size = value;
    }
}