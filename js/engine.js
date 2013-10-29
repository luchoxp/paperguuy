function runEngine(){
    var speed = randomMinMax(200, 300);

    var paperguy = jQuery('#paperguy');
    var eraser = jQuery('#eraser');
    var ink = jQuery('#ink');
    
    var paperguySize = {
        height: $('img#paperguy').height(),
        width : $('img#paperguy').width()
    };
    
    var eraserSize = {
        height: $('#eraser').height(),
        width : $('#eraser').width()
    };
    
    var inkSize = {
        height: $('#ink').height(),
        width : $('#ink').width()
    };
    
    function randomMinMax(min, max) {
        return Math.floor(min + (1 + max- min) * Math.random());
    }
    
    function testCollision(position1, size1, position2, size2) {
        if (((position1.left + size1.width)  > position2.left) &&
        ((position1.top  + size1.height) > position2.top)  &&
        ((position2.left + size2.width)  > position1.left) &&
        ((position2.top  + size2.height) > position1.top)) {
            /*crash!!*/
            var lifePoints = $('#life').text();
            
            var percent = Math.round(lifePoints/10).toFixed(0);
            $('.progress_bar').css('background-size',percent+'% 20px');
            
            if (lifePoints < 1){
                eraser.stop();
                clearInterval(interval);
                clearInterval(inkInterval);
                paperguy.css({'opacity':0,'display':'none'});
                $('#multibutton').text('Game Over');
                $('#multibutton').unbind('click');
                $('#reset').css('display','block');
            }
            else {
                $('#life').text(lifePoints-1);
                if(lifePoints == 900){paperguy.css('opacity',0.9);}
                if(lifePoints == 800){paperguy.css('opacity',0.8);}
                if(lifePoints == 700){paperguy.css('opacity',0.7);}
                if(lifePoints == 600){paperguy.css('opacity',0.6);}
                if(lifePoints == 500){paperguy.css('opacity',0.5);}
                if(lifePoints == 400){paperguy.css('opacity',0.4);}
                if(lifePoints == 300){paperguy.css('opacity',0.3);}
                if(lifePoints == 200){paperguy.css('opacity',0.2);}
                if(lifePoints == 100){paperguy.css('opacity',0.15);}
            }
            
            //triggerExplosion(position1.top, position1.left);
        }
    }
    
    function inkCollision(position1, size1, position2, size2) {
    if (((position1.left + size1.width)  > position2.left) &&
        ((position1.top  + size1.height) > position2.top)  &&
            ((position2.left + size2.width)  > position1.left) &&
            ((position2.top  + size2.height) > position1.top)) {
            /*crash!!*/
            var life = parseInt($('#life').text());
            life = life+1;
            $('#life').text(life);
            if(life >= 100){paperguy.css('opacity',0.15);}
            if(life >= 200){paperguy.css('opacity',0.2);}
            if(life >= 300){paperguy.css('opacity',0.3);}
            if(life >= 400){paperguy.css('opacity',0.4);}
            if(life >= 500){paperguy.css('opacity',0.5);}
            if(life >= 600){paperguy.css('opacity',0.6);}
            if(life >= 700){paperguy.css('opacity',0.7);}
            if(life >= 800){paperguy.css('opacity',0.8);}
            if(life >= 900){paperguy.css('opacity',0.9);}
            
            //triggerExplosion(position1.top, position1.left);
        }
    }
    /*
    $('.moveUp_div').hover(function(){
    $('img#paperguy').css({'top': '-100px'});
    });
    
    $('.moveDown_div').hover(function(){
    $('img#paperguy').css({'top': '190px'});
    }); 
    
    $('#moveRight_div').hover(function(){
    $('img#paperguy').css({'left': '500px','transform':'rotate(360deg)','-webkit-transform':'rotate(360deg)'});
    });
    
    $('#moveLeft_div').hover(function(){
    $('img#paperguy').css({'left': '0px','transform':'rotate(0deg)','-webkit-transform':'rotate(0deg)'});
    });
    */
    
    
    $("body").keydown(function(e){
        k = e.keyCode;
        
        if (k == 13){stopGo();}
        
        if (k == 37){$('img#paperguy').css({'left': '0px','transform':'rotate(0deg)','-webkit-transform':'rotate(0deg)'});}
        if (k == 38){$('img#paperguy').css({'top': '-150px'});}
        if (k == 39){$('img#paperguy').css({'left': '550px','transform':'rotate(360deg)','-webkit-transform':'rotate(720deg)'});}
        if (k == 40){$('img#paperguy').css({'top': '210px'});}
    });
    $("body").keyup(function(e){    
        k = e.keyCode;
        if (k == 38){$('img#paperguy').css({'top': '210px'});}
    });
    
    function animateInk(inkTop,inkLeft){
    
        ink.css({'top':inkTop,'left':inkLeft});
        ink.css('display','block');  
        ink.animate({ top: inkTop, left: inkLeft }, {
            duration: 2000,
            step    : function(now, fx) {       
                inkCollision(paperguy.position(), paperguySize, ink.position(), inkSize);
            },
            queue   : false,
            complete: function(){ink.fadeOut()}
        });
    }
    
    function animateEraser() {
        var finder = randomMinMax(1,3);
        if(finder == 1) {
            pgtop = parseInt($('img#paperguy').css('top'))+150;
            pgleft = parseInt($('img#paperguy').css('left'));
            var top   = randomMinMax(pgtop,pgtop+1);
            var left  = randomMinMax(pgleft,pgleft+1);
        }
        else {
            var top   = randomMinMax(0,360);
            var left  = randomMinMax(0,500);
        }
        
        eraser.animate({ top: top, left: left }, {
            duration: speed,
            step    : function(now, fx) {
                testCollision(paperguy.position(), paperguySize, eraser.position(), eraserSize);
            },
            queue   : false,
            complete: animateEraser
        });
    }
    
    //animateEraser();
    //animateInk();
    
    var inkInterval = setInterval(function(){
        var top   = randomMinMax(-304,125);
        var left  = randomMinMax(0,604);
        animateInk(top,left);
    },7000);
    
    var interval = setInterval(function() {
        var t = parseInt($('#time').text());
        if(t<9)
            $('#time').text('0'+(t+1));
        else
            $('#time').text(t+1);
    },1000);
    
    clearInterval(interval);
    clearInterval(inkInterval);
    
    
    function stopGo(){
        if($('#multibutton').text() == 'pause'){
            eraser.clearQueue();
            eraser.stop();
            clearInterval(interval);
            clearInterval(inkInterval);
            $('#multibutton').text('resume');
        }
        else {
            animateEraser();
            inkInterval = setInterval(function(){
                var top   = randomMinMax(-304,125);
                var left  = randomMinMax(0,604);
                animateInk(top,left);
            },7000);
            
            interval = setInterval(function() {
                var t = parseInt($('#time').text());
                if(t<9)
                    $('#time').text('0'+(t+1));
                else
                    $('#time').text(t+1);
            },1000);
            $('#multibutton').text('pause');
        } 
    }
    
    $('#multibutton').click(function() {
        stopGo();       
    });
    
    function gameReset(){
        $('#time').text('00');
        paperguy.css({'top':'210px','left':'0'});
        eraser.css({'top':'0','left':'550px'});
        paperguy.css({'opacity':1,'display':'block'});
        $('#multibutton').text('start');
        $('#multibutton').click(function() {
            stopGo();       
        });
        $('#life').text('1000');   
        $('.progress_bar').css('background-size', '100% 20px');
    }
    
    $('#reset').click(function(){
        gameReset();
        $('#reset').css('display','none');
    });
}