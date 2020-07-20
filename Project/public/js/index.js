/**
 * Created by LuxonD on 2020/5/2.
 */
$(function () {
    $(".carBox").on("click",function () {
        var theCar = $(this).attr("data-id");
        myAjax({
            type:"post",
            url:"xiangqing.do",
            data:{carId:theCar},
            success:function (data) {
                if(data.code == 1){
                    location.href = "xiangqing.html";
                }
            }
        })
    });
});