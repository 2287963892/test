const express=require('express');
const bodyParse=require('body-parser');
const userRouter=require('./routes/user');
var app=express();
app.listen(8080);
console.log('服务器开启');
app.use(express.static('./public'));
app.use(bodyParse.urlencoded({
  extended:false
}));
app.use('/user',userRouter);