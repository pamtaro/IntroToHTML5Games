(function () {
    var gameCanvas = document.getElementById("gameCanvas");
    var stage = new createjs.Stage(gameCanvas);
    
    // red rectangle    
    var rectangle = new createjs.Shape();
    rectangle.graphics.beginFill("red").drawRect(0, 0, 100, 200);

    // blue circle
    var circle = new createjs.Shape();
    circle.graphics.beginFill("blue").drawCircle(200, 100, 100);

    // text
    var text = new createjs.Text("Hello World!", "30px Tahoma");
    text.x = 10;
    text.y = 200;
    
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
        stage.addChild(rectangle, circle, text, koala, cookie);
        stage.update();
    }
})();