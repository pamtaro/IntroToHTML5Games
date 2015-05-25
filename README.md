# Lesson 05 - Controls – Keyboard, Mouse, Touch
The source files of this branch shows the completed version of what will be built. To follow along in your own environment, you will need to download the images folder. To use the images in a code playground, be sure to use its full raw path, i.e. `https://raw.githubusercontent.com/pamtaro/IntroToHTML5Games/Lesson-01/images/[filename]`.

## Changing Directions 
Let's make our koala can change directions on command whenever the user hits the spacebar or clicks on the koala (works with mouse or touchscreen tap).
Create the function to change the koala's direction:
```
function changeDirections(){
    koalaMoveX = koalaMoveX * -1;
}
```

Now add the event listener for click/touch on the stage. Place it inside the `handleComplete` function before the stage binds to the tick event:
```
stage.on("stagemousedown", changeDirections);
```

To handle keyboard events, we need to place the event listener on the page's `window` object:
```
window.addEventListener("keydown", handleKeyDown);
```
The `handleKeyDown` event handler code is as follows:
```
function handleKeyDown(event){
    if (event.keyCode == 32) { 
        // spacebar is pressed
        changeDirections();
    }
}
```

**Note:** We can also refactor our code in the tick function to use this `changeDirections` function.

### Flip the Sprite when it reaches the ends
Instead of walking backwards, lets flip the koala around when the `changeDirections` function is called:
```
koala.scaleX = koala.scaleX * -1;
```

## Credits
Art from GameArtGuppy.com
