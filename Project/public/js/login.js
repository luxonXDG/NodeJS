/**
 * Created by LuxonD on 2020/4/29.
 */
$(function () {
    $("#loginBtn").click(function () {
        if($("#userName").val().trim().length==0){
            $("#userNameHint").removeClass("hide");
        }
        if($("#userPwd").val().trim().length==0){
            $("#userPwdHint").removeClass("hide");
        }
        if($("#userName").val().trim().length>0&&$("#userPwd").val().trim().length>0){
            $("#userNameHint").addClass("hide");
            $("#userPwdHint").addClass("hide");
            //登陆事件
            var param = $("#loginForm").serialize();
            $.post("login.do",param,function (data) {
                alert(data.message);
                if(data.code==1){
                    location.href = "index.html";
                }
            })
        }

    })
});