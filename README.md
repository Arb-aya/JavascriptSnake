# Milestone Project 2 
## Snake

Inspired by the project suggestion of creating a memory game with sounds, I wanted to try and make a game using the Javascript I had recently learnt. 

After conversing with my mentor I had two viable options, pong or snake. I chose snake (simply because I find it more fun to play).

This site does not function on Internet Explorer as it uses ES6 features.

You can view the deployed site here: [https://github.com/CDHayden/JavascriptSnake](https://github.com/CDHayden/JavascriptSnake)

## UX
### User stories

1. As a site user, I should be able to play the game on my computer and touch screen devices.
2. As a site user, I should be able to decide if the snake can wrap around the stage or not.
3. As a site user, I should be able to see how my score compares to previous games.
4. As a site user, I should be able to turn sounds off and on.
5. As a site user, I should be able to find out how to play the game.
6. As a site user, I should be able to change the colour of the snake.

### Wireframes

[Click here to view Desktop Wireframe](./assets/images/desktop.png)
[Click here to view Tablet/mobile wireframe](./assets/images/other.png)

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
* Write the code using ES5 to provide support for Internet Explorer.


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

### Program Flow

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

- [stackoverflow](https://www.stackoverflow.com) Helped me troubleshoot many issues during development. Also provided code snippets used in the project (credited in code and below).

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

- [https://validator.w3.org/](https://validator.w3.org/) Used to validate the HTML of the site.

-[https://realfavicongenerator.net](https://realfavicongenerator.net) Used to generate fav icons and code to use them.

## Testing

Testing of the site was done manually and automatically throughout the development process. 

I have used Jasmine to develop automatic tests for the Javascript portion of the project. As a new feature was developed I wrote a test for it, so tests were developed incrementally with features. You can view the tests here:

[https://cdhayden.github.io/JavascriptSnake/tests.html](https://cdhayden.github.io/JavascriptSnake/tests.html)

I also manually tested the project by interacting with the site, and logging values to the console to test they were as I expected. 

Some functionality could only be tested manually, namely the use of "swipes" on touch screen devices to move the snake. To test this I have used my ipad, my android phone and have asked family and friends to play on their mobile devices. To the best of my knowledge it functions sufficiently.

I also tested the responsive layout of the site manually, via dev tools, to make sure it looked OK at each breakpoint.

I have also tested the site in a number of different browsers (microsoft edge, google chrome, firefox, opera and safari). By using [https://caniuse.com/](https://caniuse.com/) I estimate that I have around 80% - 85% user support.  I have tried to increase this where possible by using polyfills for canvas elements and preventing the use of audio elements if not supported.

### Bugs / Problems

* **Handling Touch Events** - Whilst implementing touch event handlers, the google chrome console warned against of "active listeners". After reading up on this it was recommended to use passive event listeners for touch events. Using passive event listeners made the warning dissappear, but it meant that swiping down on mobile phones (to move the snake down) made the page refresh. After googling the problem I found I had to use the "preventDefault" method via an active listener for touchevents to stop this.

* **ES6 Modules and testing Jasmine** - I found it difficult to test some elements of main.js. After reading up on the issue I found I had to explicilty expose functions and variables to the window object for Jasmine to be able to test them. 

* **Testing the getContext method in GameStage.js** - I currently test that the return value of the method isn't null. However, this doesn't explicitly test for a CanvasRendering2D but I am unsure of how to test for this.

* **Poor planning** - Poor planning of the code at the beginning meant the the code went through a number of drastic revisions (notable in the git history). I hope this is an important lesson in thinking about the code before jumping in head first.

* **Snake move() method** - For the longest time the snake head would move at an offset from the body of the snake. After painstakingly logging every function call and variable value and stepping through countless cycles, I noticed that one of the position co-ordinates was not being properly updated. Which led to the two lines of code in snake.js at 114 and 115:

` this.x = this.x;`
`this.y = this.y;`

Whilst these two lines of code seem stupid, they do fix this issue. I'm not so sure as to why, but I gave into frustration and just accepted the magic lines of code.

## Deployment

You can view the deployed site here: [https://github.com/CDHayden/JavascriptSnake](https://github.com/CDHayden/JavascriptSnake)

### How was the site deployed

To deploy thsi site my local git repository was pushed to a github repository and then hosted on github pages.

### To deploy this project locally:
Follow this link to the GitHub Repository: [https://github.com/CDHayden/JavascriptSnake](https://github.com/CDHayden/JavascriptSnake)
Click on the 'Clone or Download' button.
Copy the URL provided.
Open a bash terminal, move to your desired directory.
Type 'git clone' and paste in the URL.

## Credits

I would like to thank my mentor [Reuben ferrante](https://github.com/arex18) for help with making the site better and overcoming problems encountered during development.

**Code credits**
The code used in the sound class was predominately taken from this w3schools page:
 [https://www.w3schools.com/graphics/game_sound.asp](https://www.w3schools.com/graphics/game_sound.asp)

 The code to load a .js file from javascript (used in index.html) was taken from:
 [https://stackoverflow.com/questions/14521108/dynamically-load-js-inside-js](https://stackoverflow.com/questions/14521108/dynamically-load-js-inside-js)

 Help with the maths used in the Food classes getRandomPosition method was taken from:
 [https://stackoverflow.com/questions/11022488/javascript-using-round-to-the-nearest-10/11022517](https://stackoverflow.com/questions/11022488/javascript-using-round-to-the-nearest-10/11022517)

The hide settings button didn't work on the first click. This was solved by reading: [https://stackoverflow.com/questions/28100979/button-does-not-work-on-the-first-click](https://stackoverflow.com/questions/28100979/button-does-not-work-on-the-first-click)

### Media 
Sounds from [zapsplat](https://www.zapsplat.com/) 

### Acknowledgements 

 [The w3schools html5 game tutorial](https://www.w3schools.com/graphics/game_intro.asp) provided a very valuable first step in developing this as it show cased the basics of interacting with the canvas via javascript.

---




