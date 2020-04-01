function Banner() {
    var html = `<div class="slider" id="slider">
                    <div class="slide"><img src="img/b5.png" alt=""></div>
                    <div class="slide"><img src="img/b1.png" alt=""></div>
                    <div class="slide"><img src="img/b2.png" alt=""></div>
                    <div class="slide"><img src="img/b3.png" alt=""></div>
                    <div class="slide"><img src="img/b4.png" alt=""></div>
                    <div class="slide"><img src="img/b5.png" alt=""></div>
                    <div class="slide"><img src="img/b1.png" alt=""></div>
                </div>
                <span id="left"><</span>
                <span id="right">></span>
                <ul class="nav" id="navs">
                    <li class="active">1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                </ul>`;
    this.show = function (config) {
    // 写入html
        $(config).html(html);
        var $box = $('#box'),
            slider = $('#slider').get(0),
            $nav = $('#navs').children(),
            $left = $('#left'),
            $right = $('#right'),
            idx=1,
            timer,
            finish=false;
    // 滑入停止
        $box.mouseover(function () {
            if(timer){
            clearInterval(timer);
            }
            $left.css({
            opacity: 0.8
            })
            $right.css({
            opacity: 0.8
            })
        })
    // 滑出轮播
        $box.mouseout(function () {
            timer = setInterval(nextPage,2000);
            $left.css({
            opacity: 0
            })
            $right.css({
            opacity: 0
            })
        })
    // 下一张
        function nextPage() {
            if (finish) {return;}
            finish = true;
            idx++;
            navActive();
            Change(slider, {left: -1200 * idx}, 
                function () {
                    if (idx == 6) {
                        slider.style.left = '-1200px';
                        idx = 1;
                    }
                    finish = false;
                }
            );
        }
    // 上一张
        function prevPage() {
            if (finish) {return;}
            finish = true;
            idx--;
            navActive();
            Change(slider, {left: -1200 * idx},
                function () {
                    if (idx == 0) {
                        slider.style.left = '-6000px';
                        idx = 5;
                    }
                    finish = false;
                }
            );
        }
        $right.click(function(){nextPage()});
        $left.click(function(){prevPage()});
    //getStyle函数
        function getStyle(style, attr){
            if(style.currentStyle){
            return style.currentStyle[attr];
            } else {
            return getComputedStyle(style,false)[attr];
            }
        }
    //切换函数
        function Change(object,json,callback){
            clearInterval(object.timer);
            object.timer = setInterval(function(){
            var stop = true;
            for(var attr in json){
                var now = 0;
                if(attr == 'opacity'){
                now = parseInt(getStyle(object,attr)*100);
                }else{
                now = parseInt(getStyle(object,attr));
                }
                var speed = (json[attr] - now) / 10;
                speed = speed>0?Math.ceil(speed):Math.floor(speed);
                var cur = now + speed;
                if(attr == 'opacity'){
                    object.style[attr] = cur / 100;
                }else{
                    object.style[attr] = cur + 'px';
                }
                if(json[attr] !== cur){
                stop = false;
                }
            }
            if(stop){
                clearInterval(object.timer);
                callback&&callback();
            }
            }, 25)
        }
    //点小圆点换页
        function navActive() {
            for (var i = 0; i < $nav.length; i++) {
                $nav[i].className = "";
            }
            if (idx > 5) {
                $nav[0].className = "active";
            } else if (idx <= 0) {
                $nav[4].className = "active";
            } else {
                $nav[idx - 1].className = "active";
            }
        }
        timer = setInterval(nextPage, 2000);
    //小圆点绑定点击事件
        for (var i = 0; i < $nav.length; i++) {
            (function (i) {
            $nav[i].onclick = function () {
                idx = i + 1;
                navActive();
                Change(slider, {
                left: -1200 * idx
                });
            }
            })(i);
        }

    }
  }