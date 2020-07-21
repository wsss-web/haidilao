const Router = require('koa-router')
const router = new Router()
const mysql = require('mysql')
const fs = require("fs")

//测试路由
// 

// 数据库设置
var settings = {
    host: '192.168.2.133',
    user: 'root',
    password: '123456',
    database: 'haidilao'
  }
  var connection = mysql.createConnection(settings)
  // 建立数据库连接
  connection.connect()
  const query = function (sql) {
    return new Promise((resolve, reject) => {
      connection.query(sql, function (error, results) {
        if (error) {
          reject(error)
        } else {
          resolve(results)
        }
      })
    })
  }
  // 增加商品信息路由
router.get('/addGoods', async (ctx, body) => {
    var one_per = ctx.request.query
  console.log(one_per)
  })
// 用户身份信息修改路由(管理系统)
router.get('/resetuserinfo', async(ctx,body) => {
    var one_per = ctx.request.query
    console.log(one_per)
    // 增加客户信息
    if(one_per.status == 1){
      console.log('6666')
      var sql_add = "insert into user_info(stu_id,name,username,phone,nickname,sex,address,sch_id,major_id,classname,grade,education,home_address,plan) values('"+ one_per.stu_id +"','"+ one_per.name +"','"+ one_per.username +"','"+ one_per.phone +"','"+ one_per.nickname +"','"+ one_per.sex +"','"+ one_per.address +"','"+ one_per.sch_id +"','"+ one_per.major_id +"','"+ one_per.classname +"','"+ one_per.grade +"','"+ one_per.education +"','"+ one_per.home_address +"','"+ one_per.plan +"')"
      var results_add = await query(sql_add)
      console.log('插入成功')
    }
    // 删除客户信息
    if(one_per.status == 2){
      var one_per = ctx.request.query
      var sql_del = "delete from user_info where username='"+ one_per.username +"'"
      var results_del = await query(sql_del)
      console.log('删除成功')
    }
    // 修改客户信息
    if(one_per.status == 3){
      var one_per = ctx.request.query
      var sql_reset = "update user_info set name='"+ one_per.name +"',phone='"+ one_per.phone +"',nickname='"+ one_per.nickname +"',sex='"+ one_per.sex +"',address='"+ one_per.address +"',sch_id='"+ one_per.sch_id +"',major_id='"+ one_per.major_id +"',classname='"+ one_per.classname +"',grade='"+ one_per.grade +"',education='"+ one_per.education +"',home_address='"+ one_per.home_address +"',plan='"+ one_per.plan +"'where username='"+ one_per.username +"'"
      var results_reset = await query(sql_reset)
      console.log('修改成功')
    }
  })
  
module.exports = router