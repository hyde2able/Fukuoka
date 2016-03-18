$(function() {
    var $canvas = $("#myCanvas");
    var ctx = $canvas[0].getContext('2d');
    ctx.lineWidth = 1;
    var drag_flag = false;
    var offset = 5;
    var startX, startY;

    // canvas上をドラッグ開始
    $canvas.on('mousedown touchstart', function(e) {
        drag_flag = true;
        startX = e.pageX - $(this).position().left - offset;
        startY = e.pageY - $(this).position().top - offset;
        putPoint(startX, startY);
        return false;
    });

    //canvas上をドラッグ中
    $canvas.mousemove(function(e) {
        if(!drag_flag) return;
        var endX = e.pageX - $(this).position().left - offset;
        var endY = e.pageY - $(this).position().top - offset;

        putPoint(endX, endY);
        drawLine(startX, startY, endX, endY);
        startX = endX;
        startY = endY;
    });

    //canvas上からマウスが離れたら
    $canvas.on('mouseup mouseout touchend touchcancel', function() {
        drag_flag = false;
    });

    //色をクリックしたらその色に変更
    $("#colorList li").on("click", function() {
        var color = $(this).css("background-color");
        ctx.strokeStyle = color;
        $("#nowColor").css("background-color", color);
    });

    //クリアを押したらキャンバスを消す
    $("#clearButton").on("click", function() {
        ctx.clearRect(0, 0, $canvas.width(), $canvas.height());
    });

    //セーブを押したら画像にする
    $("#saveButton").on("click", function() {
        var data = $canvas[0].toDataURL("image/png");
        data = data.replace("image/png", "image/octet-stream");
        window.open(data, 'save');
    });


    //(x, y)に点を描画
    var putPoint = function(x, y) {
        ctx.beginPath();
        ctx.arc(x, y, ctx.lineWidth / 2.0, 0, Math.PI*2, false);
        ctx.closePath();
    }
    //(sx, sy)から(ex, ey)に線を描画
    var drawLine = function(sx, sy, ex, ey) {
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(ex, ey);
        ctx.stroke();
        ctx.closePath();
    }

});