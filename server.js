// 引入express库及mongoose库和body-parser处理的库
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
// 引入模块model进行数据库操作
var User = require("./back/models/user"),
    Location = require("./back/models/locations");


//连接数据库
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://127.0.0.1:27017/myDataBase", {userMongoClient: true})
    .then(function (db) {
        console.log("连接数据库成功！");
    });

//实例化express
var app = express();

// 预处理前端的请求数据及表单提交数据
app.use(express.static('assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.post("/register", function (req, res) {
    var {username, password, phonenum, emailaddr} = req.body,
        userId = new Date().getTime();
    User.find({phonenum}, function (err, doc) {
        if (doc.length == 0) {
            var user = new User({username, password, phonenum, emailaddr, userId});
            user.save(function (e, doc) {
                if (!err) {
                    res.json({
                        code: 0,
                        msg: "注册成功"
                    });
                    return
                }
                res.json({
                    code: 1,
                    msg: "注册失败"
                })
            })
        } else {
            res.json({
                code: -1,
                msg: "账户已存在"
            })
        }
    })
})

app.post("/login", function (req, res) {
    var {username, pwd} = req.body;
    User.find({phonenum: username}, function (err, doc) {
        if (doc.length != 0) {
            if (doc[0].password === pwd) {
                res.json({
                    code: 0,
                    msg: "登录成功",
                    data: doc[0]
                });
                return
            } else {
                res.json({
                    code: -1,
                    msg: "密码错误"
                });
                return
            }
        }
        res.json({
            code: 1,
            msg: "账号不存在"
        })
    })
});
app.post("/addLocation", function (req, res) {
    var {userId,locationId,name,addr,phonenum,isDefault}=req.body,
        location = new Location({userId, locationId, name, addr, phonenum, isDefault:false});
    location.save(function (err, doc) {
        if (!err)
            res.json({
                code: 0,
                msg: '添加成功'
            });
        else
            res.json({
                code: -1,
                msg: '添加失败'
            });
    })
})
app.post("/queryAddr",function (req,res) {
    Location.find({isDefault:true},function (err,doc) {
        if(!err){
            let def;
            if (doc.length>0){
                doc.forEach(function (value,index) {
                    if(value.isDefault){
                        def=value;
                    }
                });
                res.json({code:0,msg:'查询成功',data:doc,def});
            }
            else
                res.json({code:-1,msg:'查询为空'});

        }
    })
});
app.post("/deleteAddr",function (req,res) {
    let locationId=Number(req.body.locationId);
    Location.remove({locationId},function (err,doc) {
        if (err) {
           res.json({code:-1,data:err})
        } else {
            res.json({code:0,data:doc})
        }
    })
})
app.post("/updateAddr",function (req,res) {
    let locationId=Number(req.body.locationId),
        userId=Number(req.body.userId),
        {addr,name,phonenum}=req.body;
    Location.update({locationId},{locationId,userId,addr,name,phonenum,isDefault:false},function (err) {
        if(!err){
            res.json({code:0,msg:'修改成功'})
        }else{
            res.json({code:-1,msg:'修改失败',data:err})
        }
    })
});

app.post('/updateDefult',function (req,res) {
    let id=req.body.locationId;
    Location.find({isDefault:true},function (err,doc) {
        if(doc.length!==0){
            let {phonenum,addr,locationId,userId,name}=doc[0];
            Location.update({isDefault:true},{phonenum,addr,locationId,userId,name,isDefault:false},function (err,doc) {
                if(!err){
                    Location.find({locationId:id},function (err,doc) {
                        if(!err){
                            let {phonenum,addr,locationId,userId,name}=doc[0];
                            Location.update({locationId},{phonenum,addr,locationId,userId,name,isDefault:true},function (err,doc) {
                                if(!err){
                                    res.json({code:0,msg:'更新成功'})
                                }else
                                    res.json({code:-1,msg:'更新失败'})
                            })
                        }
                    })
                }
            })
        }else{
            Location.find({locationId:id},function (err,doc) {
                if(!err){
                    let {phonenum,addr,locationId,userId,name}=doc[0];
                    Location.update({locationId},{phonenum,addr,locationId,userId,name,isDefault:true},function (err,doc) {
                        if(!err){
                            res.json({code:0,msg:'更新成功'})
                        }else
                            res.json({code:-1,msg:'更新失败'})
                    })
                }
            })
        }
    })
})
// 连接服务器

app.listen(8080, function () {
    console.log("连接服务器成功！");
})