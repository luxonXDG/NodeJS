/**
 * Created by LuxonD on 2020/4/29.
 */
$(function () {
    $("#btnReg").click(function () {
        var Name = $("#regName").val();
        var email = $("#regEmail").val();
        var pwd = $("#regPwd").val();
        var agpwd = $("#againPwd").val();
        var pwdAndAgpwd = true;
        $("#regName").removeClass("bdr");
        $("#regEmail").removeClass("bdr");
        $("#regPwd").removeClass("bdr");
        $("#againPwd").removeClass("bdr");
        if(Name.trim().length == 0){
            $("#regName").addClass("bdr");
        }
        if(email.trim().length == 0){
            $("#regEmail").addClass("bdr");
        }
        if(pwd.trim().length == 0){
            $("#regPwd").addClass("bdr");
        }
        if(pwd != agpwd){
            $("#regPwd").addClass("bdr");
            $("#againPwd").addClass("bdr");
            pwdAndAgpwd = false;
        }
        if(Name.trim().length >0&&email.trim().length > 0&&pwd.trim().length > 0&& pwdAndAgpwd){
            $("#regName").removeClass("bdr");
            $("#regEmail").removeClass("bdr");
            $("#regPwd").removeClass("bdr");
            $("#againPwd").removeClass("bdr");
            var param = $("#regForm").serialize();
               $.post("reg.do",param,function (data) {
                   alert(data.message);
                   if(data.code == 1){
                       location.href = "login.html";
                   }
               })
        }
    })
});