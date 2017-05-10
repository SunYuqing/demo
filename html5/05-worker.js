/**
 * Created by Administrator on 2016/10/27 0027.
 */
self.onmessage= function (ev) {
    //alert(ev.date);不支持，仅支持部分bom和ecmascript
    self.postMessage(ev.data+',monica');

};