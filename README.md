# Milestone Project 2 
## Snake

Inspired by the project suggestion of creating a memory game with sounds, I wanted to try and make a game using the Javascript I had recently learnt. 

After conversing with my mentor I had two viable options, pong or snake. I chose snake (simply because I find it more fun to play).

## UX
### User stories

1. As a site user, I should be able to play the game on my computer and touch screen devices.
2. As a site user, I should be able to decide if the snake can wrap around the stage or not.
3. As a site user, I should be able to see how my score compares to previous games.
4. As a site user, I should be able to turn sounds off and on.
5. As a site user, I should be able to find out how to play the game.
6. As a site user, I should be able to change the colour of the snake.

### TODO: Wireframes(?)

## Features:

* Keyboard and touch event listeners - Allows input via keyboard and touchscreens. Achieves user story 1.

* Toggle settings - allow users to toggle sounds and walls on or off. Achieves user stories 2 and 4.

* Highscores table - allows users to see their top 5 (ordered) scores of playing in one session. Achieves user story 3.

* Instructions page - explains how to play the game and what the aims of the game are. Achieves user story 5.

* Colour selection buttons - allows user to change their snake colour to one of 5 preset colours. Achieves user story 6.

## Features left to implement:

* Allow the user to map custom keys to directions (for example W: up, S: down, A:left, D:right)
* Allow the user the select different size canvas (Small, Medium or Large).
* Implement more advanced swipe detection that allows the user to "drag" the snake around the canvas. At the moment the user must use a series of broken swipes.


## How the code works

### Class Diagram
To show the overall structure of, and relationships between, classes used in this program I have created the following class diagram.

[Click here to see Class Diagram](./assets/images/classesJS.png)

### Functionality in each file
**gamestage.js** Creates the canvas element and keeps track of the score.

**gameobject.js** Base class for the Snake and food. A class that has the basic functionality needed to positon something and draw it to the canvas.

**snake.js**  Contains the three classes that build up the functionality to create, update and move the snake.

**food.js** Creates a food object, provides functionality to position it randomly within the boundaries of the canvas.

**highscore.js** Manages highscores. When scores are added to it they are automatically ordered (highest to lowest). Only keeps track of a certain number of highscores, this can be defined via the constructor. 

**sound.js** A wrapper class that creates invisible audio elements and provides methods to play and stop them.

**main.js** Brings together all of the previous classes. Handles events (key presses and touch events), and reads users settings options (choosing snake colour, toggling walls and toggling sounds).

**Program Flow**

1. Create GameStage class.
	* GameStage creates a HTML 5 canvas.
2. Create KeyMappings class used to translate keycodes to directions (UP, DOWN, LEFT, RIGHT).
3. Check if audio is supported by the browser.
	* If yes, create a Sound object for game start, game end, game pause and when the snake eats.
4. Create Snake object.
	* Snake object creates a SnakeHead object and a number of SnakeBody objects.
5. Create a food object.
	* Give the food object a random position on the canvas.
6. Create HighscoreTable to keep track of users scores.
7. Register event listeners to handle user input (keydown and touch events).
8. Wait for user to click new game or start game.
	* Enter game loop:
		* Check if the snake has eaten food
			* If yes and we can play audio, play audio. Increase Score. Increase snake length.
		* Move the snake
			* When snake moves it checks to see if the head collides with another body part. If it does end the game (see below).
			* If the snake is out of bounds check if the user has enabled walls. 
				* If they have: END GAME, add score to highscores, if we can play sounds play endgame sound. 
				* If they haven't move the Snake to the otherside of the canvas.
		* Draw gameobjects to the canvas.

## Technologies used

- HTML 5 
Used to provide structure to each page of the site.

- CSS
Used to format the HTML of each page. Make each page look visually appealing. 

- Javascript (ES6)
Used to make the game logic and interactivity of the site.

- [chrome-devtools](https://developers.google.com/web/tools/chrome-devtools/)
Used this to test how the site looked and debug the javascript via the console.

- [VSCode](https://code.visualstudio.com/)
Visual Studio Code (VSCode) was the IDE used to develop this site.

- [LiveServer](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) 
Addon for VSCode that launches a local server to serve my html pages.

- [Git](https://git-scm.com/)
Git was used to provide a local version control system. 

- [Github](https://github.com/)
Used to host and deploy the final version of the site, as well as provide an online repository for the project.

- [Bootstrap](https://getbootstrap.com/)
Used as the foundation of each page. Bootstrap allowed me to quickly provide a mobile first, responsive structure to the website.

-[stackoverflow](https://www.stackoverflow.com) Helped me troubleshoot many issues during development. Also provided code snippets used in the project (credited in code and below).

- [freecodecamp](https://www.freecodecamp.org/learn/)
 Tutorials on Javascript, specifically ES6.
 
-  [Developer web api](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent) Helped me discover features of Javascript and how to use them.

- [w3schools](https://www.w3schools.com/) 
 Helped me discover features of Javascript and how to use them. 
 
 - [visual-paradigm](https://diagrams.visual-paradigm.com/)Used to create the UML Class Diagram.
 
 - [Jasmine](http://jasmine.github.io/) 
Creating and running automated tests for Javascript.

- [Main loop.js]([https://github.com/IceCreamYou/MainLoop.js](https://github.com/IceCreamYou/MainLoop.js))
Library used for the game loop, this allowed me to develop the game logic without worrying about the ins and outs of a suitable game loop.

- [Modernizr]([https://modernizr.com](https://modernizr.com/)) 
Tests the user's browser for native support of the HTML 5 Canvas and input:color. If no support is found, it loads in a polyfill to provide that functionality. 

- [ExplorerCanvas](https://github.com/arv/ExplorerCanvas)
Canvas polyfill for if the users browser doesn't support the HTML 5 canvas.

- [zapsplat](https://www.zapsplat.com/) Provided of all sounds used in the game.

- [color.review/](https://color.review/) Used to choose the colours of the website.

- [fontawesome](https://www.fontawesome.com) Provided the icons used on the site.

- [rem-calculator/](https://offroadcode.com/rem-calculator/) Used to turn pixel measurements into rem measurements.

- [https://jigsaw.w3.org/css-validator/](https://jigsaw.w3.org/css-validator/) Used to validate my css.

- [https://autoprefixer.github.io/](https://autoprefixer.github.io/) Used to add browser specific prefixes to my css.

-[https://validator.w3.org/](https://validator.w3.org/) Used to validate the HTML of the site.

## Testing



## Deployment



## Credits

I would like to thank my mentor [Reuben ferrante](https://github.com/arex18) for help with making the site better and overcoming problems encountered during development.

**Code credits**
The code used in the sound class was predominately taken from this w3schools page:
 [https://www.w3schools.com/graphics/game_sound.asp](https://www.w3schools.com/graphics/game_sound.asp)

 The code to load a .js file from javascript (used in index.html) was taken from:
 [https://stackoverflow.com/questions/14521108/dynamically-load-js-inside-js](https://stackoverflow.com/questions/14521108/dynamically-load-js-inside-js)

 Help with the maths used in the Food classes getRandomPosition method was taken from:
 [https://stackoverflow.com/questions/11022488/javascript-using-round-to-the-nearest-10/11022517](https://stackoverflow.com/questions/11022488/javascript-using-round-to-the-nearest-10/11022517)

### Media 
Sounds from zapsplat

### Acknowledgements 

 [The w3schools html5 game tutorial](https://www.w3schools.com/graphics/game_intro.asp) provided a very valuable first step in developing this as it show cased the basics of interacting with the canvas via javascript.
---




Problems: 

EventListeners - Dev tools console complained about having active listeners. After reading up on it, they recommended using passive event listeners for certain "scrolling" events. As I was using touch events these were included. Setting it to passive made the warning in the console go away but when testing on my mobile if swiping down it would refresh the page. After some googling I came across the "preventDefault" method, but this could only be used on active listeners, which stops this default behaviour. I decided to check if the swipe was detected on the canvas and then preventing the default behaviour. This worked, but then chrome continued to complain about active listeners.

Using features of HTML 5 which may not be supported natively  by browsers. Led me to the discovery of "polyfills", ultimately pointing me towards Modernizr. 

Modernizr is a library that tests for browser support of certain HTML 5 / CSS 3 features.

It can then load in a polyfill if it detects that the browser doesn't natively support those features.

I was going to use the polyfill [http://jscolor.com/](http://jscolor.com/) for the input type color (as recommended by the w3s validator). However, due to the way chrome now handles  touch events (used by JSColor) it got to be too difficult for me to correct. Instead I have just presented the user with 5 preset colours they can choose from.

Modules made testing in jasmine difficult, have to expose things to the window object.

Didn't know how to test getting a context object from canvas rather than testing it isn't null

Didn't plan the classes properly before coding, so lots of change to classes during production.

One issue with the SnakeHead move function: I only updated the co-ordinate being changed y for up and down, x for left and right which meant that the other didn't update and so the snake's head moved differently to the body. Took me a frustratingly long time to work this out.

The hide button didn't work on first click. Solved by reading: [https://stackoverflow.com/questions/28100979/button-does-not-work-on-the-first-click](https://stackoverflow.com/questions/28100979/button-does-not-work-on-the-first-click)
