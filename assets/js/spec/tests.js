import classes_loaded, { GameStage, SnakePart, SnakeBody, SnakeHead } from "../scripts/game/classes.js";
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

// --------------------------------------- SnakePart Tests
describe("SnakePart class", function () {
    /*
  * Define values needed for tests to avoid the use of
  * magic numbers. Also allows for more flexible use of 
  * test decriptions via template literals
  */
    const INITIAL_WIDTH = 300, INITIAL_HEIGHT = 300;
    const game = new GameStage(INITIAL_WIDTH, INITIAL_HEIGHT);

    const SNAKE_X = 50, SNAKE_Y = 50, NEW_X = 33, NEW_Y = 33, COLOUR = "Red", NEW_COLOUR = "Blue",
        WIDTH = 10, NEW_WIDTH = 20, HEIGHT = 10, NEW_HEIGHT = 20;
    const snakePart = new SnakePart(SNAKE_X, SNAKE_Y, game.context, COLOUR, HEIGHT, WIDTH);

    beforeEach(function () {
        snakePart.x = SNAKE_X;
        snakePart.y = SNAKE_Y;
        snakePart.width = WIDTH;
        snakePart.height = HEIGHT;
        snakePart.colour = COLOUR;
    });

    it("Should be able to get the snake's x co-ordinate", function () {
        expect(snakePart.x).toBe(SNAKE_X);
    });

    it(`Should be able to set the snake's x co-ordinate to ${NEW_X}`, function () {
        snakePart.x = NEW_X;
        expect(snakePart.x).toBe(NEW_X);
    });

    it("Should be able to get the snake's y co-ordinate", function () {
        expect(snakePart.y).toBe(SNAKE_Y);
    });

    it(`Should be able to set the snake's y co-ordinate to ${NEW_Y}`, function () {
        snakePart.y = NEW_Y;
        expect(snakePart.y).toBe(NEW_Y);
    });

    it("Should be able to get the snake's context object", function () {
        expect(snakePart.context).not.toEqual(null);
    });

    it("Should be able to get the snake's colour", function () {
        expect(snakePart.colour).toBe(COLOUR);
    });

    it(`Should be able to set the snake's colour to ${NEW_COLOUR}`, function () {
        snakePart.colour = NEW_COLOUR;
        expect(snakePart.colour).toBe(NEW_COLOUR);
    });

    it("Should be able to get the snake's height", function () {
        expect(snakePart.height).toBe(HEIGHT);
    });

    it(`Should be able to set the snake's height to ${NEW_HEIGHT}`, function () {
        snakePart.height = NEW_HEIGHT;
        expect(snakePart.height).toBe(NEW_HEIGHT);
    });

    it("Should be able to get the snake's width", function () {
        expect(snakePart.width).toBe(WIDTH);
    });

    it(`Should be able to set the snake's width to ${NEW_WIDTH}`, function () {
        snakePart.width = NEW_WIDTH;
        expect(snakePart.width).toBe(NEW_WIDTH);
    });
});

// --------------------------------------- SnakeBody Tests
describe("SnakeBody class", function () {
    /*
     * Define values needed for tests to avoid the use of
     * magic numbers. Also allows for more flexible use of 
     * test decriptions via template literals
     */
    const INITIAL_WIDTH = 300, INITIAL_HEIGHT = 300;
    const game = new GameStage(INITIAL_WIDTH, INITIAL_HEIGHT);

    const SNAKE_X = 50, SNAKE_Y = 50, NEW_X = 33, NEW_Y = 33;
    const snakeBody = new SnakeBody(SNAKE_X, SNAKE_Y, game.context);

    describe("Getters and Setters", function () {

        beforeEach(function () {
            snakeBody.x = SNAKE_X;
            snakeBody.y = SNAKE_Y;
        });

        it("Should be able to get the previous snake's x co-ordinate", function () {
            snakeBody.x = NEW_X;
            expect(snakeBody.prevX).toBe(SNAKE_X);
        });

        it("Should be able to get the previous snake's y co-ordinate", function () {
            snakeBody.y = NEW_Y;
            expect(snakeBody.prevY).toBe(SNAKE_Y);
        });
    });
});

// --------------------------------------- SnakeHead Tests
describe("SnakeHead class", function () {
    /*
     * Define values needed for tests to avoid the use of
     * magic numbers. Also allows for more flexible use of 
     * test decriptions via template literals
     */
    const INITIAL_WIDTH = 300, INITIAL_HEIGHT = 300;
    const game = new GameStage(INITIAL_WIDTH, INITIAL_HEIGHT);
    let delta = Math.random();
    const SNAKE_X = 50, SNAKE_Y = 50, NEW_X = 33, NEW_Y = 33;
    const snakeHead = new SnakeHead(SNAKE_X, SNAKE_Y, game.context)
    describe("Movement control", function () {
        const INCORRECT_DIRECTION = "wrong";

        beforeEach(function () {
            snakeHead.x = SNAKE_X;
            snakeHead.y = SNAKE_Y;
        });

        //If y is less than starting y snake will have moved up
        it("Should be able to move up", function () {
            snakeHead.direction = "UP";
            snakeHead.move(delta);
            expect(snakeHead.y).toBeLessThan(SNAKE_Y);
        });

        //If y is greater than starting y snake will have moved down
        it("Should be able to move down", function () {
            snakeHead.direction = "DOWN";
            snakeHead.move(delta);
            expect(snakeHead.y).toBeGreaterThan(SNAKE_Y);
        });

        //If x is less than starting x snake will have moved left
        it("Should be able to move left", function () {
            snakeHead.direction = "LEFT";
            snakeHead.move(delta);
            expect(snakeHead.x).toBeLessThan(SNAKE_X);
        });

        //If x is greater than starting x snake will have moved left
        it("Should be able to move right", function () {
            snakeHead.direction = "RIGHT";
            snakeHead.move(delta);
            expect(snakeHead.x).toBeGreaterThan(SNAKE_X);
        });

        it(`Should return false if given incorrect parameter ${INCORRECT_DIRECTION}`, function () {
            snakeHead.direction = INCORRECT_DIRECTION;
            expect(snakeHead.move(delta)).toBe(false);
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
            expect(defaultKeys.getDirection(38)).toBe("UP");
        });

        it("Should return \"DOWN\" when passed keycode mapped to \"down\" property", function () {
            expect(defaultKeys.getDirection(40)).toBe("DOWN");
        });

        it("Should return \"LEFT\" when passed keycode mapped to \"left\" property", function () {
            expect(defaultKeys.getDirection(37)).toBe("LEFT");
        });

        it("Should return \"RIGHT\" when passed keycode mapped to \"right\" property", function () {
            expect(defaultKeys.getDirection(39)).toBe("RIGHT");
        });
    });
});