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
    if (results.length === 0) {
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
  var one_per = ctx.request.body.data
	// 显示所有商品信息
	 if(one_per.status === 4){
	  var sql_reset = "select * from productInformation"
	  var results_reset = await query(sql_reset)
	  console.log('查询成功')
	  ctx.body=results_reset
	  // console.log(results_reset)
	}
	// 查询各类商品
	if(one_per.status === 5){
	  var sql_reset = "select * from productInformation where category = '"+one_per.goods_type+"' "
	  // console.log(sql_reset)
	  var results_reset = await query(sql_reset)
	  console.log('查询成功')
	  ctx.body=results_reset
	}
})
// 收藏信息路由
router.post('/collectInfo', async(ctx,body) => {
  var one_per = ctx.request.body.data
  console.log(one_per)
  // 增加收藏信息
  if(one_per.status === 1){
    var sql_add = "insert into collecting(userId,productNumber) values('"+ one_per.userId +"','"+one_per.productNumber+"')"
    var results_add = await query(sql_add)
    console.log('收藏1111111')
    ctx.body = '收藏成功'
  }  
  //取消收藏信息
  if(one_per.status === 2){
    var sql_del = "delete from collecting where userId = '"+ one_per.userId +"' and productNumber ='"+ one_per.productNumber +"'"
    var results_del = await query(sql_del)
    console.log('取消收藏成功')
    ctx.body = '取消收藏成功'
  }
  // 显示所有收藏信息
  if(one_per.status === 3){
    var sql_reset = "select * from collecting"
    var results_reset = await query(sql_reset)
    console.log('收藏信息查询成功')
    ctx.body=results_reset
    console.log(results_reset)
  }
})
//购物车内收藏信息增加路由
router.post('/collectInfo2', async (ctx,next) => {
  console.log('请求收到了')
  var one_per=ctx.request.body.data
  var goodsNum=[]
  goodsNum = ctx.request.body.data.productArr
  console.log(goodsNum+"wwwwwwwwwwwww")
    var a = new Promise(function(resolve,reject){
    console.log('1111111')
          for(var i=0; i<goodsNum.length; i++){
            idd =goodsNum[i]
            console.log("222222222")
            var sql_str = "insert into collecting(userId,productNumber) values('"+ one_per.userId +"','"+idd+"')"
            connection.query(sql_str,(err,res,fields)=>{
              console.log(33333333)
                if(err){
                    reject('{code:1, msg:"收藏失败"}')
                  }else{
                    console.log('成功收藏' + i+'个商品')
                    resolve(res)
                  }
            })
        }
        if(i ==goodsNum.length){
            resolve('收藏成功')
        }
    })
    ctx.body=await a
  })
//购物车内多个删除商品路由
router.post('/cartDelete', async (ctx,next) => {
  console.log('请求收到了')
  var one_per=ctx.request.body.data
  var goodsNum=[]
  goodsNum = ctx.request.body.data.productArr
  console.log(goodsNum+"sssssssss")
    var a = new Promise(function(resolve,reject){
    console.log('1111111')
          for(var i=0; i<goodsNum.length; i++){
            idd =goodsNum[i]
            console.log("222222222")
            var sql_str = "delete from shoppingCart where productNumber='"+ idd +"'&& userId='"+ one_per.userId +"'"
            connection.query(sql_str,(err,res,fields)=>{
              console.log(33333333)
                if(err){
                    reject('{code:1, msg:"删除失败"}')
                  }else{
                    console.log('成功删除' + i+'个商品')
                    resolve(res)
                  }
            })
        }
        if(i ==goodsNum.length){
            resolve('删除成功')
        }
    })
    ctx.body=await a
  })

//购物车接口
router.post('/shoppingCartMana', async(ctx,body) => {
  var one_per = ctx.request.body.data
  console.log(one_per)
  // 增加购物车里的商品信息
  if(one_per.status == 1){
    console.log('6666')
    var sql_add = "insert into shoppingCart(userId,productNumber,quantity) values('"+ one_per.userId +"','"+ one_per.productNumber +"','"+ one_per.quantity +"')"
    var results_add = await query(sql_add)
    console.log('插入成功')
	ctx.body = '添加购物车成功'
  }
  //删除购物车单个商品信息
  if(one_per.status == 2){
    var one_per = ctx.request.body.data
    var sql_del = "delete from shoppingCart where productNumber='"+ one_per.productNumber +"'&& userId='"+ one_per.userId +"'"
    var results_del = await query(sql_del)
    console.log('删除成功')
  }
  // 修改购物车单个商品得数量
  if(one_per.status == 3){
    var one_per = ctx.request.body.data
    var sql_reset = "update shoppingCart set productNumber='"+ one_per.productNumber +"',quantity='"+ one_per.quantity +"'  where productNumber='"+ one_per.productNumber +"'"
    var results_reset = await query(sql_reset)
    console.log('修改成功')
	ctx.body = '添加购物车成功'
  }
  // 查询所有购物车信息
  if(one_per.status == 4){
    var one_per = ctx.request.body.data
    var sql_reset = "select * from shoppingCart"
    var results_reset = await query(sql_reset)
    console.log('查询成功')
    ctx.body=results_reset
    // console.log(results_reset)
  }
  // 查询登录用户购物车信息
  if(one_per.status == 5){
    var one_per = ctx.request.body.data
    var sql_reset = "select * from shoppingcart left join productinformation on shoppingcart.productNumber=productinformation.productNumber where userId = '"+ one_per.userId +"'"
    var results_reset = await query(sql_reset)
    console.log('登录用户购物车信息查询成功')
    ctx.body=results_reset
    console.log(results_reset)
  }
  // 查询用户单个商品
  if(one_per.status == 6){
	var one_per = ctx.request.body.data
	var sql = "select * from shoppingcart where productNumber = '"+ one_per.productNumber +"'and userId = '"+ one_per.userId +"'"
    var results = await query(sql)
	ctx.body = results
  }
 })

// 购物车信息路由
router.post('/CartMana', async(ctx,body) => {
  var one_per = ctx.request.body.data
  // console.log(one_per)
  // 增加购物车里的商品信息
  if(one_per.status === 1){
    var sql_add = "insert into shoppingCart(userId,productNumber,quantity) values('"+ one_per.userId +"','"+ one_per.productNumber +"','"+ one_per.quantity +"')"
    var results_add = await query(sql_add)
    ctx.body = '已加入购物车'
    console.log('加入购物车成功')
  }
  // 重复添加购物车
  if(one_per.status === 2){
    one_per.quantity  = (one_per.quantity - 0) + 1
    var sql_add = "update shoppingCart set quantity='"+ (one_per.quantity) +"' where userId='"+ one_per.userId +"' && productNumber='"+ one_per.productNumber +"'"
    var results_add = await query(sql_add)
    ctx.body = '已加入购物车'
    console.log('加入购物车成功')
  }
  // 查询一条购物车信息
  if(one_per.status === 3){
    var sql_reset = "select * from shoppingCart where userId='"+ one_per.userId +"' && productNumber='"+ one_per.productNumber +"'"
    var results_reset = await query(sql_reset)
    ctx.body=results_reset
    console.log('查询成功')
  }
})


// 收货地址接口
router.post('/dizhi', async (ctx,next) => {
  console.log('请求收到了')
  var user = ctx.request.body.user
  console.log(user)
  var a = new Promise(function(resolve,reject){
    const sql_str = `select * from receivingaddress where userId='${user}'`
    connection.query(sql_str,(err,res,fields)=>{
      if(err){
              reject(err)
              console.log('失败333333333333')
          }else{
              resolve(res)
          }
    })
  })
  ctx.body=await a
})
// 查询默认地址
router.post('/chaxunmoren', async (ctx,next) => {
  var id = ctx.request.body.id
  // console.log(ctx.request.body)
  console.log(id)
  const sql_str = "select * from receivingaddress where userId='"+ id +"' && mo=1"
  var results_reset = await query(sql_str)
    ctx.body=results_reset
    console.log('查询成功')
  // var a = new Promise(function(resolve,reject){
  //   connection.query(sql_str,(err,res,fields)=>{
  //     if(err){
  //             reject(res+"没有默认地址")
  //             console.log('没有默认地址')
  //         }else{
  //             resolve(res.data)
  //           }
  //         }
  //   )
  // })
  // ctx.body=await a
})
// 默认地址接口
router.post('/moren', async (ctx,next) => {
  var id = ctx.request.body.id
  // console.log(ctx.request.body)
  console.log(id)
  var a = new Promise(function(resolve,reject){
    const sql_str = `update receivingaddress set mo=0 where mo=1`
    connection.query(sql_str,(err,res,fields)=>{
      if(err){
              reject('失败')
              console.log('失败')
          }else{
            const sql_str1 = `update receivingaddress set mo=1 where id=${id}`
            connection.query(sql_str1,(err,res,fields)=>{
              if(err){
                      reject('失败')
                  }else{
                      resolve('成功了')
                  }
            })
          }
    })
  })
  ctx.body=await a
})
// 删除地址接口
router.post('/deleteaddress', async (ctx,next) => {
  // console.log('请求收到了')
  var id = ctx.request.body.id
  console.log(id)
  var a = new Promise(function(resolve,reject){
    const sql_str = `delete from receivingaddress where id='${id}'`
    connection.query(sql_str,(err,res,fields)=>{
      if(err){
              reject('失败')
              console.log('失败')
          }else{
              resolve(res)
              console.log('删除成功')
          }
    })
  })
  ctx.body=await a
})

// 新增地址接口
router.post('/addaddress', async (ctx,next) => {
  // console.log('请求收到了')
  var a = ctx.request.body.a
  var receiver = a.name
  var receiverTelnumber = a.tel
  var receiverAddress = a.address
  var userId = a.user
  var mo = a.mo
  console.log(receiver,receiverTelnumber,receiverAddress)
  if(mo === false){
    var a = new Promise(function(resolve,reject){
      const sql_str = `insert into receivingaddress(userId,receiver,receiverTelnumber,receiverAddress) values('${userId}','${receiver}','${receiverTelnumber}','${receiverAddress}')`
      connection.query(sql_str,(err,res,fields)=>{
        if(err){
                reject('失败')
                console.log('失败')
            }else{
                resolve(res)
                console.log('添加成功')
            }
      })
    })
    ctx.body=await a
  } else {
    var a = new Promise(function(resolve,reject){
      const sql_str = `update receivingaddress set mo=0 where mo=1`
      connection.query(sql_str,(err,res,fields)=>{
        if(err){
                reject('失败le')
                console.log('失败')
            }else{
              const sql_str = `insert into receivingaddress(userId,receiver,receiverTelnumber,receiverAddress,mo) values('${userId}','${receiver}','${receiverTelnumber}','${receiverAddress}','1')`
              connection.query(sql_str,(err,res1,fields)=>{
                if(err){
                        reject('失败')
                        console.log('失败')
                    }else{
                        resolve(res1)
                        console.log('添加成功')
                    }
              })
            }
      })
    })
    ctx.body=await a
  }
})

// 编辑地址接口
router.post('/bianaddress', async (ctx,next) => {
  // console.log('请求收到了')
  var a = ctx.request.body.a
  var receiver = a.name
  var receiverTelnumber = a.tel
  var receiverAddress = a.address
  var userId = a.user
  var mo = a.mo
  var id = a.id
  console.log(receiver,receiverTelnumber,receiverAddress,userId,mo)
  if(mo == false){
    var a = new Promise(function(resolve,reject){
      const sql_str = `update receivingaddress set receiver='${receiver}',receiverTelnumber='${receiverTelnumber}',receiverAddress='${receiverAddress}' where userId='${userId}'`
      connection.query(sql_str,(err,res,fields)=>{
        if(err){
                reject('失败')
                console.log('失败')
            }else{
                resolve(res)
                console.log('修改成功')
            }
      })
    })
    ctx.body=await a
  } else {
    var a = new Promise(function(resolve,reject){
      const sql_str = `update receivingaddress set mo=0 where mo=1`
      connection.query(sql_str,(err,res,fields)=>{
        if(err){
                reject('失败le')
                console.log('失败11111')
            }else{
              const sql_str1 = `update receivingaddress set receiver='${receiver}',receiverTelnumber='${receiverTelnumber}',receiverAddress='${receiverAddress}',mo='1' where id='${id}'`
              connection.query(sql_str1,(err,res1,fields)=>{
                if(err){
                        reject('失败')
                        console.log('失败222222')
                    }else{
                        resolve(res1)
                        console.log('修改成功')
                    }
              })
            }
      })
    })
    ctx.body=await a
  }
})

// 查询收藏接口
router.post('/selectCang', async (ctx,next) => {
  // console.log('请求收到了')
  var user = ctx.request.body.user
  console.log(user)
  var a = new Promise(function(resolve,reject){
    // const sql_str = `select * from collecting,productinformation where collecting.productNumber=productinformation.productNumber` 
    const sql_str = `select * from productinformation where productNumber in (select productNumber from collecting where userId='${user}')`
    connection.query(sql_str,(err,res,fields)=>{
      if(err){
              reject(err)
              console.log('失败333333333333')
          }else{
              resolve(res)
              console.log(res+'11111111111111111')
          }
    })
  })
  ctx.body=await a
})

// 取消收藏接口
router.post('/quCang', async (ctx,next) => {
  // console.log('请求收到了')
  var user = ctx.request.body.user
  var productNumber = ctx.request.body.productNumber
  // console.log(user)
  var a = new Promise(function(resolve,reject){
    // const sql_str = `select * from collecting,productinformation where collecting.productNumber=productinformation.productNumber` 
    const sql_str = `delete from collecting where productNumber='${productNumber}'`
    connection.query(sql_str,(err,res,fields)=>{
      if(err){
              reject(err)
              console.log('失败333333333333')
          }else{
              resolve('删除成功')
              // console.log(res)
          }
    })
  })
  ctx.body=await a
})

// 获取订单接口
router.post('/orderlist', async (ctx,next) => {
  // console.log('请求收到了')
  var user = ctx.request.body.user
  // console.log(user)
  var a = new Promise(function(resolve,reject){
    // where userId='${user}' 
    // const sql_str = `select * from collecting,productinformation where collecting.productNumber=productinformation.productNumber` 
    const sql_str = `select * from orderform left join productinformation on orderform.productNumber=productinformation.productNumber`
    connection.query(sql_str,(err,res,fields)=>{
      if(err){
              reject(err)
              console.log('失败333333333333')
          }else{
              resolve(res)
              // console.log(res)
          }
    })
  })
  ctx.body=await a
})
// 取消订单接口
router.post('/delorder', async (ctx,next) => {
  console.log('请求收到了')
  var danhao = ctx.request.body.danhao
  console.log(danhao)
  var a = new Promise(function(resolve,reject){ 
    const sql_str = `delete from orderform where orderNumber='${danhao}'`
    connection.query(sql_str,(err,res,fields)=>{
      if(err){
              reject(err)
              console.log('失败333333333333')
          }else{
              resolve('取消订单成功')
              console.log('取消订单成功')
          }
    })
  })
  ctx.body=await a
})
// 确认收货接口
router.post('/queshou', async (ctx,next) => {
  console.log('请求收到了')
  var danhao = ctx.request.body.danhao
  console.log(danhao)
  var a = new Promise(function(resolve,reject){ 
    const sql_str = `update orderform set status='3' where orderNumber='${danhao}'`
    // delete from orderform where orderNumber='${danhao}'
    connection.query(sql_str,(err,res,fields)=>{
      if(err){
              reject(err)
              console.log('失败333333333333')
          }else{
              resolve('确认收货成功')
              console.log('确认收货成功')
          }
    })
  })
  ctx.body=await a
})
// 付款接口
router.post('/fukuan', async (ctx,next) => {
  console.log('请求收到了')
  var danhao = ctx.request.body.danhao
  console.log(danhao)
  var a = new Promise(function(resolve,reject){ 
    const sql_str = `update orderform set status='1' where orderNumber='${danhao}'`
    // delete from orderform where orderNumber='${danhao}'
    connection.query(sql_str,(err,res,fields)=>{
      if(err){
              reject(err)
              console.log('失败333333333333')
          }else{
              resolve('付款成功')
              console.log('付款成功')
          }
    })
  })
  ctx.body=await a
})

// 查询评价接口
router.post('/getpingjia',async (ctx,body) =>{
  var one_per = ctx.request.body.data
  console.log(one_per)
  var sql_add = `select * from evaluation left join user on evaluation.userId = user.userId where productNumber = ${one_per.productNumber}`
  const results_reset  = await query(sql_add)
  ctx.body = results_reset
})

// 完成评价接口
router.post('/pingjia', async (ctx,next) => {
  console.log('请求收到了')
  var a = ctx.request.body.a
  console.log(a)
  var userId = a.userId
  var orderNumber = a.orderNumber
  var productNumber = a.productNumber
  var content = a.ping
  var evaluationTime = new Date().getTime()
  var a = new Promise(function(resolve,reject){ 
    const sql_str = `insert into evaluation(userId,productNumber,content,evaluationTime) values('${userId}','${productNumber}','${content}','${evaluationTime}')`
    // delete from orderform where orderNumber='${danhao}'
    connection.query(sql_str,(err,res,fields)=>{
      if(err){
              reject(err)
              console.log('失败333333333333')
          }else{
            const sql_str = `update orderform set status='4' where orderNumber='${orderNumber}'`
            // delete from orderform where orderNumber='${danhao}'
            connection.query(sql_str,(err,res,fields)=>{
              if(err){
                      reject(err)
                      console.log('失败333333333333')
                  }else{
                      resolve('评价成功')
                      console.log('评价成功')
                  }
            })
          }
    })
  })
  ctx.body=await a
})
//购物车接口
router.post('/shoppingCartMana', async(ctx,body) => {
  var one_per = ctx.request.body.data
  console.log(one_per)
  // 增加购物车里的商品信息
  if(one_per.status == 1){
    console.log('6666')
    var sql_add = "insert into shoppingCart(userId,productNumber,quantity) values('"+ one_per.userId +"','"+ one_per.productNumber +"','"+ one_per.quantity +"')"
    var results_add = await query(sql_add)
    console.log('插入成功')
	ctx.body = '添加购物车成功'
  }
  //删除购物车单个商品信息
  if(one_per.status == 2){
    var one_per = ctx.request.body.data
    var sql_del = "delete from shoppingCart where productNumber='"+ one_per.productNumber +"'&& userId='"+ one_per.userId +"'"
    var results_del = await query(sql_del)
    console.log('删除成功')
  }
  // 修改购物车单个商品得数量
  if(one_per.status == 3){
    var one_per = ctx.request.body.data
    var sql_reset = "update shoppingCart set productNumber='"+ one_per.productNumber +"',quantity='"+ one_per.quantity +"'  where productNumber='"+ one_per.productNumber +"'"
    var results_reset = await query(sql_reset)
    console.log('修改成功')
	ctx.body = '添加购物车成功'
  }
  // 查询所有购物车信息
  if(one_per.status == 4){
    var one_per = ctx.request.body.data
    var sql_reset = "select * from shoppingCart"
    var results_reset = await query(sql_reset)
    console.log('查询成功')
    ctx.body=results_reset
    // console.log(results_reset)
  }
  // 查询登录用户购物车信息
  if(one_per.status == 5){
    var one_per = ctx.request.body.data
    var sql_reset = "select * from shoppingcart left join productinformation on shoppingcart.productNumber=productinformation.productNumber where userId = '"+ one_per.userId +"'"
    var results_reset = await query(sql_reset)
    // console.log('登录用户购物车信息查询成功')
    ctx.body=results_reset
    console.log(results_reset)
  }
  // 查询用户单个商品
  if(one_per.status == 6){
	var one_per = ctx.request.body.data
	var sql = "select * from shoppingcart where productNumber = '"+ one_per.productNumber +"'and userId = '"+ one_per.userId +"'"
    var results = await query(sql)
	ctx.body = results
  }
 })

// 获取评价接口
router.post('/myping', async (ctx,next) => {
  console.log('请求收到了')
  var user = ctx.request.body.user
  console.log(user)
  var a = new Promise(function(resolve,reject){
    const sql_str = `select * from evaluation left join productinformation on evaluation.productNumber=productinformation.productNumber`
    connection.query(sql_str,(err,res,fields)=>{
      if(err){
              reject(err)
              console.log('失败333333333333')
          }else{
              resolve(res)
              // console.log(res)
          }
    })
  })
  ctx.body=await a
})

module.exports = router