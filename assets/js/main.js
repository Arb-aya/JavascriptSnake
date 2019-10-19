let mainCanvas;
let height = 500, width = 500;

/*
 * When the DOM has been created and it is safe to interact
 * with, programatically create a canvas element and add it as 
 * a child of the div "gameStage"
 */
document.onreadystatechange = () => {
    if (document.readyState === "interactive") {
        mainCanvas = document.createElement("canvas");
        mainCanvas.height = height;
        mainCanvas.width = width;

        document.getElementById("gameStage").appendChild(mainCanvas);
    }
}