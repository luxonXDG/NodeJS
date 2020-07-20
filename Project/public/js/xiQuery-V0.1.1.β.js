/**
 * Created by LuxonD on 2020/5/20.
 */
(function () {
    var jQuery = function (ele){
        return new jQuery.prototype.init(ele)
    };
    function geShiHua(data) {
        let arr = [];
        for(let name in data){
            arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
        }
        return arr.join("&");
    }
    jQuery.ajax = function (reqMsg) {
        reqMsg = reqMsg || {};
        reqMsg.type = (reqMsg.type || "GET").toUpperCase();
        let params = geShiHua(reqMsg.data);
        let xmlHttp;
        if(window.XMLHttpRequest){
            xmlHttp = new XMLHttpRequest();
        }
        else if(window.ActiveXObject){
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlHttp.onreadystatechange = function () {
            if(xmlHttp.status==200 && xmlHttp.readyState == 4){
                let backData = JSON.parse(xmlHttp.responseText);
                reqMsg.success && reqMsg.success(backData);
            }
        };

        if(reqMsg.type == "GET"){
            console.log(reqMsg.type);
            if(params){
                xmlHttp.open("GET",reqMsg.url+"?"+params,true);
                xhr.send(null);
            }
            else {
                xmlHttp.open("GET",reqMsg.url,true);
                xhr.send(null);
            }
        }
        else if(reqMsg.type == "POST"){
            xmlHttp.open("POST",reqMsg.url,true);
            xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xmlHttp.send(params);
        }
    };
    jQuery.post =function (url,data,success) {
        jQuery.ajax({
            type:"post",
            data:data,
            url:url,
            success:success
        })
    };
    jQuery.get =function (url,data,success) {
        jQuery.ajax({
            type:"get",
            data:data,
            url:url,
            success:success
        })
    };
    jQuery.extend = function (obj) {
        for(let key in obj){
            jQuery[key]=obj[key]
        }
    };
// 原型替换
    jQuery.fn = jQuery.prototype ={
        constructor:jQuery,
        init:function(ele){
            var ele = document.querySelectorAll(ele);
            [].push.apply(this,ele);
        },
        css:function(){
            console.log(arguments.length);
            if(arguments.length == 2){
                for(let i = 0 ; i < this.length ; i++){
                    this[i].style[arguments[0]] = arguments[1];
                }
            }else if(arguments.length == 1){
                if( typeof arguments[0] == 'object'){
                    for(let key in arguments[0]){
                        for(let i = 0 ; i < this.length ; i++){
                            this[i].style[key] = arguments[0][key];
                        }
                    }
                }else if(typeof arguments[0] == 'string'){
                    let obj = this[0].currentStyle || document.defaultView.getComputedStyle(this[0],null);
                    return obj[arguments[0]];
                }
            }
            return this;
        },
        on:function (eventype,fn) {
            for(let i = 0;i<this.length;i++){
                this[i].addEventListener(eventype,fn);
                return this[0];
            }
        },
        addClass:function (className) {
            for(let i = 0;i<this.length;i++){
                this[i].classList.add(className);
                return this[0]
            }
        },
        removeClass:function (className) {
            for(let i = 0;i<this.length;i++){
                this[i].classList.remove(className);
                return this[0]
            }
        },
        attr:function () {
            if(arguments.length == 1){
                return this[0].getAttribute(arguments[0]);
            }
            else if(arguments.length == 2){
                for(let i = 0 ;i < element.length;i++){
                    this[i].setAttribute(arguments[0], arguments[1]);
                    return this[0]
                }
            }
        },
        html:function () {
            if(arguments.length == 1 && typeof arguments[0] == "string"){
                this[0].innerHTML = arguments[0];
                return this[0]
            }
            else {
               return this[0].innerHTML
            }
        },
        text:function () {
            if(arguments.length == 1 && typeof arguments[0] == "string"){
                this[0].innerText = arguments[0];
                return this[0]
            }
            else {
                return this[0].innerText
            }
        },
        val:function () {
            if(arguments.length == 1 && typeof arguments[0] == "string"){
                this[0].value = arguments[0];
                return this[0]
            }
            else {
                return this[0].value;
            }
        }
    };
// 最关键的一步
    jQuery.prototype.init.prototype = jQuery.fn;
// 暴露给全局
    window.Xi= window.X$ = jQuery;
})();