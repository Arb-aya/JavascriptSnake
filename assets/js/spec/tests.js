import classes_loaded, { GameStage, Snake } from "../scripts/game/classes.js";
import input_loaded, { KeyMappings } from "../scripts/controllers/input.js";


// --------------------------------------- GameStage Tests
describe("GameStage class", function () {
    const INITIAL_WIDTH = 300, INITIAL_HEIGHT = 300;
    const game = new GameStage(INITIAL_WIDTH, INITIAL_HEIGHT);

    it("Should have created a canvas with id of gameCanvas", function () {
        expect(document.getElementById("gameCanvas")).not.toEqual(null);
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

// --------------------------------------- Snake Tests

describe("Snake class", function () {
    /*
     * Define values needed for tests to avoid the use of
     * magic numbers. Also allows for more flexible use of 
     * test decriptions via template literals
     */
    const INITIAL_WIDTH = 300, INITIAL_HEIGHT = 300;
    const game = new GameStage(INITIAL_WIDTH, INITIAL_HEIGHT);

    const SNAKE_X = 50, SNAKE_Y = 50, NEW_X = 33, NEW_Y = 33;
    const snake = new Snake(SNAKE_X, SNAKE_Y, game.context);

    const OVR_COLOUR = "blue", OVR_HEIGHT = 20, OVR_WIDTH = 20, OVR_VELOCITY = 0.2, OVR_DIRECTION = "UP";
    let delta = Math.random();
    const blue_snake = new Snake(SNAKE_X, SNAKE_Y, game.context, OVR_COLOUR, OVR_DIRECTION, OVR_HEIGHT, OVR_WIDTH, OVR_VELOCITY);


    xdescribe("Constructor defaults", function () {
        it("Should have a default colour of red", function () {
            expect(snake.colour).toBe("red");
        });

        it("Should have a context object", function () {
            expect(snake._context).not.toEqual(null);
        });

        it("Should have default height of 10", function () {
            expect(snake.height).toBe(10);
        });

        it("Should have default width of 10", function () {
            expect(snake.width).toBe(10);
        });

        it("Should have default velocity of 0.1", function () {
            expect(snake.velocity).toBe(0.1);
        });

        it("Should have default direction of \"DOWN\"", function () {
            expect(snake.direction).toBe("DOWN");
        });

        xdescribe("Providing values in place of default values", function () {

            it(`Should have provided velocity of ${OVR_VELOCITY} (override default)`, function () {
                expect(blue_snake.velocity).toBe(OVR_VELOCITY);
            });

            it(`Should have provided width of ${OVR_WIDTH} (override default)`, function () {
                expect(blue_snake.height).toBe(OVR_WIDTH);
            });

            it(`Should have provided height of ${OVR_HEIGHT} (override default)`, function () {
                expect(blue_snake.height).toBe(OVR_HEIGHT);
            });

            it(`Should have a provided colour of ${OVR_COLOUR} (override default)`, function () {
                expect(blue_snake.colour).toBe(OVR_COLOUR);
            });

            it(`Should have a provided direction if ${OVR_DIRECTION} (override default)`, function () {
                expect(blue_snake.direction).toBe(OVR_DIRECTION);
            });


        });

    });

    xdescribe("Getters and Setters", function () {

        beforeEach(function () {
            snake.colour = "red";
            snake.x = SNAKE_X;
            snake.y = SNAKE_Y;
        });

        it("Should be able to get the snake's x co-ordinate", function () {
            expect(snake.x).toBe(SNAKE_X);
        });

        it("Should be able to get the snake's y co-ordinate", function () {
            expect(snake.y).toBe(SNAKE_Y);
        });

        it(`Should be able to set the snake's x co-ordinate to ${NEW_X}`, function () {
            snake.x = NEW_X;
            expect(snake.x).toBe(NEW_X);
        });

        it(`Should be able to set the snake's y co-ordinate to ${NEW_Y}`, function () {
            snake.y = NEW_Y;
            expect(snake.y).toBe(NEW_Y);
        });
    });

    xdescribe("Movement control", function () {
        const INCORRECT_DIRECTION = "wrong";

        beforeEach(function () {
            snake.x = SNAKE_X;
            snake.y = SNAKE_Y;
        });

        //If y is less than starting y snake will have moved up
        it("Should be able to move up", function () {
            snake.move("UP", delta);
            expect(snake.y).toBeLessThan(SNAKE_Y);
        });

        //If y is greater than starting y snake will have moved down
        it("Should be able to move down", function () {
            snake.move("DOWN", delta);
            expect(snake.y).toBeGreaterThan(SNAKE_Y);
        });

        //If x is less than starting x snake will have moved left
        it("Should be able to move left", function () {
            snake.move("LEFT", delta);
            expect(snake.x).toBeLessThan(SNAKE_X);
        });

        //If x is greater than starting x snake will have moved left
        it("Should be able to move right", function () {
            snake.move("RIGHT", delta);
            expect(snake.x).toBeGreaterThan(SNAKE_X);
        });

        it(`Should return false if given incorrect parameter ${INCORRECT_DIRECTION}`, function () {
            expect(snake.move(INCORRECT_DIRECTION, delta)).toBe(false);
        });
    });

});


// --------------------------------------- KeyMappings Tests
describe("KeyMappings class", function () {
    const defaultKeys = new KeyMappings();
    const OVR_UP = 87, OVR_DOWN= 65, OVR_LEFT = 13, OVR_RIGHT = 19;
    const ovrKeys = new KeyMappings(OVR_UP, OVR_DOWN, OVR_LEFT, OVR_RIGHT);


    describe("Constructor Defaults", function () {

        beforeEach(function(){
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

        describe("Providing values in place of default values", function(){
            it(`Should have provided Up key of ${OVR_UP}`,function(){
                expect(ovrKeys.up).toBe(OVR_UP);
            });

            it(`Should have provided Down key of ${OVR_DOWN}`,function(){
                expect(ovrKeys.down).toBe(OVR_DOWN);
            });

            it(`Should have provided Left key of ${OVR_LEFT}`,function(){
                expect(ovrKeys.left).toBe(OVR_LEFT);
            });

            it(`Should have provided Right key of ${OVR_RIGHT}`,function(){
                expect(ovrKeys.right).toBe(OVR_RIGHT);
            });
        });
    });

    describe("Getters and Setters", function(){

        beforeEach(function(){
            defaultKeys.up = 38;
            defaultKeys.down = 40;
            defaultKeys.left = 37;
            defaultKeys.right = 39;
        });

        it(`Should be able to set up key to ${OVR_UP}`,function(){
            defaultKeys.up = OVR_UP;
            expect(defaultKeys.up).toBe(OVR_UP);
        });

        it(`Should be able to set down key to ${OVR_DOWN}`,function(){
            defaultKeys.down = OVR_DOWN;
            expect(defaultKeys.down).toBe(OVR_DOWN);
        });

        it(`Should be able to set left key to ${OVR_LEFT}`,function(){
            defaultKeys.left = OVR_LEFT;
            expect(defaultKeys.left).toBe(OVR_LEFT);
        });

        it(`Should be able to set right key to ${OVR_RIGHT}`,function(){
            defaultKeys.right = OVR_RIGHT;
            expect(defaultKeys.right).toBe(OVR_RIGHT);
        });
    });

    describe("getDirection method", function(){
        it("Should return \"UP\" when passed keycode mapped to \"up\" property", function(){
            expect(defaultKeys.getDirection(38)).toBe("UP");
        });

        it("Should return \"DOWN\" when passed keycode mapped to \"down\" property", function(){
            expect(defaultKeys.getDirection(40)).toBe("DOWN");
        });

        it("Should return \"LEFT\" when passed keycode mapped to \"left\" property", function(){
            expect(defaultKeys.getDirection(37)).toBe("LEFT");
        });

        it("Should return \"RIGHT\" when passed keycode mapped to \"right\" property", function(){
            expect(defaultKeys.getDirection(39)).toBe("RIGHT");
        });
    });

});