(function () {
    var koala, cookie;
    var koalaMoveX = 10;
    var gameCanvas = document.getElementById("gameCanvas");
    var stage = new createjs.Stage(gameCanvas);
    
    // images
    var manifest = [
        {
            id: "koala",
            src: "images/koala_idle.png"
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
        koala = new createjs.Bitmap(loader.getResult("koala"));
        koala.regX = koala.image.width / 2;
        koala.regY = koala.image.height / 2;
        koala.x = koala.image.width / 2;
        koala.y = stage.canvas.height - (koala.image.height/2);
        cookie = new createjs.Bitmap(loader.getResult("cookie"));
        cookie.regX = cookie.image.width / 2;
        cookie.regY = cookie.image.height / 2;
        cookie.x = stage.canvas.width / 2;
        cookie.y = 0;
        stage.addChild(koala, cookie);
        createjs.Ticker.on("tick", tick);
    }

    function tick(event) {
        if (koala.x >= stage.canvas.width) {
            koalaMoveX = -10;
        } else if (koala.x <= 0) {
            koalaMoveX = 10;
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