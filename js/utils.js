if(!window.requestAnimationFrame){  //requestAnimationFrame兼容不同浏览器
    window.requestAnimationFrame = (window.webkitRequestAnimationFrame ||
                                    window.mozRequestAnimationFrame ||
                                    window.oRequestAnimationFrame ||
                                    window.msRequestAnimationFrame || function(){
                                        return window.setTimeout(callback, 1000/60);
                                    });
}
var utils = {};
 /** 
  * 获取鼠标相对于element的坐标
  * @param element 
 */
utils.captureMouse = function(element){
    var mouse = { x: 0, y: 0 };         //鼠标的初始坐标(相对于element的左上角坐标(0, 0)而言)
    element.addEventListener('mousemove', (event) => {
        var x, y;
        if(event.pageX || event.pageY){
            x = event.pageX;
            y = event.pageY;
        }else {
            x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        x -= element.offsetLeft;
        y -= element.offsetTop;

        mouse.x = x;
        mouse.y = y;
    }, false);
    return mouse;
}

/** 
 * 获取第一个手指在元素上触摸的位置
 */
utils.captureTouch = function(element){
    var touch = { x: null, y: null, isPressed: false};    //手指没有触摸到元素上时， x，y置为null, isPressed置为false
    element.addEventListener('touchstart', (event) => {    //手指触摸着元素上
        touch.isPressed = true;
    }, false);
    element.addEventListener('touchend', (event) => {       //手指离开元素
        touch.isPressed = false;
        touch.x = null;
        touch.y = null;
    }, false);
    element.addEventListener('touchmove', (event) => {
        // console.log('move');
        var x, y,
            touch_event = event.touches[0];  //first touch
        if(touch_event.pageX || touch_event.pageY){
            x = touch_event.pageX;
            y = touch_event.pageY;
        }else{
            x = touch_event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            y = touch_event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        x -= element.offsetLeft;
        y -= element.offsetTop;
        
        touch.x = x;
        touch.y = y;
        // console.log(touch.x, touch.y)
    }, false);
    return touch;
}

/** 
 * 格式化颜色值
 */
utils.parseColor = function (color, toNumber) {
    if (toNumber === true) {
      if (typeof color === 'number') {
        return (color | 0); //chop off decimal
      }
      if (typeof color === 'string' && color[0] === '#') {
        color = color.slice(1);
      }
      return window.parseInt(color, 16);
    } else {
      if (typeof color === 'number') {
        color = '#' + ('00000' + (color | 0).toString(16)).substr(-6); //pad
      }
      return color;
    }
  };