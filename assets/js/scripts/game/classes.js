const classes_loaded = true;

export default classes_loaded;

/*
 * Class to wrap the Canvas.
 * Allows for greater control of how we interact with the properties
 * of the canvas element.
 */
export class GameStage {
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

    //Methods

    clear() {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }

    //Getters and setters
    get width() {
        return this._canvas.width;
    }

    get height() {
        return this._canvas.height;
    }

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




export class Snake {
    constructor(x, y, context, colour = "red", height = 10, width = 10) {
        this._x = x;
        this._y = y;

        this._height = height;
        this._width = width;;

        this._colour = colour;

        this._context = context;
    }

    draw() {
        this._context.fillStyle = this._colour;
        this._context.fillRect(this._x, this._y, this._width, this._height);
    }

    // Getters and Setters
    get x() {
        return this._x;
    }

    set x(x) {
        this._x = x;
    }

    get y() {
        return this._y;
    }

    set y(y) {
        this._y = y;
    }

    get colour() {
        return this._colour;
    }

    set colour(colour) {
        this._colour = colour;
    }

    get height() {
        return this._height;
    }

    set height(height) {
        this._height = height;
    }

    get width() {
        return this._width;
    }

    set width(width) {
        this._width = width;
    }
}






