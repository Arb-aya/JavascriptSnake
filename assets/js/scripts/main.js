import classes_loaded, { GameStage, Food, Snake } from './game/classes.js';
import input_loaded, { KeyMappings } from './controllers/input.js';

//----------------------------- GLOBAL CONSTANTS / FUNCTIONS
const INITIAL_HEIGHT = 300, INITIAL_WIDTH = 300;
const filesLoaded = () => classes_loaded && input_loaded;

/**
 * Does the snake wrap around the sides of the canvas?
 */
let wrapAround = false;

// Used to change direction of the Snake
let dir;



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


//Used to calculate which direction the user swipes on touch screens
let touchX, touchY = 0;

/**
 * When the touchevent starts, make a note of where the x and y of the touch was
 * @param {TouchEvent} e 
 */
function handleStartTouch(e){

    /**
     * Prevent default swipe action happening if on the canvas
     */
    if(e.target === document.getElementById('gameCanvas')){
        e.preventDefault();
    }

    touchX = e.changedTouches[0].screenX;
    touchY = e.changedTouches[0].screenY;
}


/**
 * When the touch event ends, work out the difference between the x and y
 * from the start. 
 * 
 * If the x difference is bigger consider the swipe on the horizontal axis.
 * If the y difference is bigger consider the swipe on the vertical axis.
 * 
 * @param {TouchEvent} e 
 */
function handleEndTouch(e){
   let diffX = touchX - e.changedTouches[0].screenX;
   let diffY = touchY - e.changedTouches[0].screenY;
   
   if(Math.abs(diffX) > Math.abs(diffY)){
       if(diffX > 0){
           dir = "LEFT";
       }else{
           dir = "RIGHT";
       }
   }
   else{
       if(diffY < 0){
          dir = "DOWN";
       }else{
          dir = "UP";
       }
   }
}


/*
 * When the DOM has been created and it is safe to interact
 * with, programatically create a canvas element and add it as 
 * a child of the div "gameStage"
 */

document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        if (filesLoaded) {

            //Do we have wrap around enabled?
            toggleWrap();

    
            const gameStage = new GameStage(INITIAL_WIDTH, INITIAL_HEIGHT);

            document.getElementById('gameCanvas').addEventListener("touchstart", handleStartTouch);
            document.getElementById('gameCanvas').addEventListener("touchend", handleEndTouch);
            let snake = new Snake(200, 200, gameStage.context);

            const keys = new KeyMappings();

            const ff = new Food(INITIAL_WIDTH, INITIAL_HEIGHT, gameStage.context, "green", 10);
            ff.newPosition();

            dir = snake.direction;
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