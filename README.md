# Lesson 03 - Animation
The source files of this branch shows the completed version of what will be built. To follow along in your own environment, you will need to download the images folder. To use the images in a code playground,  you will need to use the full path to the images I have hosted on my Azure account (example of URL `https://pamtaro.blob.core.windows.net/images/[filename]`).

**List of code playground image URLs for this Lesson**
* https://pamtaro.blob.core.windows.net/images/koala_idle.png
* https://pamtaro.blob.core.windows.net/images/pastry_cookie01.png

## Start and Cleanup
If you are continuing from the previous lesson, remove the JavaScript code for the shapes and text, so that we just have the boilerplate and image related code. Your game JavaScript file should now look like this:
```
(function () {
    var gameCanvas = document.getElementById("gameCanvas");
    var stage = new createjs.Stage(gameCanvas);
    
    // images
    var manifest = [
        {id:"koala", src: "images/koala_idle.png"},
        {id:"cookie", src: "images/pastry_cookie01.png"}
    ];
    var loader = new createjs.LoadQueue();
    loader.loadManifest(manifest, true);
    
    loader.on("complete", handleComplete, this);
    function handleComplete(e) {
        var koala = new createjs.Bitmap(loader.getResult("koala"));
        koala.x = 300;
        var cookie = new createjs.Bitmap(loader.getResult("cookie"));
        cookie.x = 350;
        stage.addChild(koala, cookie);
        stage.update();
    }
})();
```
Before we continue, lets update the position of our koala to be at the bottom left corner and set its registration point to its center:
``` 
koala.regX = koala.image.width / 2;
koala.regY = koala.image.height / 2;
koala.x = koala.image.width / 2;
koala.y = stage.canvas.height - (koala.image.height/2);
```
Also, let's place the cookie in the top-center of the stage and set the cookie's registration point to its center.
```
cookie.regX = cookie.image.width / 2;
cookie.regY = cookie.image.height / 2;
cookie.x = stage.canvas.width / 2;
cookie.y = 0;
```
We should also move the declaration of our koala and cookie to the top of the file (but inside the anonymous function) so we can control them outside of the `handleComplete` function.

## The Ticker
CreateJS's Ticker is the central object to handle updating the stage. The default tick is called 20 times per second (20fps). Let's add the handler for the tick after adding the Bitmaps to the stage and move the stage `update` method in there:
```
    stage.addChild(koala, cookie);
    createjs.Ticker.on("tick", tick);
}
function tick(event){
    stage.update(event);
}
```
Not much to see yet since we're not changing any objects in the tick...

### Moving the koala
To move the koala 10px with each tick, simply add the following code to reassign the X-coordinate of the koala:
```
koala.x = koala.x + 10;
```
The koala can now go left-to-right, but it just went off the screen! So to make the koala move back when it hits the edge of the stage, change the "10" to a variable `koalaMoveX` which predefine in the beginning to "10". Then add the following before the `koala.x` assignment:
```
if (koala.x >= stage.canvas.width) {
    koalaMoveX = -10;
} else if (koala.x <= 0) {
    koalaMoveX = 10;
}
```
_Did you notice how similar those statements are?_ Let's refactor this logic into one `if` statement:
```
if (koala.x >= stage.canvas.width || koala.x <= 0) {
    koalaMoveX = koalaMoveX * -1;
}
```

### Spinning the cookie
Our cookie would be more intersting if it could spin and move too. Let's make it do that:
```
cookie.rotation = cookie.rotation + 45;
cookie.y = cookie.y + 10;
```
Now instead of having the cookie move back up when it reaches the bottom, lets just have it start from the top again, but in a different position!
```
if (cookie.y >= stage.canvas.height) {
    cookie.y = 0;
    cookie.x = Math.ceil(Math.random() * stage.canvas.width);
}

```
_This is starting to look like a game now right?..._

## Credits
Art from GameArtGuppy.com
