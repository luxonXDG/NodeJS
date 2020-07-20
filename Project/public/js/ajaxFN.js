/**
 * Created by LuxonD on 2020/5/14.
 */
//type == 请求类型
//data == 发送数据
//url == 请求地址
//success == 回调函数
function myAjax(reqMsg) {
    reqMsg = reqMsg || {};
    reqMsg.type = (reqMsg.type || "GET").toUpperCase();
    var params = geShiHua(reqMsg.data);
    var xmlHttp;
    if(window.XMLHttpRequest){
        xmlHttp = new XMLHttpRequest();
    }
    else if(window.ActiveXObject){
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlHttp.onreadystatechange = function () {
        if(xmlHttp.status==200 && xmlHttp.readyState == 4){
            var backData = JSON.parse(xmlHttp.responseText);
            reqMsg.success && reqMsg.success(backData);
        }
        else {
            console.log("ERROR:0032:: request:"+reqMsg.url+" TIMEOUT XMLHttpRequest：XMLHttpRequest.readyState::1919")
        }
    };
    if(reqMsg.type == "GET"){
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
}

function geShiHua(data) {
    var arr = [];
    for(var name in data){
        arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
    }
    return arr.join("&");
}