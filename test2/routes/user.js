const express=require('express');
const pool=require('./pool.js');
var router=express.Router();
//login
router.get('/login/:uname&:upwd',(req,res)=>{
  var obj=req.praams;
  for(var key in obj){
    if(!obj[key]){
      res.send({code:401,msg:key+' '+'required'});
      return;
    };
  };
  pool.query('select uname,upwd from xz_user where uname=? and upwd=?',[obj.uname,obj.upwd],(err,result)=>{
    if(err)throw err;
    if(result.length>0){
      res.send({code:200,msg:'login suc'});
      return;
    }else {
      res.send({code:401,msg:'uname or upwd err'});
      return;
    };
  });
})
//reg
router.post('/reg',(req,res)=>{
  var obj=req.body;
  for(var key in obj){
    if(!obj[key]){
      res.send({code:401,msg:key+' '+'required'});
      return;
    };
  };
  pool.query('insert into xz_user set ?',[obj],(err,result)=>{
    if(err)throw err;
    if(result.affectedRows>0){
      res.send({code:200,msg:'reg suc'});
      return;
    }else{
      res.send({code:401,msg:'reg err'});
      return;
    };
  });
});
//检索
router.get('/detail',(req,res)=>{
  if(!req.query.uid){
    res.send({code:401,msg:'uid required'});
    return;
  };
  pool.query('select * from xz_user where uid=?',[req.query.uid],(err,result)=>{
    if(err)throw err;
    res.send(result);
  });
});
//update
router.post('/update',(req,res)=>{
  var obj=req.body;
  for(var key in obj){
    if(!obj[key]){
      res.send({code:401,msg:key+' '+'required'});
      return;
    };
  };
  var uid=obj.uid;
  delete obj.uid;
  pool.query('update xz_user set ? where uid=?',[obj,uid],(err,result)=>{
    if(err)throw err;
    if(result.affectedRows>0){
      res.send({code:200,msg:'update suc'});
      return;
    }else{
      res.send({code:401,msg:'update err'});
      return;
    };
  });
});
//查询分页
router.get('/list',(req,res)=>{
  var obj=req.query;
  var count=obj.count;
  var pno=obj.pno;
if(!count){
  count=2;
};
if(!pno){
  pno=1;
};
  count=parseInt(count);
  pno=parseInt(pno);
  var start=(pno-1)*count;
  pool.query('select * from xz_user limit ?,?',[start,count],(err,result)=>{
    if(err)throw err;
    res.send(result);
  });
});
//delete
router.get('/delete',(req,res)=>{
  var uid=req.query.uid;
  if(!uid){
    res.send({code:401,msg:'uid required'});
    return;
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
