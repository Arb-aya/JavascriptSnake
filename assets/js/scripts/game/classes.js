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
     * @param {string} colour  New colour of snake
     */
    set colour(colour) {
        if (this._colour !== colour) {
            this._colour = colour;
            this._body.forEach(function (part) {
                part.colour = colour;
            });
        }
    }

    /**
     * Getters and setters 
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

    get size() {
        return this._size;
    }

    set size(size) {
        this._size = size;
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


/**
 * Manages the scores of the current session in an ordered list.
 */
export class HighscoreTable {
    /**
     * 
     * @param {number} maxNumOfScores How many scores to keep track of
     */
    constructor(maxNumOfScores = 5) {
        this._scores = [];
        this.MAX_LENGTH = maxNumOfScores;
    }

    /**
     * Adds a number to highscore list
     * @param {number} score Score to add to the highscore list
     */
    add(score) {
        /**
         * If we have no scores, add the score to the array and 
         * exit the function
         */
        if (this._scores.length === 0) {
            console.log(`No scores yet add ${score}`);
            this._scores.push(score);
        }
        else {
            /**
             * Otherwise we do have scores:
             * Find the index of where to insert the new score
             */
            let index = this._scores.findIndex(function (currentScore) {
                return score >= currentScore;
            });

            //If the index is -1, then add the element at the end of the array
            if (index < 0) {
                this._scores.push(score);
                //Otherwise insert it at index
            } else {
                this._scores.splice(index, 0, score);
            }
        }

        /**
         * If after adding the score, the number of scores we are tracking
         * is greater than the max length. Remove the last score.
         */
        if (this._scores.length > this.MAX_LENGTH) {
            this._scores.pop();
        }
    }


    /**
     * Return the the scores as an ordered list
     */
    getScoresList() {
        let returnString = "<ol>";

        this._scores.forEach(function (score) {
            returnString += `<li> ${score} </li>`;
        });

        returnString += "</ol>";

        return returnString;
    }

}


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
    attach(){
        document.body.appendChild(this._sound);
    }

    play() {
        this._sound.play();
    }

    stop() {
        this._sound.pause();
    }
}






