/**
 * Created by LuxonD on 2020/4/28.
 */
const  myexpress = require("express");
const router = myexpress.Router();
const db = require("./sqlConfig");
//登录
router.post("/login.do",function (req,res) {
    var user = req.body.userName;
    var pwd = req.body.userPwd;
    let sql = "select * from userlist where UserName = ? and Pwd = ? and DelState = 1";
    db.DBOper(sql,[user,pwd],function (err,data) {
        let obj = {};
        if(err){
            obj.code = -1;
            obj.message = "OMG";
        }
        else {
            if(data.length>0){
                let state = data[0].State;
                if(state == 1){
                    console.log(data[0]);
                    req.session.userName = data[0].UserName;
                    req.session.userImg = data[0].HeadImage;
                    req.session.userId = data[0].Id;
                    obj.code = 1;
                    obj.message = "登陆成功";
                }
                else {
                    obj.code = 3;
                    obj.message = "账户冻结";
                }
            }
            else {
                obj.code = 2;
                obj.message = "用户名密码出错";
            }
        }
        res.send(obj);
    })
});
//获取商品详情
router.post("/xiangqing.do",function (req,res) {
    let theCar = req.body.carId;
    var obj ={};
    obj.code = 1;
    req.session.carId = theCar;
    res.send(obj)
});
//注册
router.post("/reg.do",function (req,res) {
    var userName = req.body.regName;
    var userEmail = req.body.regEmail;
    var userPwd = req.body.regPwd;
    let sql = `insert into userlist values(null,?,?,'img/head/moren.png',?,null,default,1,1)`;
    db.DBOper(sql,[userName,userPwd,userEmail],function (err,data) {
        let obj={};
        if(err){
            obj.code = -1;
            obj.message = "OMG"
        }
        else {
            if(data.affectedRows>0){
                obj.code = 1;
                obj.message = "注册成功"
            }
            else{
                obj.code = 2;
                obj.message = "注册失败"
            }
        }
        res.send(obj);
    })
});
//获取车型配置
router.post("/getCarPeiZhi.do",function (req,res) {
    var color = req.body.color;
    var peizhi = req.body.peizhi;
    var carId = req.session.carId;
    let sql = "select * from productrule where productId = ? and color = ? and peizhi = ?";
    db.DBOper(sql,[carId,color,peizhi],function (err,data) {
        if(err){
            console.log(err)
        }
        else {
            res.send(data)
        }
    })
});
//添加到订单
router.post("/adddingdan.do",function (req,res) {
    let userName = req.session.userName;
    let obj={};
    if(!userName){
        obj.code = -1;
        res.send(obj)
    }
    else{
        let userIdSql = "select * from userlist where UserName = ?";
        db.DBOper(userIdSql,[userName],function (err,userXingxi) {
            if(err){
                obj.code = -2;
                console.log(err);
                res.send(obj)
            }
            else{
                let carId = req.body.carId;
                let color = req.body.color;
                let peizhi = req.body.peizhi;
                let carPeizhiSql = "select * from ProductRule where productId = ? and color = ? and peizhi = ?";
                db.DBOper(carPeizhiSql,[carId,color,peizhi],function (err,thisCarGuige) {
                    if(err){
                        obj.code = -2;
                        console.log(err);
                        res.send(obj);
                    }
                    else{
                        let theUser = userXingxi[0].Id;
                        let thePeizhi = thisCarGuige[0].Id;
                        let addDingdanSql = "insert into likebiao values(null,?,?,?,default,default,default,null)";
                        db.DBOper(addDingdanSql,[theUser,carId,thePeizhi],function (err,data) {
                            if(err){
                                obj.code = -2;
                                console.log(err);
                                res.send(obj);
                            }
                            else{
                                obj.code = 1;
                                res.send(obj);
                            }
                        })
                    }
                })
            }
        })
    }
});
//用户退出
router.get("/tuichu.do",function (req,res) {
    req.session.destroy();
    res.send(`<script>location.href = "index.html";</script>`)
});
//生成订单
router.post("/gouMaiChe.do",function (req,res) {
    let dingId = req.body.dingDanIdArr;
    console.log(dingId);
    if(dingId instanceof Array){
        const mypromise = new Promise(function(resolve, reject) {
            let obj = {};
            for(let i = 0 ;i<dingId.length;i++){
                let sql = "UPDATE likebiao SET State = 0 WHERE Id = ?";
                let theId = Number(dingId[i]);
                db.DBOper(sql,[theId],function (err,data) {
                    if(err){
                        console.log(err);
                        obj.code = -1
                    }
                    else {
                        obj.code = 1;
                        if(i == (dingId.length-1)){
                            resolve(obj);
                        }
                    }
                })
            }

        });
        mypromise.then(function(obj) {
            res.send("OK")
        });
    }
    else {
        let sql = "UPDATE likebiao SET State = 0 WHERE Id = ?";
        db.DBOper(sql,[dingId],function (err,data) {
            if(err){
                console.log(err);
                obj.code = -1
            }
            else {
                res.send("OK")
            }
        })
    }
});
//删除订单
router.post("/dingDanDel.do",function (req,res) {
    let dingId = req.body.dingDanIdArr;
    if(dingId instanceof Array){
        const mypromise = new Promise(function(resolve, reject) {
            let obj = {};
            for(let i = 0 ;i<dingId.length;i++){
                let sql = "UPDATE likebiao SET DelState = 0 WHERE Id = ?";
                let theId = Number(dingId[i]);
                db.DBOper(sql,[theId],function (err,data) {
                    if(err){
                        console.log(err);
                        obj.code = -1
                    }
                    else {
                        obj.code = 1
                    }
                })
            }
            resolve(obj);
        });
        mypromise.then(function(obj) {
            res.send("OK")
        });
    }
    else {
        let sql = "UPDATE likebiao SET DelState = 0 WHERE Id = ?";
        db.DBOper(sql,[dingId],function (err,data) {
            if(err){
                console.log(err);
                obj.code = -1
            }
            else {
                res.send("OK")
            }
        })
    }
});
//下单
router.post("/xiadan.do",function (req,res) {
    let dizhiId = req.body.dizhiId;
    let dingdanIdArr = req.body.dingdanIdArr;
    if(dingdanIdArr instanceof Array){
        const mypromise = new Promise(function(resolve, reject) {
            for(let i = 0 ;i<dingdanIdArr.length;i++){
                let sql = "UPDATE likebiao SET dizhiId = ? WHERE Id = ?";
                let theId = Number(dingdanIdArr[i]);
                db.DBOper(sql,[dizhiId,theId],function (err,data) {
                    if(err){
                        console.log(err);
                    }
                    else {

                    }
                })
            }
            resolve("OK");
        });
        mypromise.then(function(data) {
            res.send(data)
        });
    }
    else {
        const mypromise = new Promise(function(resolve, reject) {
                let sql = "UPDATE likebiao SET dizhiId = ? WHERE Id = ?";
                db.DBOper(sql,[dizhiId,dingdanIdArr],function (err,data) {
                    if(err){
                        console.log(err);
                    }
                    else {

                    }
                });
            resolve("OK");
        });
        mypromise.then(function(data) {
            res.send(data)
        });
    }
});
//添加收货地址
router.post("/dizhiAdd.do",function (req,res) {
    let userId = req.session.userId;
    let hao = {};
    if(!userId){
        hao.code = 10;
        res.send(hao);
    }
    else {
        let guo = req.body.guo;
        let shen = req.body.shen;
        let chen = req.body.chen;
        let qu = req.body.qu;
        let jie = req.body.jie;
        let shouhuoren = req.body.shouhuoren;
        let dianhua = req.body.dianhua;
        let sql = "insert into diZhi values(null,?,?,?,?,?,?,?,?,1,1)";
        db.DBOper(sql,[userId,guo,shen,chen,qu,jie,shouhuoren,dianhua],function (err,data) {
            if(err){
                hao.code = 2;
                console.log(err);
                res.send(hao)
            }
            else {
                hao.code = 1;
                res.send(hao)
            }
        })
    }
});
//删除收货地址
router.post("/dizhiDel.do",function (req,res) {
    let dizhiId = req.body.dizhiId;
    let deldizhiSql = "UPDATE dizhi SET DelState = 0 WHERE Id = ?";
    db.DBOper(deldizhiSql,[dizhiId],function (err,data) {
        if(err){
            console.log(err)
        }
        else {
            res.send("OK")
        }
    })
});
//上传当前订单订单号
router.post("/dingdanxiang.do",function (req,res) {
    let dingdanId = req.body.dingdanId;
    req.session.dingdanId = dingdanId;
    res.send("OK")
});
module.exports =exports = router;