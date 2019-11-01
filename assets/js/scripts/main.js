import classes_loaded, { GameStage, Food, Snake } from './game/classes.js';
import input_loaded, { KeyMappings } from './controllers/input.js';

//----------------------------- GLOBAL CONSTANTS / FUNCTIONS
const INITIAL_HEIGHT = 300, INITIAL_WIDTH = 300;
const filesLoaded = () => classes_loaded && input_loaded;
let wrapAround = false;

/*
 * Because of the scope imposed by modules we have to explicitly 
 * expose parts of it to the window object
 */
window.startGame = function () {
    MainLoop.start();
}

window.stopGame = function () {
    MainLoop.stop();
}

window.toggleSettings = function (btn) {
    let settings = document.getElementById("settings");
    if (settings.style.display === "block") {
        settings.style.display = "none";
        btn.childNodes[0].nodeValue = "Show settings";

    }
    else {
        settings.style.display = "block";
        btn.childNodes[0].nodeValue = "Hide settings";
    }
}

window.toggleWrap = function () {
    wrapAround = document.getElementById('wrapAround').checked;
}


function endGame() {
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

            toggleWrap();

            const gameStage = new GameStage(INITIAL_WIDTH, INITIAL_HEIGHT);

            const snake = new Snake(200, 200, gameStage.context);

            const keys = new KeyMappings();

            const ff = new Food(INITIAL_WIDTH, INITIAL_HEIGHT, gameStage.context, "green", 10);
            ff.newPosition();
            let dir = snake.direction;

            /**
             * The frame rate that the gameloop mimics. Basically this controls 
             * how fast the snake moves
             */

            MainLoop.setSimulationTimestep(90);

            window.updateSnakeColour = function (colour) {
                snake.colour = colour;
            }

            window.testFood = function () {
                ff.newPosition();
            }

            // ----------  EVENT LISTENERS FOR THE SETTINGS / TO CAPTURE INPUT
            window.addEventListener("keydown", function (key) {
                if (keys.getDirection(key.keyCode)) {
                    dir = (keys.getDirection(key.keyCode));
                }
            });


            // --------- MAIN LOOP FUNCTIONS

            //Run at beginning of frame. Process input.
            MainLoop.setBegin(function () {
                if (snake.hasEaten(ff)) {
                    ff.newPosition();
                    snake.grow();
                    gameStage.increaseScore();
                }
            });

            //Physics / AI movements, etc
            MainLoop.setUpdate(function (delta) {
                snake.move(dir);


                /**
                 * Check to see if the snake x and y location are less than 0 
                 * or greater than the width / height of the canvas. 
                 * 
                 * Then check to see if wrapAround is enabled. If so, move snake to 
                 * opposite side of the canvas, otherwise the snake dies and the game ends.
                 */
                if (snake.x < 0) {
                    if (wrapAround) {
                        snake.x = INITIAL_WIDTH - snake.size;
                    }
                    else{
                        snake.die();
                    }
                }

                if (snake.x > INITIAL_WIDTH) {
                    if (wrapAround) {
                        snake.x = 0;
                    }
                    else{
                        snake.die();
                    }
                }

                if(snake.y < 0){
                    if(wrapAround){
                        snake.y = INITIAL_HEIGHT - snake.size;
                    }
                    else{
                        snake.die();
                    }
                }

                if(snake.y > INITIAL_HEIGHT){
                    if(wrapAround){
                        snake.y = 0;
                    }
                    else{
                        snake.die();
                    }
                }

                // After snake has moved, see if we need to end game
                if (!snake.isAlive()) {
                    endGame();
                }
            });

            //Draw canvas elements
            MainLoop.setDraw(function () {
                gameStage.clear();
                gameStage.draw();
                snake.draw();
                ff.draw();
            });
        }
        else {
            console.log("Error loading files");
        }
    }
}