var express=require('express');
var mongo=require(path+"/models/db.js");
var sessionuser=0;
var login_name=null;
module.exports = function(app) {
  app.get('/', function (req, res) {
    res.render('index', { title: '主页' });
  });
  app.get("/w",function(req,res,next){
      mongo.blogs.find({},function(err,data){
        if(err){
          return res.send({
            status: 0,
            info: "失败"
          })
        }
        return res.send({
          status: 1,
          data: data
        })
      })
  })
  app.post('/',function (req,res,next) {
    var blogname=req.body.blog_title;
    var blog_content=req.body.blog_content;
    mongo.blogs.findOne({"blogname":blogname},function (err,blog) {
      if (err){
        return res.send({
          success:0,
          info:"上传失败"
        })
      }
      if(blog){
        return res.send({
          success:1,
          info:"重复标题名,请更改"
        })
      }else{
        mongo.blogs.create({
          blogname:blogname,
          blog_content:blog_content
        })
      }
      return res.send({
        success:1,
        info:"上传成功",
        allBlog:blog
      })
    })
  })
  app.get('/reg', function (req, res) {
    if (sessionuser==1){
      res.render('logout',{title: '退出登录',login_name:login_name})
    }else{
      res.render('reg', { title: '注册' });
    }
    res.render('reg', { title: '注册' });
  });
  app.post('/reg', function (req,res,next) {
    var username=req.body.username;
    var password=req.body.password;
    var email=req.body.email;
    mongo.users.findOne({"username":username},function (err,user) {
      if (err){
        return res.send({
          success:0,
          info:"注册失败,请重新注册"
        })
      }
      if (user){
        return res.send({
          success:0,
          info:"有重名"
        })
      }else{
        mongo.users.create({
          username:username,
          password:password,
          email:email
        },function (err,data) {
          if (err){
            return res.send({
              success:0,
              info:"注册失败,请重新注册"
            })
          }
          return res.send({
            success:1,
            info:"注册成功"
          })
        })
      }
    })
  });
  app.get('/login', function (req, res) {
    if (sessionuser==1){
      res.render('logout',{title: '退出登录',login_name:login_name})
    }else{
      res.render('login',{title: '登录'})
    }s
  });
  app.post('/login', function (req,res,next) {
      var username=req.body.username;
      var password=req.body.password;
      mongo.users.findOne({"username":username},function (err,user) {
        if (err){
          return res.send({
            success:0,
            info:"登录失败,请重新登录"
          })
        }
        if(user){
          if (password==user.password){
            sessionuser = 1;
            login_name=username;
            return res.send({
              success:1,
              info:"登录成功"
            })
          }else{
            return res.send({
              success:0,
              info:"密码错误"
            })
          }
        }
      })
  });
  app.get('/post', function (req, res) {
    res.render('post', { title: '发表' });
  });
  app.post('/post', function (req, res) {
  });
  app.get('/logout', function (req, res) {
      if (login_name==null){
        res.render('login',{title: '登录'})
      }else{
        console.log('a')
        res.render('logout',{title: '退出登录',login_name:login_name})
      }
  });
  app.get('/logoutuser', function (req,res,next) {
    login_name=null;
    console.log(login_name);
    sessionuser=0;
    return res.send({
      success:1
    });
    // res.render('login',{title: '登录',login_name:login_name});
  });
};