//可以让多个值同时变化
function getStyle(obj,attr){
    if(obj.currentStyle){//IE8
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj,false)[attr];
    }
}
function startMove(obj,json,fn){//可同时运动--json
    clearInterval(obj.timer);
    obj.timer=setInterval(function() {
        var bStop=true;//这一次运动就结束了--所有的值都到达了
        for(var attr in json){

            //1.取当前值
            var iCur=null;
            if(attr=='opacity'){
                iCur=parseInt(parseFloat(getStyle(obj,attr))*100);//去小数，防止闪烁
            }else{
                iCur=parseInt(getStyle(obj,attr));
            }

            //2.算速度
            var iSpeed=(json[attr]-iCur)/8;
            iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);

            //3.检测停止
            if(iCur!=json[attr]){
                bStop=false;
            }
            if(attr=='opacity'){
                obj.style.filter='alpha(opacity:"+(iCur+iSpeed)+")';
                obj.style.opacity=(iCur+iSpeed)/100;
            }else{
                obj.style[attr]=iCur+iSpeed+'px';
            }
        }
        if(bStop){
            clearInterval(obj.timer);
            if(fn){
                fn();
            }
        }

    },30);
}