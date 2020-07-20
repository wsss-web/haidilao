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
          console.log(error)
        } else {
          resolve(results)
          console.log(results)
        }
      })
    })
  }

// 用户身份信息路由
router.post('/userInfo', async(ctx,body) => {
    var one_per = ctx.request.query
    console.log(one_per)
    // 增加客户信息
    if(one_per.status == 1){
      console.log('6666')
      var sql_add = "insert into user(userId,password,telnumber,nickname,avatar,mailbox) values('"+ one_per.userId +"','"+ one_per.password +"','"+ one_per.telnumber +"','"+ one_per.nickname +"','"+ one_per.avatar +"','"+ one_per.mailbox +"')"
      var results_add = await query(sql_add)
      console.log('插入成功')
    }
    //删除用户信息
    if(one_per.status == 2){
      var one_per = ctx.request.query
      var sql_del = "delete from user where nickname='"+ one_per.nickname +"'"
      var results_del = await query(sql_del)
      console.log('删除成功')
    }
    // 修改客户信息
    if(one_per.status == 3){
      var one_per = ctx.request.query
      var sql_reset = "update user set nickname='"+ one_per.nickname +"',password='"+ one_per.password +"',telnumber='"+ one_per.telnumber +"',nickname='"+ one_per.nickname +"',avatar='"+ one_per.avatar +"',mailbox='"+ one_per.mailbox +"' where userId='"+ one_per.userId +"'"
      var results_reset = await query(sql_reset)
      console.log('修改成功')
    }
    // 显示所有客户信息
    if(one_per.status == 4){
      var one_per = ctx.request.query
      var sql_reset = "select * from user"
      var results_reset = await query(sql_reset)
      console.log('查询成功')
      ctx.body=results_reset
      console.log(results_reset)
    }
  })
// 商品信息管理路由
router.post('/goodsInfoMana', async(ctx,body) => {
  var one_per = ctx.request.query
  console.log(one_per)
  // 增加商品信息
  if(one_per.status == 1){
    console.log('6666')
    var sql_add = "insert into productInformation(productNumber,productName,price,category,stocks,productPicture,description) values('"+ one_per.productNumber +"','"+ one_per.productName +"','"+ one_per.price +"','"+ one_per.category +"','"+ one_per.stocks +"','"+ one_per.productPicture +"','"+ one_per.description +"')"
    var results_add = await query(sql_add)
    console.log('插入商品信息成功')
  }
  // 删除商品信息
  if(one_per.status == 2){
    var one_per = ctx.request.query
    var sql_del = "delete from productInformation where productNumber='"+ one_per.productNumber +"'"
    var results_del = await query(sql_del)
    console.log('删除商品信息成功')
  }
  // 修改商品信息
  if(one_per.status == 3){
    var one_per = ctx.request.query
    var sql_reset = "update productInformation set productName='"+ one_per.productName +"',price='"+ one_per.price +"',category='"+ one_per.category +"',stocks='"+ one_per.stocks +"',productPicture='"+ one_per.productPicture +"',description='"+ one_per.description +"' where productNumber='"+ one_per.productNumber +"'"
    var results_reset = await query(sql_reset)
    console.log('修改商品信息成功')
  }
   // 显示所有商品信息
   if(one_per.status == 4){
    var one_per = ctx.request.query
    var sql_reset = "select * from productInformation"
    var results_reset = await query(sql_reset)
    console.log('查询成功')
    ctx.body=results_reset
    console.log(results_reset)
  }
})
// 收藏信息路由
router.post('/collectInfo', async(ctx,body) => {
  var one_per = ctx.request.query
  console.log(one_per)
  // 增加收藏信息
  if(one_per.status == 1){
    console.log('6666')
    var sql_add = "insert into collecting(userId,productNumber) values('"+ one_per.userId +"','"+one_per.productNumber+"')"
    var results_add = await query(sql_add)
    console.log('收藏成功')
  }
  //取消收藏信息
  if(one_per.status == 2){
    var one_per = ctx.request.query
    var sql_del = "delete from collecting where productNumber='"+ one_per.productNumber +"'"
    var results_del = await query(sql_del)
    console.log('取消收藏成功')
  }
  // 显示所有收藏信息
  if(one_per.status == 3){
    var one_per = ctx.request.query
    var sql_reset = "select * from collecting"
    var results_reset = await query(sql_reset)
    console.log('收藏信息查询成功')
    ctx.body=results_reset
    console.log(results_reset)
  }
})
// 购物车信息路由
router.post('/shoppingCartMana', async(ctx,body) => {
  var one_per = ctx.request.query
  console.log(one_per)
  // 增加购物车里的商品信息
  if(one_per.status == 1){
    console.log('6666')
    var sql_add = "insert into shoppingCart(userId,productNumber,quantity) values('"+ one_per.userId +"','"+ one_per.productNumber +"','"+ one_per.quantity +"')"
    var results_add = await query(sql_add)
    console.log('插入成功')
  }
  //删除购物车单个商品信息
  if(one_per.status == 2){
    var one_per = ctx.request.query
    var sql_del = "delete from shoppingCart where productNumber='"+ one_per.productNumber +"'&& userId='"+ one_per.userId +"'"
    var results_del = await query(sql_del)
    console.log('删除成功')
  }
  // 修改购物车单个商品得数量
  if(one_per.status == 3){
    var one_per = ctx.request.query
    var sql_reset = "update shoppingCart set productNumber='"+ one_per.productNumber +"',quantity='"+ one_per.quantity +"'  where productNumber='"+ one_per.productNumber +"'"
    var results_reset = await query(sql_reset)
    console.log('修改成功')
  }
  // 查询所有购物车信息
  if(one_per.status == 4){
    var one_per = ctx.request.query
    var sql_reset = "select * from shoppingCart"
    var results_reset = await query(sql_reset)
    console.log('查询成功')
    ctx.body=results_reset
    console.log(results_reset)
  }
})
// 收货地址信息路由
router.post('/receivingAddressMana', async(ctx,body) => {
  var one_per = ctx.request.query
  console.log(one_per)
  // 查询客户所有得收货地址信息
  if(one_per.status == 1){
    var one_per = ctx.request.query
    var sql_reset = "select * from receivingAddress where userId='"+ one_per.userId +"'"
    var results_reset = await query(sql_reset)
    console.log('查询客户收货地址信息成功')
    ctx.body=results_reset
    console.log(results_reset)
  }
  // 查询客户默认收货地址信息
  if(one_per.status == 2){
    var one_per = ctx.request.query
    var sql_reset = "select * from receivingAddress where userId='"+ one_per.userId +"'&& whetherDefault='"+one_per.whetherDefault+"'"
    var results_reset = await query(sql_reset)
    console.log('查询客户默认收货地址信息成功')
    ctx.body=results_reset
    console.log(results_reset)
  }
  // 查询所有客户得默认收货地址信息
  if(one_per.status == 3){
    var one_per = ctx.request.query
    var sql_reset = "select * from receivingAddress where whetherDefault='"+one_per.whetherDefault+"'"
    var results_reset = await query(sql_reset)
    console.log('查询所有客户收货地址信息成功')
    ctx.body=results_reset
    console.log(results_reset)
  }
})
// 客户订单信息路由
router.post('/orderFormMana', async(ctx,body) => {
  var one_per = ctx.request.query
  console.log(one_per)
  // 插入客户订单信息
  if(one_per.flag == 1){
    console.log('6666')
    var sql_add = "insert into orderForm(orderNumber,userId,productNumber,generationTime,totalPrice,status) values('"+ one_per.orderNumber +"','"+ one_per.userId +"','"+ one_per.productNumber +"','"+ one_per.generationTime +"','"+ one_per.totalPrice +"','"+ one_per.status +"')"
    var results_add = await query(sql_add)
    console.log('插入成功')
  }
  // 查询客户所有订单信息
  if(one_per.flag == 2){
    var one_per = ctx.request.query
    var sql_reset = "select * from orderForm where userId='"+ one_per.userId +"'&& status='"+one_per.status+"'"
    var results_reset = await query(sql_reset)
    console.log('查询客户收货地址信息成功')
    ctx.body=results_reset
    console.log(results_reset)
  }
  // 修改客户订单信息
  if(one_per.flag == 3){
    var one_per = ctx.request.query
    var sql_reset = "update user set nickname='"+ one_per.nickname +"',password='"+ one_per.password +"',telnumber='"+ one_per.telnumber +"',nickname='"+ one_per.nickname +"',avatar='"+ one_per.avatar +"',mailbox='"+ one_per.mailbox +"' where userId='"+ one_per.userId +"'"

    var sql_reset = "update orderForm set userId='"+ one_per.userId +"',productNumber='"+ one_per.productNumber +"',generationTime='"+ one_per.generationTime +"',totalPrice='"+ one_per.totalPrice +"',status='"+ one_per.status +"' where orderNumber='"+ one_per.orderNumber +"'"
    var results_reset = await query(sql_reset)
    console.log(' 修改客户所有不同状态得订单信息成功')
    ctx.body=results_reset
    console.log(results_reset)
  }  
})
module.exports = router