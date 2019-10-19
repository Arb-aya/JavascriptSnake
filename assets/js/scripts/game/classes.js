 const loaded = true;
 
export default loaded;

/*
 * Class to wrap the Canvas.
 * Allows for greater control of how we interact with the properties
 * of the canvas element.
 */
export class GameStage {
    constructor(width, height) {
        //Create and insert canvas to index.html
        this._canvas = document.createElement("canvas");
        this._canvas.height = height;
        this._canvas.width = width;
        document.getElementById("gameStage").appendChild(this._canvas);

        //context object from canvas
        this._context = this._canvas.getContext("2d");
    }

    //Getters and setters
    get width() {
        return this._canvas.width;
    }

    set width(width) {
        this._canvas.width = width;
    }

    get height() {
        return this._canvas.height;
    }

    set height(height) {
        this._canvas.height = height;
    }

    get context() {
        return this._canvas.context;
    }


    //Empty function to prevent reassigning the context object
    set context(context) {

    }
}






