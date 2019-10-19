import classes_loaded, { GameStage, Snake } from './game/classes.js';

//----------------------------- GLOBAL CONSTANTS / FUNCTIONS
const INITIAL_HEIGHT = 300, INITIAL_WIDTH = 300;

const filesLoaded = () => classes_loaded;

/*
 * Because of the scope imposed by modules we have to explicitly 
 * expose parts of it to the window object
 */
window.startGame = function(){
    MainLoop.start();
}

window.stopGame = function() {
    MainLoop.stop();
}

/*
 * When the DOM has been created and it is safe to interact
 * with, programatically create a canvas element and add it as 
 * a child of the div "gameStage"
 */

document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        if (filesLoaded) {
            const gameStage = new GameStage(INITIAL_WIDTH, INITIAL_HEIGHT);
            const snake = new Snake(50, 50, gameStage.context);

            // --------- MAIN LOOP FUNCTIONS

            //Run at beginning of frame. Process input.
            MainLoop.setBegin(function () {
                gameStage.clear();
            });

            //Physics / AI movements, etc
            MainLoop.setUpdate(function () {

            });

            //Draw canvas elements
            MainLoop.setDraw(function () {
                snake.draw();
            });
        }
        else {
            console.log("Error loading files");
        }
    }
}