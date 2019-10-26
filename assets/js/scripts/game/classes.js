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
 *  Base class for each GameObject. Contains basic functionality to place and draw it.
 */
class GameObject {
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
     * @param {number} x the new x position 
     */
    set x(x) {
        this._x = x;
    }

    /**
     * @param {number} y the new y position 
     */
    set y(y) {
        this._y = y;
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
     * @param {string} colour   The colour this GameObject should be
     */
    set colour(colour) {
        this._colour = colour;
    }

    /**
     * Get the size of this GameObject
     */
    get size() {
        return this._size;
    }

    /**
     * @param {number} size Size the GameObject should be. Used for height and width.
     */
    set size(size) {
        this._size = size;
    }
}

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
     * @param {number} x
     */
    set x(x) {
        this._prevX = this._x;
        this._x = x;
    }

    set y(y) {
        this._prevY = this._y;
        this._y = y;
    }

    /** 
     * Because we override the setters of GameObject, we also need to overload the
     * getters. Regardless of the same functionality.
     */
    get x(){
        return this._x;
    }

    get y(){
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
     * @see SnakeBody
     * @see SnakeHead
     * @param {number}                  startingBodyLength How many units the body should be composed of at the start of the game
     * @property {SnakePart/SnakeHead}  body               Array that contains SnakeHead and SnakePart. SnakeHead always the first element.
     */
    constructor(x, y, context, startingBodyLength = 5, intitalDirection = "UP", unitSize = 10, colour = "red") {
        this._colour = colour;
        this._body = [];
        const head = new SnakeHead(x, y, context, intitalDirection, colour, unitSize);
        this._body.push(head);

        for (let i = 1; i < startingBodyLength; i++) {
            this._body.push(new SnakeBody(x, y, context, colour, unitSize));
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
            this._body[i].x = this._body[i - 1].prevX;
            this._body[i].y = this._body[i - 1].prevY;
        }
    }

    get colour() {
        return this._colour;
    }

    set colour(colour) {
        if (this._colour !== colour) {
            this._colour = colour;
            this._body.forEach(function (part) {
                part.colour = colour;
            });
        }
    }

    /**
     * Getters and setters used for testing purposes
     */
    get direction() {
        return this._body[0].direction;
    }

    set direction(direction) {
        this._body[0].direction = direction;
    }

    get y() {
        return this._body[0].y;
    }

    get x() {
        return this._body[0].x;
    }

    set y(y) {
        this._body[0].y = y;
    }

    set x(x) {
        this._body[0].x = x;
    }
}

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
    constructor(canvasWidth, canvasHeight, context, colour="green", size=10) {
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
     * Checks to see if this food object and obj have collided.
     * Simply by checking if the x and y location are the same.
     * 
     * @param {object} obj Object to check for collision with
     */
    eatenBy(obj){
        if(this.x === obj.x && this.y === obj.y){
            return true;
        }    

        return false;
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
        return (roundedNum >= max) ? max-size : roundedNum;
    }
}






