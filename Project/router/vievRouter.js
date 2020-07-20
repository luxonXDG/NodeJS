/**
 * Created by LuxonD on 2020/4/29.
 */
const  myexpress = require("express"); 
const db = require("./sqlConfig");
const  router = myexpress.Router();
//主页视图
router.get("/index.html",function (req,res) {
    //获取用户名
    let userName = req.session.userName;
    //获取用户头像
    let userImg = req.session.userImg;
    let sql = "select * from banner where DelState = 1";
    db.DBOper(sql,[],function (err,data) {
       if(err){
            console.log(err)
       }
       else {
           let sqlAll = 'select * from Product where DelState = 1';
           db.DBOper(sqlAll,[],function (err,allCar) {
               if(err){
                   console.log(err)
               }
               else {
                   res.render("index",{userName:userName,userImg:userImg,bannerUrl:data[0].videoPath,allCar:allCar});
               }
           })
       }
    });

});
//登录视图
router.get("/login.html",function (req,res) {
    res.render("login",{userName:null,userImg:null});
});
//注册视图
router.get("/reg.html",function (req,res) {
    res.render("reg",{userName:null,userImg:null});
});
//商品详情页视图
router.get("/xiangqing.html",function (req,res) {
    //获取当前车型ID
    let carId = req.session.carId;
    //获取用户信息
    let userName = req.session.userName;
    let userImg = req.session.userImg;
    let colorSql = `SELECT DISTINCT color
                    FROM productrule
                    WHERE productId = ?`;
    //数据库查询该车型的颜色
    db.DBOper(colorSql,[carId],function (err,colorData) {
        if(err){
            console.log(err)
        }
        else {
            let peizhiSql = `SELECT DISTINCT peizhi
                            FROM productrule
                            WHERE productId = ?`;
            //数据库查询该车型的配置
            db.DBOper(peizhiSql,[carId],function (err,peizhiData) {
                if(err){
                    console.log(err)
                }
                else {
                    let thisCarSql = "SELECT * FROM product WHERE Id = ?";
                    //数据库查找该车型信息
                    db.DBOper(thisCarSql,[carId],function (err,thisCarData) {
                        if(err){
                            console.log(err)
                        }
                        else {
                            let thisCarAllPeizhiSql =  "SELECT * FROM productrule WHERE productId = ?";
                            //数据库查询该车型配置
                            db.DBOper(thisCarAllPeizhiSql,[carId],function (err,thisCarAllPeizhiData) {
                                if(err){
                                    console.log(err)
                                }
                                else {
                                    //userName用户名
                                    //userImg用户头像
                                    //carId车型的ID
                                    //colorData该车型的颜色
                                    //peizhiData该车型的配置
                                    //thisCarData该车型的车型信息
                                    //thisCarAllPeizhiData该车型的配置信息
                                    res.render("xiangqing",{userName:userName,userImg:userImg,carId:carId, colorData:colorData, peizhiData:peizhiData, thisCarData:thisCarData, thisCarAllPeizhiData:thisCarAllPeizhiData})
                                }
                            })
                        }
                    })
                }
            })
        }
    })
});
//喜欢详情页视图
router.get("/likecar.html",function (req,res) {
    //获取用户名
    let userName = req.session.userName;
    //获取用户头像
    let userImg = req.session.userImg;
    let userId = req.session.userId;
    let userDingdanSql = `
    SELECT likebiao.Id,product.title,productrule.color,productrule.atmt,productrule.peizhi,productrule.price,productrule.pailiang
    FROM likebiao JOIN product ON likebiao.productId = product.Id JOIN productrule ON likebiao.peizhiId = productrule.Id
    WHERE likebiao.userId = ? and likebiao.State = 1 and likebiao.DelState = 1;
    `;
    db.DBOper(userDingdanSql,[userId],function (err,dingdanData) {
        if(err){
            console.log(err)
        }
        else {
            res.render("likecar",{userName:userName,userImg:userImg,dingdanData:dingdanData});
        }
    })
});
//地址详情页视图
router.get("/dizhi.html",function (req,res) {
    let userName = req.session.userName;
    let userImg = req.session.userImg;
    res.render("dizhi",{userName:userName,userImg:userImg});
});
//个人中心视图
router.get("/geren.html",function (req,res) {
    let userName = req.session.userName;
    let userImg = req.session.userImg;
    let userId = req.session.userId;
    let dingdanSql = `
    SELECT likebiao.Id,product.title,productrule.color,productrule.atmt,productrule.peizhi,productrule.price,productrule.pailiang,likebiao.CreateTime
FROM likebiao JOIN product ON likebiao.productId = product.Id JOIN productrule ON likebiao.peizhiId = productrule.Id
WHERE likebiao.userId = ? AND likebiao.State = 0 AND likebiao.dizhiId <> "";
    `;
    db.DBOper(dingdanSql,[userId],function (err,dingdanArr) {
        if(err){
            console.log(err)
        }
        else {
            let diZhiSql = "select * from diZhi where userId = ? and DelState = 1 ";
            db.DBOper(diZhiSql,[userId],function (err,dizhiArr) {
                if(err){
                    console.log(err)
                }
                else {
                    res.render("geren",{userName:userName,userImg:userImg,dingdanArr:dingdanArr,dizhiArr:dizhiArr});
                }
            })
        }
    })
});
//订单详情页视图
router.get("/dingDanXiangQing.html",function (req,res) {
    let userName = req.session.userName;
    let userImg = req.session.userImg;
    let userId = req.session.userId;
    let dingdanId = req.session.dingdanId;
    let dingdanDiZhiSql = "select * from likebiao where Id = ?";
    db.DBOper(dingdanDiZhiSql,[dingdanId],function (err,likeArr) {
        console.log(likeArr);
        if(err){
            console.log(err)
        }
        else {
            let dizhiSql = "select * from dizhi where Id = ?";
            db.DBOper(dizhiSql,[likeArr[0].dizhiId],function (err,dizhiArr) {
                console.log(dizhiArr);
                if(err){
                    console.log(err)
                }
                else {
                    let dingdanSql = `
           SELECT likebiao.Id,product.title,productrule.color,productrule.atmt,productrule.peizhi,productrule.price,productrule.pailiang,likebiao.CreateTime
           FROM likebiao JOIN product ON likebiao.productId = product.Id JOIN productrule ON likebiao.peizhiId = productrule.Id 
           WHERE likebiao.userId = ?
            `;
                    db.DBOper(dingdanSql,[userId],function (err,dingdanArr) {
                        if(err){
                            console.log(err)
                        }
                        else {
                            res.render("dingDanXiangQing",{userName:userName,userImg:userImg,dizhiArr:dizhiArr,dingdanArr:dingdanArr});
                        }
                    })
                }
            })
        }
    })
});

//查看订单详情
router.get("/dingdantianxie.html",function (req,res) {
    let userName = req.session.userName;
    let userImg = req.session.userImg;
    let userId = req.session.userId;
    let dingdanId = req.session.dingdanId;
    let dizhiSql = "select * from diZhi where userId = ?";
    db.DBOper(dizhiSql,[userId],function (err,dizhiArr) {
        if(err){
            console.log(err)
        }
        else {
            let dingdanSql = `
           SELECT likebiao.Id,product.title,productrule.color,productrule.atmt,productrule.peizhi,productrule.price,productrule.pailiang,likebiao.CreateTime
           FROM likebiao JOIN product ON likebiao.productId = product.Id JOIN productrule ON likebiao.peizhiId = productrule.Id 
           WHERE likebiao.userId = ? AND likebiao.State = 0 AND likebiao.dizhiId IS NULL 
            `;
            db.DBOper(dingdanSql,[userId],function (err,dingdanArr) {
                if(err){
                    console.log(err)
                }
                else {
                    res.render("dingdantianxie",{userName:userName,userImg:userImg,dizhiArr:dizhiArr,dingdanArr:dingdanArr});
                }
            })
        }
    })

});
module.exports =exports = router;