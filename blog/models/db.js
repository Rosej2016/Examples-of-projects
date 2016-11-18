 var mongoose=require("mongoose");
 mongoose.connect("mongodb://127.0.0.1/blogdb");

 var userSchema=new mongoose.Schema({
     username:String,
     password:String,
     email:String,

 });
 var blogSchema=new mongoose.Schema({
     blogname:String,
     blog_content:String
 })
 module.exports={
     users:mongoose.model("users",userSchema,"users"),
     blogs:mongoose.model("blogs",blogSchema,"blogs"),
 }