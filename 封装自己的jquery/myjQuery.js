/**
 * Created by Administrator on 2016/10/23 0023.
 */
function myAddEvent(obj,sEv,fn){//添加事件
    if(obj.attachEvent){       //IE中事件绑定有bug，会使得this指向为window
        obj.attachEvent('on'+sEv,function(){
           if(false==fn.call(obj)){//call解决ie的this bug,return 阻值默认行为
               event.cancelBubble=true;
               return false;
           } ;
        });
    }else {
        obj.addEventListener(sEv,function(ev){
            if(false==fn.call(obj)){
                ev.cancelBubble=true;
                ev.preventDefault();
            }
        },false);
    }
}
function getByClass(oParent,sClass){//通过class名获取元素，兼容ie8
    var aEle=oParent.getElementsByTagName('*');
    var aResult=[];
    var i=0;
    for(i=0;i<aEle.length;i++){
        if(aEle[i].className==sClass){
            aResult.push(aEle[i]);
        }
    }
    return aResult;
}
function getStyle(obj,attr){//获取样式
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return obj.getComputedStyle(obj,false)[attr];
    }
}
//核心
function myjQuery(vArg){
    this.elements=[];//用于保存选中的元素
    switch (typeof vArg){
        case "function":
            myAddEvent(window,'load',vArg);
            break;
        case "string":
            switch(vArg.charAt(0)){
                case '#':   //id
                    var obj=document.getElementById(vArg.substring(1));
                    this.elements.push(obj);
                    break;
                case '.':   //class
                    this.elements=getByClass(document,vArg.substring(1));
                    break;
                default:    //tagname
                    this.elements=document.getElementsByTagName(vArg);
            }
            break;
        case "object":
            this.elements.push(vArg);
    }
}
myjQuery.prototype.click=function(fn){
    var i;
    for(i=0;i<this.elements.length;i++){
        myAddEvent(this.elements[i],'click',fn);
    }
    return this;
};
myjQuery.prototype.show=function(){
    var i=0;
    for(i=0;i<this.elements.length;i++){
        this.elements[i].style.display="block";
    }
    return this;
};
myjQuery.prototype.hide=function(){
    var i=0;
    for(i=0;i<this.elements.length;i++){
        this.elements[i].style.display="none";
    }
    return this;
};
myjQuery.prototype.hover=function(fnOver,fnOut){
    var i=0;
    for(i=0;i<this.elements.length;i++){
        myAddEvent(this.elements[i],'mouseover',fnOver);
        myAddEvent(this.elements[i],'mouseout',fnOut);
    }
    return this;
};
myjQuery.prototype.css=function(attr,value){
    if(arguments.length==2){//当是两个参数时，设置样式
        var i=0;
        for(i=0;i<this.elements.length;i++){
            this.elements[i].style[attr]=value;
        }
    }else{//获取样式
        if(typeof attr=='string'){
            return getStyle(this.elements[0],attr);
        }else {//json
            for(i=0;i<this.elements.length;i++){
                var k='';
                for(k in attr){
                    this.elements[i].style[k]=attr[k];
                }
            }
        }

    }
    return this;
};
myjQuery.prototype.toggle=function(){
    var i=0;
    var _arguments=arguments;
    for(i=0;i<this.elements.length;i++){
        addToggle(this.elements[i]);
    }
    function addToggle(obj){
        var count=0;
        myAddEvent(obj,'click',function(){
            _arguments[count++%_arguments.length].call(obj);//注意arguments与this类似，需要提前保存一份
        });
    }
    return this;
};
myjQuery.prototype.attr=function(attr,value){
    if(arguments.length==2){
        var i=0;
        for(i=0;i<this.elements.length;i++){
            this.elements[i][attr]=value;//attr是获取元素属性，style是修改样式
        }
    }else {
        return this.elements[0][attr];
    }
    return this;
};
myjQuery.prototype.eq= function (n) {
    return $(this.elements[n]);//和jQuery类似，将dom对象包装成$对象，方便后续继续调用
};
function appendArr(arr1,arr2){
    var i=0;
    for(i=0;i<arr2.length;i++){
        arr1.push(arr2);
    }
}
myjQuery.prototype.find=function(str){
    var i=0;
    var oResult=[];
    for(i=0;i<this.elements.length;i++){
        switch (str.charAt(0)){
            case "."://class
                var oEle=getByClass(this.elements[i],str.substring(1));
                oResult=oResult.concat(oEle);
                break;
            default://标签
                var oEle=this.elements[i].getElementsByTagName(str);
                //oResult=oResult.concat(oEle);因为oResult不是数组，没有concat方法
                appendArr(oResult,oEle);
        }
    }
    var newmyjQuery=$();
    newmyjQuery.elements=oResult;
    return newmyjQuery;
};
function getIndex(obj){
    var aBrother=obj.parentNode.children;
    var i=0;
    for(i=0;i<aBrother.length;i++){
        if(aBrother[i]==obj){
            return i;
        }
    }
}
myjQuery.prototype.index=function(){
   return getIndex(this.elements[0]);
};
myjQuery.prototype.bind=function(sEv,fn){
    var i=0;
    for(i-0;i<this.elements.length;i++){
        myAddEvent(this.elements[i],sEv,fn);
    }
};
myjQuery.prototype.extend=function(name.fn){//扩展方法
    myjQuery.prototype[name]=fn;
};
$().

function $(vArg){
    return new myjQuery(vArg);
}