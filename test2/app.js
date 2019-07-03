const express=require('express');
const userRouter=require('./routes/user.js');
const bodyParse=require('body-parser');
var app=express();
app.listen(8080);
console.log('服务器开启');
app.use(bodyParse.urlencoded({
  extended:false  //不使用拓展的（第三方）
}));
app.use(express.static('./public'));
app.use('/user',userRouter);//每天起床拉一下！！！
