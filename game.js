(function () {
    var koala, cookie;
    var koalaMoveX = 10;
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
        }
    ];
    var loader = new createjs.LoadQueue();
    loader.loadManifest(manifest, true);

    loader.on("complete", handleComplete, this);

    function handleComplete(e) {        
	var spriteSheet = new createjs.SpriteSheet({
			framerate: 30,
			"images": [loader.getResult("koala")],
			"frames": {"regX": 36, "regY": 51, "width": 72, "height": 102},
			"animations": {
				"run": [0, 1, "run"]
			}
		});
	koala = new createjs.Sprite(spriteSheet, "run");
        koala.x = koala.getBounds().width / 2;
        koala.y = stage.canvas.height - (koala.getBounds().height/2);

        cookie = new createjs.Bitmap(loader.getResult("cookie"));
        cookie.regX = cookie.image.width / 2;
        cookie.regY = cookie.image.height / 2;
        cookie.x = stage.canvas.width / 2;
        cookie.y = 0;
        
        stage.addChild(koala, cookie);
        createjs.Ticker.on("tick", tick);
    }

    function tick(event) {
        if (koala.x >= stage.canvas.width || koala.x <= 0) {
            koalaMoveX = koalaMoveX * -1;
        }
            
        koala.x = koala.x + koalaMoveX;
        
        cookie.rotation = cookie.rotation + 45;
        cookie.y = cookie.y + 10;
        
        if (cookie.y >= stage.canvas.height) {
            cookie.y = 0;
            cookie.x = Math.ceil(Math.random() * stage.canvas.width);
        }
        
        stage.update(event);
    }
})();
