import classes_loaded, { GameStage, Food, Snake, HighscoreTable, Sound } from './game/classes.js';
import input_loaded, { KeyMappings } from './controllers/input.js';

//----------------------------- GLOBAL CONSTANTS / FUNCTIONS
const INITIAL_HEIGHT = 300, INITIAL_WIDTH = 300;
const filesLoaded = () => classes_loaded && input_loaded;

/**
 * Does the snake wrap around the sides of the canvas?
 */
let wrapAround = false;

/**
 * Are sounds enabled in the game?
 */
let soundsEnabled = true;

/**
 * Used to change direction of the Snake
 */
let dir;


/**
 * Called when the user wants to hide or show the settings panel
 */
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


/**
 * Called when the user wants to enable / disable the ability
 * to wrap around the sides of the canvas
 */
window.toggleWrap = function () {
    wrapAround = document.getElementById('wrapAround').checked;
}

/**
 * Called when the user wants to enable / disable sound in the game
 */
window.toggleSound = function () {
    soundsEnabled = document.getElementById('sounds').checked;
    document.getElementById('soundStatus').innerHTML = (soundsEnabled) ? "Enabled" : "Disabled";
}



//Used to calculate which direction the user swipes on touch screens
let touchX, touchY = 0;


/**
 * When the touchevent starts, make a note of where the x and y of the touch was
 * @param {TouchEvent} e 
 */
function handleStartTouch(e) {
    /**
     * Prevent default swipe action happening if on the canvas
     */
    if (e.target === document.getElementById('gameCanvas')) {
        e.preventDefault();
    }

    touchX = e.changedTouches[0].screenX;
    touchY = e.changedTouches[0].screenY;
}


/**
 * On touch end, work out the difference between the x and y
 * from when the touch began. 
 * 
 * If the x difference is bigger consider the swipe on the horizontal axis.
 * If the y difference is bigger consider the swipe on the vertical axis.
 * 
 * @param {TouchEvent} e 
 */
function handleEndTouch(e) {
    let diffX = touchX - e.changedTouches[0].screenX;
    let diffY = touchY - e.changedTouches[0].screenY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) {
            dir = "LEFT";
        } else {
            dir = "RIGHT";
        }
    }
    else {
        if (diffY < 0) {
            dir = "DOWN";
        } else {
            dir = "UP";
        }
    }
}

/**
 * Used to check if sounds are enabled and if the 
 * browser supports audio tags
 */
function canPlayAudio() {
    return soundsEnabled && Modernizr.audio;
}

/*
 * When the DOM has been created and it is safe to interact
 * with, programatically create a canvas element and add it as 
 * a child of the div "gameStage"
 */

document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        if (filesLoaded) {

            //Canvas
            const gameStage = new GameStage(INITIAL_WIDTH, INITIAL_HEIGHT);

            //Input control
            const keys = new KeyMappings();

            /**
             * Create sounds if browser supports them
             */
            let eatSound, gameoverSound, gamestartSound, gamepauseSound;
            if (Modernizr.audio) {
                eatSound = new Sound("https://raw.githubusercontent.com/CDHayden/JavascriptSnake/master/assets/sounds/eat.mp3");
                eatSound.attach();

                gameoverSound = new Sound("https://raw.githubusercontent.com/CDHayden/JavascriptSnake/master/assets/sounds/gameover.mp3");
                gameoverSound.attach();

                gamestartSound = new Sound("https://raw.githubusercontent.com/CDHayden/JavascriptSnake/master/assets/sounds/gamestart.mp3");
                gamestartSound.attach();

                gamepauseSound = new Sound("https://raw.githubusercontent.com/CDHayden/JavascriptSnake/master/assets/sounds/gamepause.mp3");
                gamepauseSound.attach();
            }


            //Player
            let snake = new Snake(200, 200, gameStage.context);
            dir = snake.direction;

            //Food
            const food = new Food(INITIAL_WIDTH, INITIAL_HEIGHT, gameStage.context, "green", 10);
            food.newPosition();

            //Highscores
            let highscores = new HighscoreTable();

            /**
            * Called when the user wants to start / pause the game
            */
            window.toggleGameStatus = function () {
                let button = document.getElementById('toggleGame');

                switch (button.innerText) {
                    case "NEW GAME":
                    default:
                        button.innerText = "PAUSE";
                        newGame();
                        break;

                    case "PAUSE":
                        button.innerText = "RESUME";
                        if (canPlayAudio()) {
                            gamepauseSound.play();
                        }
                        MainLoop.stop();
                        break;

                    case "RESUME":
                        button.innerText = "PAUSE";
                        if (canPlayAudio()) {
                            gamepauseSound.play();
                        }
                        MainLoop.start();
                        break;
                }
            }

            /**
             * Called when the user clicks a button to update the Snake's colour
             */
            window.updateSnakeColour = function (colour) {
                if (typeof snake !== "undefined") {
                    snake.colour = colour;
                }
            }

            /**
             * Called when the player dies.
             */
            function endGame() {
                if (canPlayAudio()) {
                    gameoverSound.play();
                }
                MainLoop.stop();
                highscores.add(gameStage.score);

                document.getElementById('scoreTable').innerHTML = `<h2>High scores:</h2> ${highscores.getScoresList()}`;
                document.getElementById('toggleGame').innerText = "NEW GAME";
            }

            /**
             * Called when we start a new game
             */
            function newGame() {
                gameStage.resetScore();
                snake = new Snake(200, 200, gameStage.context);
                food.newPosition();

                if (canPlayAudio()) {
                    gamestartSound.play();
                }
                MainLoop.start();
            }

            /**
             * Check to see if the snake x and y location are less than 0 
             * or greater than the width / height of the canvas. 
             * 
             * Then check to see if wrapAround is enabled. If so, move snake to 
             * opposite side of the canvas, otherwise the snake dies and the game ends.
             * 
             * Exposed to the window so that it can be tested. I also had to add the testing flag
             * as I didn't know how to expost the "wrapAround" variable from this file in the test.js
             * file.
             * 
             * @param {Snake} snake The snake object
             * @param {boolean} testing Are we testing this function or not.
             */
            window.wrapAroundLogic = function (snake, testing = false) {
                if (snake.x <= 0) {
                    if (wrapAround || testing) {
                        snake.x = INITIAL_WIDTH - snake.size;
                    }
                    else {
                        snake.die();
                    }
                }

                if (snake.x >= INITIAL_WIDTH) {
                    if (wrapAround || testing) {
                        snake.x = 0;
                    }
                    else {
                        snake.die();
                    }
                }

                if (snake.y <= 0) {
                    if (wrapAround || testing) {
                        snake.y = INITIAL_HEIGHT - snake.size;
                    }
                    else {
                        snake.die();
                    }
                }

                if (snake.y >= INITIAL_HEIGHT) {
                    if (wrapAround || testing) {
                        snake.y = 0;
                    }
                    else {
                        snake.die();
                    }
                }

                return snake;
            }


            /**
             * The frame rate that the gameloop mimics. Basically this controls 
             * how fast the snake moves
             */
            MainLoop.setSimulationTimestep(90);

            /**
             * Event Listeners to capture:
             *      Keypresses to move the snake
             *      Touch events to move the snake
             */
            window.addEventListener("keydown", function (key) {
                if (keys.getDirection(key.keyCode)) {
                    dir = (keys.getDirection(key.keyCode));
                }
            });

            document.getElementById('gameCanvas').addEventListener("touchstart", handleStartTouch);
            document.getElementById('gameCanvas').addEventListener("touchend", handleEndTouch);


            // --------- MAIN LOOP FUNCTIONS
            //Run at beginning of frame. Process input.
            MainLoop.setBegin(function () {
                if (snake.hasEaten(food)) {
                    if (canPlayAudio()) {
                        eatSound.play();
                    }

                    food.newPosition();
                    snake.grow();
                    gameStage.increaseScore();
                }
            });

            //Physics / AI movements, etc
            MainLoop.setUpdate(function (delta) {
                snake.move(dir);

                snake = wrapAroundLogic(snake);

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
                food.draw();
            });
        }
        else {
            console.log("Error loading files");
        }
    }
}