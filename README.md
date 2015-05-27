# Lesson 02 - CreateJS Basics
The source files of this branch shows the completed version of what will be built. To follow along in your own environment, you will need to download the images folder. To use the images in a code playground, you will need to use the full path to the images I have hosted on my Azure account (example of URL `https://pamtaro.blob.core.windows.net/images/[filename]`).

**List of code playground image URLs for this Lesson**
* https://pamtaro.blob.core.windows.net/images/koala_idle.png
* https://pamtaro.blob.core.windows.net/images/pastry_cookie01.png

## CreateJS?
[CreateJS](http://createjs.com/) is one of many JavaScript libraries that makes building a game easier. CreateJS is useful for building many things, not just games. It is composed of 4 libraries that can be used together or individually: **EaselJS, TweenJS, SoundJS, and PreloadJS**.
**Documentation:** http://createjs.com/Docs

### Installing CreateJS
To start using CreateJS, add the following script tag before your own game script:
```
<script src="https://code.createjs.com/createjs-2014.12.12.min.js"></script>
```

## Shapes, Text, and Image the CreateJS way
Empty the previous version of the JavaScript file (if you've come from Lesson 01), so that you only have the boilerplate & a reference to the game Canvas:
```
(function () {
    var gameCanvas = document.getElementById("gameCanvas");	    
})();
```

### The Stage
CreateJS works with a "stage" object. Add it after the game canvas with the following:
```
var stage = new createjs.Stage(gameCanvas);
```

### Shapes
The Shape class allows you to instantiate shape graphics as objects and add them to the stage:
```    
// red rectangle    
var rectangle = new createjs.Shape();
rectangle.graphics.beginFill("red").drawRect(0, 0, 100, 200);

// blue circle
var circle = new createjs.Shape();
circle.graphics.beginFill("blue").drawCircle(200, 100, 100);
```
After creating the two shapes, you can add both of them at the same time with the `addChild` method and then `update` stage:
```
stage.addChild(rectangle, circle);
stage.update();
```
### Text
Again, text is its own class that you can instantiate and add to the stage:
```
// text
var text = new createjs.Text("Hello World!", "30px Tahoma");
text.x = 10;
text.y = 200;
```
_Don't forget_ to add the text object to the `addChild` method to have it drawn to the stage.

### Images
Bitmaps are the class to create images. We could just add the source in the constructor of the Bitmap like this:
```
// images
var koala = new createjs.Bitmap("images/koala_idle.png");
```
but again, this will not work if the image has not finished loading when it is added to the stage.

#### PreloadJS to the rescue!
Define ALL the assets you want to preload in a manifest JSON object (this can also be in a separate file):
```
var manifest = [
    {id:"koala", src: "images/koala_idle.png"},
    {id:"cookie", src: "images/pastry_cookie01.png"}
];

```
Then create a new instance of PreloadJS's LoadQueue to load the manifest:
```
var loader = new createjs.LoadQueue();
loader.loadManifest(manifest, true);
```
And add the event handler to handle the _complete_ event and move the `addChild` and `update` methods of the stage to the end of the event handler so it can draw everything at once:
```
loader.on("complete", handleComplete, this);
function handleComplete(e) {
    var koala = new createjs.Bitmap(loader.getResult("koala"));
    koala.x = 300;
    var cookie = new createjs.Bitmap(loader.getResult("cookie"));
    cookie.x = 350;
    stage.addChild(rectangle, circle, text, koala, cookie);
    stage.update();
}
```
_Did you notice_ the cookie is over the koala's face? Order matters!

## Credits
Art from GameArtGuppy.com
