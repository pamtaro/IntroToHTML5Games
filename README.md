# Lesson 06 - Collision Detection and Scoring
The source files of this branch shows the completed version of what will be built. To follow along in your own environment, you will need to download the images folder. To use the images in a code playground, be sure to use its full raw path, i.e. `https://raw.githubusercontent.com/pamtaro/IntroToHTML5Games/Lesson-01/images/[filename]`.

## Scoreboard
Since we now have a moveable/controllable koala and cookies falling from the sky, we'll make the object of the game for the koala to catch a certain number of cookies before it touches the ground. For that, we'll need to add a scoreboard. Let's start with a background for the scoreboard:
```
var scoreBG = new createjs.Shape();
scoreBG.graphics.beginFill("#bb0000").drawRect(0, 0, 50, 50);
```
We'll also need Text over the Background to display the current score. Declare the `scoreText` variable at the top (so it can be updated anywhere in the JavaScript file). Then create the Text object:
```
scoreText = new createjs.Text("0", "38px Tahoma", "white");    
```
Append both of these to the stage and remember- _order matters_!

## Cookie Collides with Koala
To figure out if the cookie "collides" with the koala, we need to figure out the specific boundaries for the koala and cookie. 
For the koala, we want to Y-Coordinate at the top of the Sprite as well as the X-Coordinates of the the koala's left and right side.
For the cookie, we care about the Y-Coordinate at the bottom of the Image, but we'll only care about the center of the cookie along the X-Axis.
Here is the code to determine those coordinates and whether the koala and cookie have collided:
```
var koalaTop = koala.y - (koala.getBounds().height / 2);
var koalaLeft = koala.x - (koala.getBounds().width / 2);
var koalaRight = koala.x + (koala.getBounds().width / 2);
var cookieBottom = cookie.y + (cookie.image.width / 2);
if (cookieBottom >= koalaTop && cookie.x >= koalaLeft && cookie.x <= koalaRight){

}
```

In order to update the Score, we'll need to change the text to a Number so that we can increment it. Place the following code to update the score inside the prevous logic:
```
var scoreInt = parseInt(scoreText.text);
scoreInt++;
scoreText.text = scoreInt;
```

We don't want to cookie to continue moving down the stage after it has collided with the koala, so we'll want to reset it right away:
```
cookie.y = 0;
cookie.x = Math.ceil(Math.random() * stage.canvas.width);
```

Now refactor these 2 lines into its own `resetCookie` function since they're also used when the cookie reaches the bottom of the stage.

## Credits
Art from GameArtGuppy.com
