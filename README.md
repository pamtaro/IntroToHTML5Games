# Lesson 01 - HTML5 Canvas Basics
The source files of this branch shows the completed version of what will be built. To follow along in your own environment, you will need to download the images folder. To use the images in a code playground, you will need to use the full path to the images I have hosted on my Azure account (example of URL `https://pamtaro.blob.core.windows.net/images/[filename]`).

**List of code playground image URLs for this Lesson**
* https://pamtaro.blob.core.windows.net/images/koala_idle.png
* https://pamtaro.blob.core.windows.net/images/koala_walk01.png
* https://pamtaro.blob.core.windows.net/images/koala_walk02.png

## Start with the HTML
Create your HTML file and add the boilerplate stuff:
```
<html>
    <head></head>
    <body></body>
</html>
```

The only HTML we really need to build an HTML5 game is the `<canvas>` element. Add that inside the `<body>` tags:
```
<canvas id="gameCanvas" width="800" height="600"></canvas>
```

Since we can't really see the canvas, add some CSS in the `<head>` tags to give the canvas a border:
```
<style>
    #gameCanvas { border: 1px solid black; }
</style>
```

Create a separate JavaScript file and add the `<script>` reference for it after the `<canvas>` tags, but before the closing `<body>` tag.
```
<script src="game.js"></script>
</body>
```

That's it for HTML!

## JavaScript does the rest!
Open/Navigate to your game's JavaScript file and add the boilerplate for a self-executing anonymous function (because it's good practice):
```
(function(){
    // rest of code goes here
})();
```

### The Canvas and its Context
To start working with the canvas, add the following code to get a reference to the canvas and its 2d context:
```
var gameCanvas = document.getElementById("gameCanvas");
var ctx = gameCanvas.getContext("2d");
```

### Drawing Shapes
To draw a red rectangle and black circle, add the following code where we left off:
```
// red rectangle
ctx.fillStyle = "rgb(255,0,0)";
ctx.fillRect(0, 0, 100, 200);

// black circle
ctx.arc(200, 100, 100, 0, Math.PI * 2, false);
ctx.fillStyle = "blue";
ctx.fill();
```
**Note:** the X and Y coordinates start in the top-left corner of the canvas.

### Draw Text
Now add the following code to 'draw' text into the canvas:
```
// text
ctx.font = "30px Tahoma";
ctx.fillText("Hello world", 10, 250);
```

**Note:** This is different than adding text in HTML - 'drawing' text makes in non-selectable and saving a canvas makes it part of the image.

### Draw an Image
Create a new Image element (remember to use the full path if you are using a code playground):
```
// image
var img = new Image();
img.src = "images/koala_idle.png";
```
To have the image drawn on the canvas, add the following:
```
ctx.drawImage(img, 300, 0);
```

_Did it not work?_ That's because the canvas is trying to draw the image befor the image has finished loading. To wait for the image to load, it needs to handle the `onload` event:
 ```
img.onload = function() {
    ctx.drawImage(img, 300, 0);
};
```

### Bonus
Add the following code along to play an animation of the koala walking:
```
// animate images
var img1 = new Image();
img1.src = "koala_walk01.png";
var img2 = new Image();
img2.src = "images/koala_walk02.png";

var play1 = true;
img1.onload = function() {
    window.setInterval(drawWalk, 100);
};

function drawWalk() {
    // clear all
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    if (play1 === true) {
        ctx.drawImage(img1, 400, 0);
    } else {
        ctx.drawImage(img2, 400, 0);
    }
    play1 = !play1;
}
```
The canvas has to redraw the whole context in order to display the next image without the previous one interfering. To "erase" just the part of the canvas that contains the image, change the `clearRect` code to the following:
```
// clear specific area
ctx.clearRect(400,0,200,200);
```

## Credits
Art from GameArtGuppy.com
