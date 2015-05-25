(function () {
    var koala, cookie, ground, background, flower, tree, scoreText, timeText;
    var foregroundSpeed = -0.7;
    var backgroundSpeed = -0.1;
    var koalaMoveX = 10;
    var score = 0;
    var cookiesGoal = 5;
    var maxTime = 20;
    
    var gameCanvas = document.getElementById("gameCanvas");
    var stage = new createjs.Stage(gameCanvas);

    // images
    var manifest = [
        {
            id: "koala",
            src: "images/koala_spritesheet.png"
        },
        {
            id: "cookie",
            src: "images/pastry_cookie01.png"
        },
        {
            id: "ground",
            src: "images/foreground.png"
        },
        {
            id: "background",
            src: "images/background.png"
        },
        {
            id: "flower",
            src: "images/flowers.png"
        },
        {
            id: "tree",
            src: "images/tree.png"
        }
    ];
    var loader = new createjs.LoadQueue();
    loader.loadManifest(manifest, true);

    loader.on("complete", handleComplete, this);

    function handleComplete(e) {
        var spriteSheet = new createjs.SpriteSheet({
            framerate: 30,
            "images": [loader.getResult("koala")],
            "frames": {
                "regX": 36,
                "regY": 51,
                "width": 72,
                "height": 102
            },
            "animations": {
                "run": [0, 1, "run"]
            }
        });
        koala = new createjs.Sprite(spriteSheet, "run");
        koala.x = koala.getBounds().width / 2;
        koala.y = stage.canvas.height - (koala.getBounds().height / 2) - 50;

        cookie = new createjs.Bitmap(loader.getResult("cookie"));
        cookie.regX = cookie.image.width / 2;
        cookie.regY = cookie.image.height / 2;
        cookie.x = stage.canvas.width / 2;
        cookie.y = 0;
        
        // foreground
        ground = new createjs.Bitmap(loader.getResult("ground"));  
        ground.x = -30;
        flower = new createjs.Bitmap(loader.getResult("flower"));
        flower.y = stage.canvas.height - flower.image.height - 70;
        flower.x = 100;
        tree = new createjs.Bitmap(loader.getResult("tree"));
        tree.y = stage.canvas.height - tree.image.height - 100;
        tree.x = 800;
        // background
        background = new createjs.Bitmap(loader.getResult("background"));  
        background.x = -20;

        var scoreBG = new createjs.Shape();
        scoreBG.graphics.beginFill("#00bb00").drawRect(0, 0, 50, 50);
        scoreText = new createjs.Text(score, "38px Tahoma", "white");   
        
        var timeBG = new createjs.Shape();
        timeBG.graphics.beginFill("#bb0000").drawRect(50, 0, 50, 50);
        timeText = new createjs.Text(maxTime, "38px Tahoma", "white");
        timeText.x = 55;

        stage.addChild(background, ground, flower, tree, koala, cookie, scoreBG, scoreText, timeBG, timeText);

        stage.on("stagemousedown", changeDirections);
        window.addEventListener("keydown", handleKeyDown);

        createjs.Ticker.on("tick", tick);
        window.setTimeout(countdownTime, 1000);
    }
    
    function countdownTime(){
        maxTime = maxTime - 1;
        if (maxTime > 0){            
            window.setTimeout(countdownTime, 1000);
        }
    }

    function handleKeyDown(event) {
        if (event.keyCode == 32) {
            // spacebar is pressed 
            changeDirections();
        }
    }

    function changeDirections() {
        koalaMoveX = koalaMoveX * -1;
        koala.scaleX = koala.scaleX * -1;
    }

    function resetCookie() {
        cookie.y = 0;
        cookie.x = Math.ceil(Math.random() * stage.canvas.width);
    }
    
    function showEndGame(endMessage){
        stage.removeAllChildren();
        var endText = new createjs.Text(endMessage, "50px Tahoma", "black");
        endText.textAlign = "center";
        endText.textBaseline = "middle";
        endText.x = stage.canvas.width / 2;
        endText.y = stage.canvas.height / 2;
        stage.addChild(endText);
    }

    function tick(event) {
        if (score === cookiesGoal && maxTime > 0) {
            // win
            showEndGame("You Win!");
        } else if (maxTime === 0){
            // lose
            showEndGame("You Lose!");
        }
        
        timeText.text = maxTime;
        
        var koalaTop = koala.y - (koala.getBounds().height / 2);
        var koalaLeft = koala.x - (koala.getBounds().width / 2);
        var koalaRight = koala.x + (koala.getBounds().width / 2);
        var cookieBottom = cookie.y + (cookie.image.width / 2);
        if (cookieBottom >= koalaTop && cookie.x >= koalaLeft && cookie.x <= koalaRight) {
            resetCookie();
            score++;
            scoreText.text = score;
        }

        if (koala.x >= stage.canvas.width || koala.x <= 0) {
            changeDirections();
        }

        koala.x = koala.x + koalaMoveX;
        ground.x = ground.x + (koalaMoveX*foregroundSpeed);
        flower.x = flower.x + (koalaMoveX*foregroundSpeed);
        tree.x = tree.x + (koalaMoveX*foregroundSpeed);
        background.x = background.x + (koalaMoveX*backgroundSpeed);

        cookie.rotation = cookie.rotation + 45;
        cookie.y = cookie.y + 10;

        if (cookie.y >= stage.canvas.height) {
            resetCookie();
        }

        stage.update(event);
    }
})();