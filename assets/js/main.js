//----------------------------- GLOBAL CONSTANTS 
const INITIAL_HEIGHT = 300, INITIAL_WIDTH = 300;


//----------------------------- CLASSES 

/*
 * Class to wrap the Canvas.
 * Allows for greater control of how we interact with the properties
 * of the canvas element.
 */
class GameStage {
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
    get width()
    {
        return this._canvas.width;
    }

    set width(width)
    {
        this._canvas.width = width;
    }

    get height()
    {
        return this._canvas.height;
    }

    set height(height)
    {
        this._canvas.height = height;
    }

    get context()
    {
        return this._canvas.context;
    }


    //Empty function to prevent reassigning the context object
    set context(context)
    {

    }
}
/*
 * When the DOM has been created and it is safe to interact
 * with, programatically create a canvas element and add it as 
 * a child of the div "gameStage"
 */
document.onreadystatechange = () => {
    if (document.readyState === "interactive") {
        const gameStage = new GameStage(INITIAL_WIDTH, INITIAL_HEIGHT);
    }
}