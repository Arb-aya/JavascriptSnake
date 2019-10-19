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
        this._canvas.setAttribute('id','gameCanvas');
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
    set context(context) {}
    set width(width) {}
    set height(height){}

}






