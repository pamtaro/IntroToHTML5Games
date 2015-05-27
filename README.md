# Lesson 07 - Game Tracking
The source files of this branch shows the completed version of what will be built. To follow along in your own environment, you will need to download the images folder. To use the images in a code playground, you will need to use the full path to the images I have hosted on my Azure account (example of URL `https://pamtaro.blob.core.windows.net/images/[filename]`).

**List of code playground image URLs for this Lesson**
* https://pamtaro.blob.core.windows.net/images/koala_spritesheet.png
* https://pamtaro.blob.core.windows.net/images/pastry_cookie01.png

## End Game
To win the game, let's set the goal for the number of cookies to 5 and and limit the time to play at 20 seconds. First create these 3 variables at the top:
```
var cookiesGoal = 5;
var maxTime = 20;
var gameOver = false;
```
Next, we'll set up the countdown on the maxTime. It needs to be updated each second, but the `tick` handler updates the stage 20 times per second, so we'll use the built-in `setTimeout` handler in JavaScript to change the maxTime independently of the `tick`:
```
window.setTimeout(countdownTime, 1000);
```
Create the `countdownTime` function as follows:
```
function countdownTime(){
    maxTime = maxTime - 1;
    if (maxTime > 0){            
        window.setTimeout(countdownTime, 1000);
    }
}
```
To see the countdown, we'll need to create the Text to display it on the stage like we did in the previous lesson for the score. Create the `timeText` variable at the top to keep track of the object, then add this to the `handleComplete` function:
```
var timeBG = new createjs.Shape();
timeBG.graphics.beginFill("#bb0000").drawRect(50, 0, 50, 50);
timeText = new createjs.Text(maxTime, "38px Tahoma", "white");
timeText.x = 55;
```
Add these time objects to the `stage` and update the text for it in the `tick` handler:
```
timeText.text = maxTime;
```
## Game Over?
In the `tick` handler, we know that if the game is over, we don't need to move all our objects and update the stage anymore, so we'll want to wrap everything currently in the `tick` function inside a condition to check if the game is not over. We'll also want to add the logic to check if our `cookieGoal` has been reached or if the `maxTime` has expired, so put this just after that `gameOver` check:
```
function tick(event){
    if (gameOver === false){
        if (score === cookiesGoal && maxTime > 0) {
            // win
        } else if (maxTime === 0){
            // lose
        }
        
        *** rest of tick handler code here ***
        
    }
}
```
When either of those scenarios are reached, we want to empty the stage and display the appropriate text. Since the code for this is very similar (except for the text's message), we'll create it in a separate function:
```
function showEndGame(endMessage){
    stage.removeAllChildren();
    var endText = new createjs.Text(endMessage, "50px Tahoma", "black");
    endText.textAlign = "center";
    endText.textBaseline = "middle";
    endText.x = stage.canvas.width / 2;
    endText.y = stage.canvas.height / 2;
    stage.addChild(endText);
    gameOver = true;
}
```
Now call this function with the appropriate message in the logic we just wrote for "win" or "lose":
```
if (score === cookiesGoal && maxTime > 0) {
    // win
    showEndGame("You Win!");
} else if (maxTime === 0){
    // lose
    showEndGame("You Lose!");
}
```

## Credits
Art from GameArtGuppy.com
