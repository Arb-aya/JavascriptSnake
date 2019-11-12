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

### TODO: Wireframes(?)

## Features

The main bulk of code for this project falls in two files: classes.js and main.js. 

### Classes.js
[source](assets/js/game/classes.js)

The functionality for the game is contained in this file. Split over a number of classes, shown in this class diagram: [Classes.js Class Diagram](assets/images/classesJS.png);


-Features Left to Implement 
	- Mapping different keys to control the snake

-Technologies used:

-Testing section:
	-Tested each part of functionality I added in Javascript as and when I added it
	- Problems section here.

-Deployment 
 -Look at links from Reuben on how the site was deployed

Credits 
	-Mention code that was used. Check comments in code for which sections.

- Media 
-   Sounds from zapsplat
- Acknowledgements 
-  Inspiration from w3schools game tutorial
---

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
Addon for VSCode that launches a local server to serve my html pages

- [Git](https://git-scm.com/)
Git was used to provide a local version control system. 

- [Github](https://github.com/)
Used to host and deploy the final version of the site, as well as provide an online repository for the project.

- [Bootstrap](https://getbootstrap.com/)
Used as the foundation of each page. Bootstrap allowed me to quickly provide a mobile first, responsive structure to the website.

- [stack edit](stackedit.io) 
Writing the README.MD

- [freecodecamp](https://www.freecodecamp.org/learn/)
 Tutorials on Javascript, specifically ES6.
 
-  [https://developer.mozilla.org/en-US/docs/Web/API/](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent) Helped me discover features of Javascript and how to use them.

- [w3schools](https://www.w3schools.com/) 
 Helped me discover features of Javascript and how to use them. Particularly the [https://www.w3schools.com/graphics/game_intro.asp](https://www.w3schools.com/graphics/game_intro.asp) section.
 
 - [https://diagrams.visual-paradigm.com/](https://diagrams.visual-paradigm.com/)Used to create the UML Class Diagram
 
 - [http://jasmine.github.io/](http://jasmine.github.io/) 
Creating and running automated tests for Javascript.

- [Main loop.js]([https://github.com/IceCreamYou/MainLoop.js](https://github.com/IceCreamYou/MainLoop.js))
Library used for the game loop, this allowed me to develop the game logic without worrying about the ins and outs of a suitable game loop.

- [Modernizr]([https://modernizr.com](https://modernizr.com/)) 
Tests the user's browser for native support of the HTML 5 Canvas and input:color. If no support is found, it loads in a polyfill to provide that functionality. 

- [https://github.com/arv/ExplorerCanvas](https://github.com/arv/ExplorerCanvas)
Canvas polyfill for if the users browser doesn't support the HTML 5 canvas

- [https://www.zapsplat.com/](https://www.zapsplat.com/) Provided of all sounds used in the game.
- [https://color.review/](https://color.review/) Used to choose the colours of the website
- Font awesome - Icons 
- [https://offroadcode.com/rem-calculator/](https://offroadcode.com/rem-calculator/)
- 


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

---
> Written with [StackEdit](https://stackedit.io/).