import loaded, { GameStage, Snake } from "../scripts/game/classes.js";


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

    const OVR_COLOUR = "blue", OVR_HEIGHT = 20, OVR_WIDTH = 20;
    const blue_snake = new Snake(SNAKE_X, SNAKE_Y, game.context, OVR_COLOUR, OVR_HEIGHT, OVR_WIDTH);

    describe("Constructor defaults", function () {
        it("Should have a default colour of red", function () {
            expect(snake.colour).toBe("red");
        });

        it(`Should have a provided colour of ${OVR_COLOUR} (override default)`, function () {
            expect(blue_snake.colour).toBe(OVR_COLOUR);
        });

        it("Should have a context object", function () {
            expect(snake._context).not.toEqual(null);
        });

        it("Should have default height of 10", function () {
            expect(snake.height).toBe(10);
        });

        it(`Should have provided height of ${OVR_HEIGHT} (override default)`, function () {
            expect(blue_snake.height).toBe(OVR_HEIGHT);
        });

        it(`Should have provided width of ${OVR_WIDTH} (override default)`, function () {
            expect(blue_snake.height).toBe(OVR_WIDTH);
        });

        it("Should have default width of 10", function () {
            expect(snake.width).toBe(10);
        });

    });

    describe("Getters and Setters", function () {

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
});