import loaded, { GameStage } from "../scripts/game/classes.js";

describe("GameStage class", function () {
    const INITIAL_WIDTH = 300, INITIAL_HEIGHT = 300;
    const game = new GameStage(300, 300);
    it("Should have created a canvas with id of gameCanvas", function () {

        expect(document.getElementById("gameCanvas")).not.toEqual(null);
    });

    describe("Getters", function () {
        it("Should get the width of the canvas", function () {
            expect(game.width).toBe(INITIAL_WIDTH);
        });

        it("Should get the height of the canvas", function(){
            expect(game.height).toBe(INITIAL_HEIGHT);
        });  

        it("Should get CanvasRenderingContext2D from the canvas", function(){
            expect(game.context).not.toEqual(null);
        });
    });

});