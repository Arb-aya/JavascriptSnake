import classes_loaded, { GameStage, Snake, Food } from "../scripts/game/classes.js";
import input_loaded, { KeyMappings } from "../scripts/controllers/input.js";


// --------------------------------------- GameStage Tests
describe("GameStage class", function () {
    const INITIAL_WIDTH = 300, INITIAL_HEIGHT = 300;
    const game = new GameStage(INITIAL_WIDTH, INITIAL_HEIGHT);

    it("Should have created a canvas with id of gameCanvas", function () {
        expect(document.getElementById("gameCanvas")).not.toEqual(null);
    });

    it("Should be able to get the game score", function(){
        game.resetScore();
        expect(game.score).toBe(0);
    });

    it("Should be able to set the increase the game score", function(){
        const score = game.score;
        game.increaseScore();
        expect(game.score).toBe(score+10);
    });

    it("Should be able to reset the game score", function(){
        game.increaseScore();
        game.resetScore();
        expect(game.score).toBe(0);
    });

    describe("Getters", function () {
        it(`Should get the width of the canvas : ${INITIAL_WIDTH}`, function () {
            expect(game.width).toBe(INITIAL_WIDTH);
        });

        it(`Should get the height of the canvas : ${INITIAL_HEIGHT}`, function () {
            expect(game.height).toBe(INITIAL_HEIGHT);
        });

        it("Should get CanvasRenderingContext2D from the canvas", function () {
            expect(game.context).not.toEqual(null);
        });
    });



});

// --------------------------------------- KeyMappings Tests
describe("KeyMappings class", function () {
    const defaultKeys = new KeyMappings();
    const OVR_UP = 87, OVR_DOWN = 65, OVR_LEFT = 13, OVR_RIGHT = 19;
    const ovrKeys = new KeyMappings(OVR_UP, OVR_DOWN, OVR_LEFT, OVR_RIGHT);


    describe("Constructor Defaults", function () {

        beforeEach(function () {
            defaultKeys.up = 38;
            defaultKeys.down = 40;
            defaultKeys.left = 37;
            defaultKeys.right = 39;
        });

        it("Should have the default up key of 38", function () {
            expect(defaultKeys.up).toBe(38);
        });

        it("Should have the default down key of 40", function () {
            expect(defaultKeys.down).toBe(40);
        });

        it("Should have the default left key of 37", function () {
            expect(defaultKeys.left).toBe(37);
        });

        it("Should have the default right key of 39", function () {
            expect(defaultKeys.right).toBe(39);
        });

        describe("Providing values in place of default values", function () {
            it(`Should have provided Up key of ${OVR_UP}`, function () {
                expect(ovrKeys.up).toBe(OVR_UP);
            });

            it(`Should have provided Down key of ${OVR_DOWN}`, function () {
                expect(ovrKeys.down).toBe(OVR_DOWN);
            });

            it(`Should have provided Left key of ${OVR_LEFT}`, function () {
                expect(ovrKeys.left).toBe(OVR_LEFT);
            });

            it(`Should have provided Right key of ${OVR_RIGHT}`, function () {
                expect(ovrKeys.right).toBe(OVR_RIGHT);
            });
        });
    });

    describe("Getters and Setters", function () {

        beforeEach(function () {
            defaultKeys.up = 38;
            defaultKeys.down = 40;
            defaultKeys.left = 37;
            defaultKeys.right = 39;
        });

        it(`Should be able to set up key to ${OVR_UP}`, function () {
            defaultKeys.up = OVR_UP;
            expect(defaultKeys.up).toBe(OVR_UP);
        });

        it(`Should be able to set down key to ${OVR_DOWN}`, function () {
            defaultKeys.down = OVR_DOWN;
            expect(defaultKeys.down).toBe(OVR_DOWN);
        });

        it(`Should be able to set left key to ${OVR_LEFT}`, function () {
            defaultKeys.left = OVR_LEFT;
            expect(defaultKeys.left).toBe(OVR_LEFT);
        });

        it(`Should be able to set right key to ${OVR_RIGHT}`, function () {
            defaultKeys.right = OVR_RIGHT;
            expect(defaultKeys.right).toBe(OVR_RIGHT);
        });
    });

    describe("getDirection method", function () {
        it("Should return \"UP\" when passed keycode mapped to \"up\" property", function () {
            expect(defaultKeys.getDirection(defaultKeys.up)).toEqual("UP");
        });

        it("Should return \"DOWN\" when passed keycode mapped to \"down\" property", function () {
            expect(defaultKeys.getDirection(defaultKeys.down)).toBe("DOWN");
        });

        it("Should return \"LEFT\" when passed keycode mapped to \"left\" property", function () {
            expect(defaultKeys.getDirection(defaultKeys.left)).toBe("LEFT");
        });

        it("Should return \"RIGHT\" when passed keycode mapped to \"right\" property", function () {
            expect(defaultKeys.getDirection(defaultKeys.right)).toBe("RIGHT");
        });
    });
});

// --------------------------------------- SnakePart Tests
describe("Snake", function () {
    /*
  * Define values needed for tests to avoid the use of
  * magic numbers. Also allows for more flexible use of 
  * test decriptions via template literals
  */
    const INITIAL_WIDTH = 300, INITIAL_HEIGHT = 300;
    const game = new GameStage(INITIAL_WIDTH, INITIAL_HEIGHT);

    const SNAKE_X = 50, SNAKE_Y = 50, NEW_X = 33, NEW_Y = 33, COLOUR = "Red", NEW_COLOUR = "Blue";
    let snake = new Snake(SNAKE_X, SNAKE_Y, game.context);
    let food = new Food(INITIAL_WIDTH, INITIAL_HEIGHT);

    beforeEach(function () {
        snake.x = SNAKE_X;
        snake.y = SNAKE_Y;
        snake.colour = COLOUR; 
        snake._body[0].size = 10;
    });

    it("Should return false when hasEaten() is passed an object with different x and y than the food object", function(){
        food.x = 60;
        food.y = 60;

        expect(snake.hasEaten(food)).toBe(false);
    });

    it("Should return true when eatenBy() is passed an object with the same x and y as the food object", function(){
        food.x = SNAKE_X;
        food.y = SNAKE_Y;
        expect(snake.hasEaten(food)).toBe(true);
    });

    describe("Getters and setters (inherited from GameObject/SnakeBody)", function () {
        it("Should be able to get the snake's colour", function(){
            expect(snake.colour).toBe(COLOUR);
        });

        it(`Should be able to set the snake's colour to ${NEW_COLOUR}`, function(){
            snake.colour = NEW_COLOUR;
            expect(snake._body[0].colour).toBe(NEW_COLOUR);
        });

        it("Should be able to get the snake's x co-ordinate", function () {
            expect(snake.x).toBe(SNAKE_X);
        });

        it(`Should be able to set the snake's x co-ordinate to ${NEW_X}`, function () {
            snake.x = NEW_X;
            expect(snake.x).toBe(NEW_X);
        });

        it("Should be able to get the snake's y co-ordinate", function () {
            expect(snake.y).toBe(SNAKE_Y);
        });

        it(`Should be able to set the snake's y co-ordinate to ${NEW_Y}`, function () {
            snake.y = NEW_Y;
            expect(snake.y).toBe(NEW_Y);
        });

        it("Should be able to get the snake's context object", function () {
            expect(snake.context).not.toEqual(null);
        });

        it("Should be able to get the snake's colour", function () {
            expect(snake.colour).toBe(COLOUR);
        });

        it(`Should be able to set the snake's colour to ${NEW_COLOUR}`, function () {
            snake.colour = NEW_COLOUR;
            expect(snake.colour).toBe(NEW_COLOUR);
        });

        it("Should be able to get a snake part's size", function () {
            expect(snake._body[0].size).toBe(10);
        });

        it(`Should be able to set a snake part's size to 20`, function () {
            snake._body[0].size = 20;
            expect(snake._body[0].size).toBe(20);
        });
    });

    describe("Move function", function () {

        beforeEach(function(){
            snake.x = SNAKE_X;
            snake.y = SNAKE_Y;
            snake.direction = "UP";
        });

        it("Should be able to move RIGHT", function () {
            snake.move("RIGHT");
            expect(snake.x).toBeGreaterThan(SNAKE_X);
        });

        it("Should be able to move UP", function () {
            snake.move("UP");
            expect(snake.y).toBeLessThan(SNAKE_Y);
        });

        it("Should be able to move DOWN", function () {
            snake.move("LEFT");
            snake.move("DOWN");
            expect(snake.y).toBeGreaterThan(SNAKE_Y);
        });

        it("Should be able to move LEFT", function () {
            snake.move("LEFT");
            expect(snake.x).toBeLessThan(SNAKE_X);

        });

        it("If moving LEFT should not be able to move immediately RIGHT", function () {
            snake.move("LEFT");
            snake.move("RIGHT");
            expect(snake.direction).toBe("LEFT");
        });

        it("If moving RIGHT should not be able to move immediately RIGHT", function(){
            snake.move("RIGHT");
            snake.move("LEFT");
            expect(snake.direction).toBe("RIGHT");
        });

        it("If moving UP should not be able to move immediately DOWN", function(){
            snake.move("UP");
            snake.move("DOWN");
            expect(snake.direction).toBe("UP");
        });

        it("If moving DOWN should not be able to move immediately UP", function(){
            /*
             * Snake moves up by default, so to be able to test moving down we need move
             * to be moving in a direction other than up.
             */
            snake.move("LEFT"); 
            snake.move("DOWN");
            snake.move("UP");
            expect(snake.direction).toBe("DOWN");
        });
    })
});

// --------------------------------------- Food Tests
describe("food", function(){
    const INITIAL_WIDTH = 300, INITIAL_HEIGHT = 300;
    const game = new GameStage(INITIAL_WIDTH, INITIAL_HEIGHT);
    const food = new Food(INITIAL_WIDTH,INITIAL_HEIGHT,game.context);
    const SNAKE_X = 50, SNAKE_Y = 50;
    const snake = new Snake(SNAKE_X, SNAKE_Y, game.context);


    it("Should generate a new position when \"newPosition()\" is called",function(){
        const oldY = food.y;
        const oldX = food.x;
        food.newPosition();
        expect([oldY, oldX]).not.toBe([food.y, food.x]);
    });
});

