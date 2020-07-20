const Router = require('koa-router')
const router = new Router()
const mysql = require('mysql')
const fs = require("fs")
const e_mail = require('./maiier.js')

// 数据库设置
var settings = {
    host: '192.168.2.118',
    user: 'root',
    password: 'root',
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
          console.log(error)
        } else {
          resolve(results)
          console.log(results)
        }
      })
    })
  }
// 用户身份信息路由
router.post('/user', async(ctx,body) => {
	var one_per = ctx.request.body.data
    console.log(one_per)
    // 增加客户信息
    if(one_per.status == 1){
      console.log('6666')
      var sql_add = "insert into user(userId,password,mailbox) values('"+ one_per.userId +"','"+ one_per.password +"','"+ one_per.mailbox +"')"
      var results_add = await query(sql_add)
	  ctx.body = '插入成功'
      console.log('插入成功')
    }
    // //删除用户信息
    // if(one_per.status == 2){
    //   var one_per = ctx.request.query
    //   var sql_del = "delete from user where nickname='"+ one_per.nickname +"'"
    //   var results_del = await query(sql_del)
    //   console.log('删除成功')
    // }
    // 修改客户密码信息
    if(one_per.status == 3){
      var one_per = ctx.request.body.data
      var sql_reset = "update user set password='"+ one_per.password +"' where userId='"+ one_per.userId +"'"
      var results_reset = await query(sql_reset)
      console.log('修改成功')
	  ctx.body = '修改成功'
    }
    // 显示客户信息
	if(one_per.status == 4){
		var sql = "select * from user where userId = '" + one_per.userid + "'"
		var results = await query(sql)
		console.log('查询成功')
		ctx.body=results[0]
	}
})
  // 一个生成随机数的函数
  var aaa = function () {
    var Num = ''
    for (var i = 0; i < 6; i++) {
      Num += Math.floor(Math.random() * 10)
    }
    return Num
  }
  // 验证码路由
  router.post('/identify', async (ctx, body) => {
    var email = ctx.request.body.data.address // 刚刚从前台传过来的邮箱
	console.log(email)
    // var code = await tools.createSixNum(); //这里是我写的生成的随机六位数，等等下面给代码
    var date = new Date() // 获取当前时间
    var isLive = 'no'
    // 一个随机六位数
    var cur_code = await aaa()
    // 去数据库中找有没有该邮箱
    var status = ''
    var code = ''
    var to_mail = ''
    var data = {
      status,
      code,
      to_mail
    }
    var sql = "select * from user where mailbox='" + email + "'"
    const results = await query(sql)
    if (results.length == 0) {
      data.status = 0
    } else {
      data.status = 1
      data.code = cur_code
      data.to_mail = mail
    }
    ctx.body = data
    var mail = {
      // 发件人
      from: '<1121842729@qq.com>',
      // 主题
      subject: '接受凭证', // 邮箱主题
      // 收件人
      to: email, // 前台传过来的邮箱
      // 邮件内容，HTML格式
      text: '用' + cur_code + '作为你的验证码' // 发送验证码
    }
    // await e_mail(mail) // 发送邮件
  })
// 商品信息管理路由
router.post('/goodsInfoMana', async(ctx,body) => {
  // var one_per = ctx.request.body.data
   // 显示所有商品信息
    var sql_reset = "select * from productInformation"
    var results_reset = await query(sql_reset)
    console.log('查询成功')
    ctx.body=results_reset
    console.log(results_reset)
})
// // 收藏信息路由
// router.post('/collectInfo', async(ctx,body) => {
//   var one_per = ctx.request.query
//   console.log(one_per)
//   // 增加收藏信息
//   if(one_per.status == 1){
//     console.log('6666')
//     var sql_add = "insert into collecting(userId,productNumber) values('"+ one_per.userId +"','"+one_per.productNumber+"')"
//     var results_add = await query(sql_add)
//     console.log('收藏成功')
//   }
//   //取消收藏信息
//   if(one_per.status == 2){
//     var one_per = ctx.request.query
//     var sql_del = "delete from collecting where productNumber='"+ one_per.productNumber +"'"
//     var results_del = await query(sql_del)
//     console.log('取消收藏成功')
//   }
//   // 显示所有收藏信息
//   if(one_per.status == 3){
//     var one_per = ctx.request.query
//     var sql_reset = "select * from collecting"
//     var results_reset = await query(sql_reset)
//     console.log('收藏信息查询成功')
//     ctx.body=results_reset
//     console.log(results_reset)
//   }
// })
// // 购物车信息路由
// router.post('/shoppingCartMana', async(ctx,body) => {
//   var one_per = ctx.request.query
//   console.log(one_per)
//   // 增加购物车里的商品信息
//   if(one_per.status == 1){
//     console.log('6666')
//     var sql_add = "insert into shoppingCart(userId,productNumber,quantity) values('"+ one_per.userId +"','"+ one_per.productNumber +"','"+ one_per.quantity +"')"
//     var results_add = await query(sql_add)
//     console.log('插入成功')
//   }
//   //删除购物车单个商品信息
//   if(one_per.status == 2){
//     var one_per = ctx.request.query
//     var sql_del = "delete from shoppingCart where productNumber='"+ one_per.productNumber +"'&& userId='"+ one_per.userId +"'"
//     var results_del = await query(sql_del)
//     console.log('删除成功')
//   }
//   // 修改购物车单个商品得数量
//   if(one_per.status == 3){
//     var one_per = ctx.request.query
//     var sql_reset = "update shoppingCart set productNumber='"+ one_per.productNumber +"',quantity='"+ one_per.quantity +"'  where productNumber='"+ one_per.productNumber +"'"
//     var results_reset = await query(sql_reset)
//     console.log('修改成功')
//   }
//   // 查询所有购物车信息
//   if(one_per.status == 4){
//     var one_per = ctx.request.query
//     var sql_reset = "select * from shoppingCart"
//     var results_reset = await query(sql_reset)
//     console.log('查询成功')
//     ctx.body=results_reset
//     console.log(results_reset)
//   }
// })
// // 收货地址信息路由
// router.post('/receivingAddressMana', async(ctx,body) => {
//   var one_per = ctx.request.query
//   console.log(one_per)
//   // 查询客户所有得收货地址信息
//   if(one_per.status == 1){
//     var one_per = ctx.request.query
//     var sql_reset = "select * from receivingAddress where userId='"+ one_per.userId +"'"
//     var results_reset = await query(sql_reset)
//     console.log('查询客户收货地址信息成功')
//     ctx.body=results_reset
//     console.log(results_reset)
//   }
//   // 查询客户默认收货地址信息
//   if(one_per.status == 2){
//     var one_per = ctx.request.query
//     var sql_reset = "select * from receivingAddress where userId='"+ one_per.userId +"'&& whetherDefault='"+one_per.whetherDefault+"'"
//     var results_reset = await query(sql_reset)
//     console.log('查询客户默认收货地址信息成功')
//     ctx.body=results_reset
//     console.log(results_reset)
//   }
//   // 查询所有客户得默认收货地址信息
//   if(one_per.status == 3){
//     var one_per = ctx.request.query
//     var sql_reset = "select * from receivingAddress where whetherDefault='"+one_per.whetherDefault+"'"
//     var results_reset = await query(sql_reset)
//     console.log('查询所有客户收货地址信息成功')
//     ctx.body=results_reset
//     console.log(results_reset)
//   }
// })
// // 客户订单信息路由
// router.post('/orderFormMana', async(ctx,body) => {
//   var one_per = ctx.request.query
//   console.log(one_per)
//   // 插入客户订单信息
//   if(one_per.flag == 1){
//     console.log('6666')
//     var sql_add = "insert into orderForm(orderNumber,userId,productNumber,generationTime,totalPrice,status) values('"+ one_per.orderNumber +"','"+ one_per.userId +"','"+ one_per.productNumber +"','"+ one_per.generationTime +"','"+ one_per.totalPrice +"','"+ one_per.status +"')"
//     var results_add = await query(sql_add)
//     console.log('插入成功')
//   }
//   // 查询客户所有订单信息
//   if(one_per.flag == 2){
//     var one_per = ctx.request.query
//     var sql_reset = "select * from orderForm where userId='"+ one_per.userId +"'&& status='"+one_per.status+"'"
//     var results_reset = await query(sql_reset)
//     console.log('查询客户收货地址信息成功')
//     ctx.body=results_reset
//     console.log(results_reset)
//   }
//   // 修改客户订单信息
//   if(one_per.flag == 3){
//     var one_per = ctx.request.query
//     var sql_reset = "update orderForm set userId='"+ one_per.userId +"',productNumber='"+ one_per.productNumber +"',generationTime='"+ one_per.generationTime +"',totalPrice='"+ one_per.totalPrice +"',status='"+ one_per.status +"' where orderNumber='"+ one_per.orderNumber +"'"
//     var results_reset = await query(sql_reset)
//     console.log(' 修改客户所有不同状态得订单信息成功')
//     ctx.body=results_reset
//     console.log(results_reset)
//   }  
// })
// // 用户评价信息路由
// router.post('/evaluationMana', async(ctx,body) => {
//   var one_per = ctx.request.query
//   console.log(one_per)
//   // 增加客户评价信息
//   if(one_per.status == 1){
//     console.log('6666')
//     var sql_add = "insert into evaluation(userId,productNumber,content,evaluationTime) values('"+ one_per.userId +"','"+ one_per.productNumber +"','"+ one_per.content +"','"+ one_per.evaluationTime +"')"
//     var results_add = await query(sql_add)
//     console.log('插入成功')
//   }
//   //删除用户评价信息
//   if(one_per.status == 2){
//     var one_per = ctx.request.query
//     var sql_del = "delete from evaluation where userId='"+ one_per.userId +"'&&productNumber='"+ one_per.productNumber +"'"
//     var results_del = await query(sql_del)
//     console.log('删除成功')
//   }
//   // 显示当前商品所有评价信息
//   if(one_per.status == 3){
//     var one_per = ctx.request.query
//     var sql_reset = "select * from evaluation where productNumber='"+ one_per.productNumber +"'"
//     var results_reset = await query(sql_reset)
//     console.log('查询成功')
//     ctx.body=results_reset
//     console.log(results_reset)
//   }
//   // 显示客户所有评价信息
//   if(one_per.status == 4){
//     var one_per = ctx.request.query
//     var sql_reset = "select * from evaluation where userId='"+ one_per.userId +"'"
//     var results_reset = await query(sql_reset)
//     console.log('查询成功')
//     ctx.body=results_reset
//     console.log(results_reset)
//   }
// })
module.exports = router