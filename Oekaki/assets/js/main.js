$(function() {
    var $canvas = $("#myCanvas");
    var ctx = $canvas[0].getContext('2d');
    var drag_flag = false;
    var offset = 5;
    var startX, startY;

    // canvas上をドラッグ開始
    $canvas.on('mousedown touchstart', function(e) {
        drag_flag = true;
        startX = e.pageX - $(this).position().left - offset;
        startY = e.pageY - $(this).position().top - offset;
        console.log(startX, startY);
        return false;
    });

    console.log($canvas.offset().left);
    console.log($canvas.offset().top);

    //canvas上をドラッグ中
    $canvas.mousemove(function(e) {
        if(!drag_flag) return;
        var endX = e.pageX - $(this).position().left - offset;
        var endY = e.pageY - $(this).position().top - offset;

        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        startX = endX;
        startY = endY;
        console.log(endX, endY);
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

});