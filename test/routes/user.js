const express=require('express');
const pool=require('./pool.js');
var router=express.Router();
//登录路由
router.post('/login',(req,res)=>{
  var obj=req.body
  uname=obj.uname;
  upwd=obj.upwd;
  for(var key in obj){
    if(!obj[key]){
      res.send({code:401,msg:obj[key]+'required'});
      return;
    };
  };
  pool.query('select uname,upwd from xz_user where uname=?and upwd=?'
  ,[uname,upwd],(err,result)=>{
    if(err)throw err;
    if(result.length>0){
      res.send({code:200,msg:'login suc'});
      return;
    }else {  res.send({code:402,msg:'uname or upwd err'});
    return;
  };
  });
});
//注册路由
router.post('/reg',(req,res)=>{
  var obj=req.body;
  for(var key in obj){
    if(!obj[key]){
      res.send({code:401,msg:obj[key]+' required'});
      return;
    };
  };
  pool.query('insert into xz_user set ?',[obj],(err,result)=>{
    if(err)throw err;
    if(result.affectedRows>0){
      res.send({code:200,msg:'reg suc'});
      return;
    };
  });
});
//检索路由
router.get('/detail',(req,res)=>{
  var obj=req.query;
    if(!obj.uid){
      res.send({code:401,msg:'uid required'});
      return;
    };
    pool.query('select * from xz_user where uid=?',[obj.uid],
    (err,result)=>{
      if(err)throw err;
      res.send(result);
    });
});
//修改用户
router.post('/update',(req,res)=>{
  var obj=req.body;
  var i=400;
  for(var key in obj){
    if(!obj[key]){
      i++;
      res.send({code:i,msg:obj[key]+' required'});
      return;
    };
  };
  var uid=obj.uid;
  delete obj.uid;
  pool.query('update  xz_user set ? where uid=?',[obj,uid],(err,result)=>{
    if(err)throw err;
    if(result.affectedRows>0){
      res.send({code:200,msg:'update suc'});
    }else {res.send({code:401,msg:'update err' });
    }
  });
});
//用户列表  分页
router.get('/list',(req,res)=>{
  var obj=req.query;
  var count=obj.count;
  var pno=obj.pno;
  if(!count){
    count=2;
  }
  if(!pno){
    pno=1;
  }
  count=parseInt(count);
  pno=parseInt(pno);
  var start=(pno-1)*count;
  pool.query('select * from xz_user limit ?,?',[start,count],(err,result)=>
  {
    if(err)throw err;
    res.send(result);
  });
});
//删除
router.get('/delete',(req,res)=>{
  var uid=req.query.uid;
  if(!uid){
      res.send({code:401,msg:'uid required'});
  };
  pool.query('delete from xz_user where uid=?',[uid],(err,result)=>{
    if(err)throw err;
    if(result.affectedRows>0){
      res.send({code:200,msg:'delete suc'});
    }else {
      res.send({code:401,msg:'delete err'});
    };
  });
});
module.exports=router;