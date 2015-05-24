(function () {
    var gameCanvas = document.getElementById("gameCanvas");
    var ctx = gameCanvas.getContext("2d");

    // red rectangle
    ctx.fillStyle = "rgb(255,0,0)";
    ctx.fillRect(0, 0, 100, 200);

    // black circle
    ctx.arc(200, 100, 100, 0, Math.PI * 2, false);
    ctx.fillStyle = "blue";
    ctx.fill();

    // text
    ctx.font = "30px Tahoma";
    ctx.fillText("Hello world", 10, 250);

    // image
    var img = new Image();
    img.src = "images/koala_idle.png";
    img.onload = function () {
        ctx.drawImage(img, 300, 0);
    };

    /*
     // animate images
     var img1 = new Image();
     img1.src = "koala_walk01.png";
     var img2 = new Image();
     img2.src = "images/koala_walk02.png";

     var play1 = true;
     img1.onload = function() {
       window.setInterval(drawWalk, 100);
     };

     function drawWalk() {
       // clear specific area
       ctx.clearRect(400,0,200,200);
       // clear all
       //ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
       if (play1 === true) {
         ctx.drawImage(img1, 400, 0);
       } else {
         ctx.drawImage(img2, 400, 0);
       }
       play1 = !play1;
     }
     */
})();
