# Lesson 04 - Sprites and Spritesheets
The source files of this branch shows the completed version of what will be built. To follow along in your own environment, you will need to download the images folder. To use the images in a code playground, be sure to use its full raw path, i.e. `https://raw.githubusercontent.com/pamtaro/IntroToHTML5Games/Lesson-01/images/[filename]`.

## Sprites? Spritesheets?
Sprites are like Bitmap images, except they are animatable. The koala Bitmap before was moving along the X-axis of the canvas, but the koala image itself was not changing. A Sprite may be changed independently from the rest of the elements on the stage.

A Spritesheet is used to determine what a Sprite displays. In CreateJS, a Spritesheet is used to create a new Sprite. It may contain several graphics in one image file that gets split up into frames by defining a width and height. (see new `images/koala_spritesheet.png` file)

## Creating a Spritesheet
Starting with where we left off in Lesson 03, change the manifest for "koala" to point to `images/koala_spritsheet.png`

In the `handleComplete` function, remove the existing code for "koala" then add the following to create the spritesheet that loads the image:
```
var spriteSheet = new createjs.SpriteSheet({
    framerate: 30,
    "images": [loader.getResult("koala")],
    "frames": {"regX": 36, "regY": 51, "width": 72, "height": 102},
    "animations": {
        "run": [0, 1, "run"],
        "jump": [2, 2, "run", 0.1]
    }
});    
```

## Creating the Sprite
Once the spritesheet is defined, we can use it in a new "koala" variable which is now a Sprite:
```
koala = new createjs.Sprite(spriteSheet);
koala.x = koala.getBounds().width / 2;
koala.y = stage.canvas.height - (koala.getBounds().height/2);
```
The optional second parameter in the Sprite constructor can be the frame number or name of the animation to play initially when the sprite is drawn. Try changing it between "run" and "jump" here to see the difference, then leave it set to "run".

### Flip the Sprite when it reaches the ends
Instead of walking backwards, lets flip the koala around whenever it reaches the ends of the stage. Add this to the conditions which check for the koala's X-Position:
```
koala.scaleX = koala.scaleX * -1;
```


## Credits
Art from GameArtGuppy.com
