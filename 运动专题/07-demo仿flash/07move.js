/**
 * Created by Administrator on 2016/10/19 0019.
 */
function getStyle(obj,attr){
    if(obj.currentStyle){//IE8
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj,false)[attr];
    }
}
function startMove(obj,attr,iTarget){
    var oDiv=document.getElementById("div1")
    clearInterval(obj.timer);
    obj.timer=setInterval(function() {
        var iCur=null;
        if(attr=='opacity'){
            iCur=parseInt(parseFloat(getStyle(obj,attr))*100);//去小数，防止闪烁
        }else{
            iCur=parseInt(getStyle(obj,attr));
        }
        var iSpeed=(iTarget-iCur)/8;
        iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
        if(iCur==iTarget){
            clearInterval(obj.timer);
        }else{
            if(attr=='opacity'){
                obj.style.filter='alpha(opacity:"+(iCur+iSpeed)+")';
                obj.style.opacity=(iCur+iSpeed)/100;
            }
            obj.style[attr]=iCur+iSpeed+'px';
        }
    },30);
}