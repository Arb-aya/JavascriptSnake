import loaded, {GameStage} from './game/classes.js';

//----------------------------- GLOBAL CONSTANTS 
const INITIAL_HEIGHT = 300, INITIAL_WIDTH = 300;

/*
 * When the DOM has been created and it is safe to interact
 * with, programatically create a canvas element and add it as 
 * a child of the div "gameStage"
 */
document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        if(loaded)
        {
            const gameStage = new GameStage(INITIAL_WIDTH, INITIAL_HEIGHT);
        }
        else
        {
            console.log("Error loading games/classes.js");
        }
    }
}