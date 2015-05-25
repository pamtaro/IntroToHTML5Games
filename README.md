# Lesson 08 - Backgrounds
The source files of this branch shows the completed version of what will be built. To follow along in your own environment, you will need to download the images folder. To use the images in a code playground, be sure to use its full raw path, i.e. `https://raw.githubusercontent.com/pamtaro/IntroToHTML5Games/Lesson-01/images/[filename]`.

## Parallax Backgrounds
To get the effect of parallax movement, we are going to use 2 background images that are wider than the pixels of the stage and move them at different rates as the koala moves.

## Offset when loading
Add the declarations for the `ground` and `background` variables at the top with the other game objects. Then add this to the manifest to load their images:
```
{
    id: "ground",
    src: "images/foreground.png"
},
{
    id: "background",
    src: "images/background.png"
}
```
Place the following in the `handleComplete` function to create the 2 backgrounds, then add them to the beginning of the `stage`:
```
ground = new createjs.Bitmap(loader.getResult("ground"));  
ground.x = -30;
background = new createjs.Bitmap(loader.getResult("background"));  
background.x = -20;
```
_Optional:_ move the koala up 50px.

## Movements
We already have the `koalaMoveX` variable which tells us the speed and direction to move the koala, so we can reuse this variable on the Backgrounds move logic. When the koala moves in the positive direction, we actually want the all Backgrounds to move in the opposite X direction. We also don't want the same speed as the koala since the backgrounds will go offscreen at that rate. Let's create 2 variables at the top to represent the Background's speeds:
```
var foregroundSpeed = -0.7;
var backgroundSpeed = -0.1;
```
Then add the following to the `tick` handler to update Backgrounds:
```
ground.x = ground.x + (koalaMoveX*foregroundSpeed);
background.x = background.x + (koalaMoveX*backgroundSpeed);
```
### Bonus
To make the movements more noticeable, let's also add a couple objects to the foreground. Declare the `flower` and `tree` variables in the beginning, then add them to the manifest:
```
{
    id: "flower",
    src: "images/flowers.png"
},
{
    id: "tree",
    src: "images/tree.png"
}
```
Then add create their bitmap objects and set their positions:
```
flower = new createjs.Bitmap(loader.getResult("flower"));
flower.y = stage.canvas.height - flower.image.height - 70;
flower.x = 100;
tree = new createjs.Bitmap(loader.getResult("tree"));
tree.y = stage.canvas.height - tree.image.height - 100;
tree.x = 800;
```
Add these objects to the stage, after the ground, but before the koala.
We can then copy the same movement logic for the ground and reuse it for the `flower` and `tree`:
```
flower.x = flower.x + (koalaMoveX*foregroundSpeed);
tree.x = tree.x + (koalaMoveX*foregroundSpeed);
```
_**Congratulations!**_ You're game looks great!
## Credits
Art from GameArtGuppy.com
