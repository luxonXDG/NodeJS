/**
 * Created by LuxonD on 2020/5/2.
 */
$(function () {
    let box1 = $(".dianJiBox1");
    let box2 = $(".dianJiBox2");
    box1.get(0).className+=" dianjihou";
    box2.get(0).className+=" dianjihou";
    let color = box1.attr('data-value');
    let peizhi = box2.attr('data-value');
    box1.click(function () {
        $(".dianJiBox1").removeClass("dianjihou");
        $(this).addClass("dianjihou");
        color = $(this).attr('data-value');
        // console.log(color,peizhi);
        Xi.ajax({
            type:"post",
            url:"getCarPeiZhi.do",
            data:{color:color,peizhi:peizhi},
            success:function (data) {
                document.getElementById("carColor").innerHTML = data[0].color;
                document.getElementById("carPeizhi").innerHTML = data[0].peizhi;
                document.getElementById("carPailang").innerHTML = data[0].pailiang;
                document.getElementById("carAtmt").innerHTML = data[0].atmt;
                document.getElementById("jiage").innerHTML = data[0].price;
            }
        })
    });
    box2.click(function () {
        $(".dianJiBox2").removeClass("dianjihou");
        $(this).addClass("dianjihou");
        peizhi = $(this).attr('data-value');
        Xi.ajax({
            type:"post",
            url:"getCarPeiZhi.do",
            data:{color:color,peizhi:peizhi},
            success:function (data) {
                document.getElementById("carColor").innerHTML = data[0].color;
                document.getElementById("carPeizhi").innerHTML = data[0].peizhi;
                document.getElementById("carPailang").innerHTML = data[0].pailiang;
                document.getElementById("carAtmt").innerHTML = data[0].atmt;
                document.getElementById("jiage").innerHTML = data[0].price;
            }
        })
    });
    $("#addLikeCar").click(function () {
        let carId =$(".carTitle").attr("data-value");
        $.ajax({
            type:"post",
            url:"adddingdan.do",
            data:{carId:carId,color:color,peizhi:peizhi},
            success:function (data) {
                if(data.code == -1){
                    alert("请登陆");
                }
                else  if(data.code == -2){
                    alert("伺服器君是个大變態")
                }
                else if(data.code == 1){
                    alert("已添加到LikeCar")
                }
            }
        })
    })
});