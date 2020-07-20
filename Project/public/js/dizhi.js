/**
 * Created by LuxonD on 2020/5/4.
 */
$(function () {
    $("#loginBtn").click(function () {
        var allTianXie = true;
        for(let i = 0 ; i<document.getElementsByTagName("input").length;i++){
            if(!document.getElementsByTagName("input")[i].value){
                allTianXie = false;
                $(document.getElementsByTagName("input")[i].nextSibling).removeClass("hide")
            }
            else if(document.getElementsByTagName("input")[i].value){
                $(document.getElementsByTagName("input")[i].nextSibling).add("hide")
            }
        }
        if(allTianXie){
            let dizhi = $("#dizhiForm").serialize();
            $.post("dizhiAdd.do",dizhi,function (data) {
                if(data.code == 1){
                    alert("添加成功");
                    if(sessionStorage.pageName == "dingDan"){
                        location.href = "dingdantianxie.html"
                    }
                    else if(sessionStorage.pageName == "geRen"){
                        location.href = "geren.html"
                    }
                }
                else if(data.code == 10){
                    alert("请登陆");
                }
                else {
                    alert("伺服器君是个大變態");
                }
            })
        }
    })
})