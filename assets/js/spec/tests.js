import loaded, { GameStage } from "../scripts/game/classes.js";

describe("GameStage class", function () {
    const INITIAL_WIDTH = 300, INITIAL_HEIGHT = 300;
    const game = new GameStage(300, 300);
    it("Should have created a canvas with id of gameCanvas", function () {

        expect(document.getElementById("gameCanvas")).not.toEqual(null);
    });

    describe("Getters and Setters", function () {
        it("Should return width", function () {
            expect(game.width).toBe(INITIAL_WIDTH);
        });

        it("Should set width", function(){
            let newWidth = 200;
            game.width = newWidth;
            expect(game.width).toBe(newWidth);
        });
    });

});