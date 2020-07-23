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
    // console.log(one_per)
    // 增加客户信息
    if(one_per.status == 1){
      console.log('6666')
      var sql_add = "insert into user(userId,password,mailbox,phone) values('"+ one_per.userId +"','"+ one_per.password +"','"+ one_per.mailbox +"','"+ one_per.phonenum +"')"
      var results_add = await query(sql_add)
	  ctx.body = '插入成功'
    }
    // 显示所有用户信息
    if(one_per.status == 2){
      var sql = "select * from user "
      var results = await query(sql)
      console.log('查询成功')
      ctx.body=results
    }
    // 修改客户密码信息
    if(one_per.status == 3){
      var one_per = ctx.request.body.data
      var sql_reset = "update user set password='"+ one_per.password +"' where userId='"+ one_per.userId +"'"
      var results_reset = await query(sql_reset)
	  ctx.body = '修改成功'
    }
    // 显示客户信息
	if(one_per.status == 4){
		var sql = "select * from user where userId = '" + one_per.userid + "'"
		var results = await query(sql)
		ctx.body=results[0]
	}
	if(one_per.status == 5){
		var sql = "update user set nickname = '"+ one_per.nickname +"' where userId = '"+ one_per.userId +"'"
		var results = await query(sql)
		ctx.body = '修改昵称成功'
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
	  ctx.body=results_reset
	  // console.log(results_reset)
	}
	// 查询各类商品
	if(one_per.status === 5){
	  var sql_reset = "select * from productInformation where category = '"+one_per.goods_type+"' "
	  // console.log(sql_reset)
	  var results_reset = await query(sql_reset)
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
    ctx.body = '取消收藏成功'
  }
  // 显示所有收藏信息
  if(one_per.status === 3){
    var sql_reset = "select * from collecting"
    var results_reset = await query(sql_reset)
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
            var idd =goodsNum[i]
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
            var idd =goodsNum[i]
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
  var id = ctx.request.body.id.id
  var userId = ctx.request.body.id.userId
  var mo = ctx.request.body.id.mo
  console.log(id,userId,mo)
  if(mo == '0'){
    mo = '1'
  }else{
    mo='0'
  }
  var a = new Promise(function(resolve,reject){
    const sql_str = `update receivingaddress set mo='0' where mo='1' and userId='${userId}'`
    connection.query(sql_str,(err,res,fields)=>{
      if(err){
              reject('失败')
              console.log('失败')
          }else{
            const sql_str1 = `update receivingaddress set mo='${mo}' where id='${id}'`
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
      const sql_str = `update receivingaddress set mo='0' where mo='1' and userId='${userId}'`
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

// 前台订单用接口
router.post('/moaddress', async (ctx,next) => {
  // console.log('请求收到了')
  var userId = ctx.request.body.userId
  // console.log(user)
  var a = new Promise(function(resolve,reject){
    // const sql_str = `select * from collecting,productinformation where collecting.productNumber=productinformation.productNumber` 
    const sql_str = `select * from receivingaddress where userId='${userId}'`
    connection.query(sql_str,(err,res,fields)=>{
      if(err){
              reject(err)
              console.log('失败333333333333')
          }else{
              if(res.length==0){
                resolve('没有地址哦')
              }else{
                var a = '0'
                for(var i=0;i<res.length;i++){
                  if(res[i].mo=='1'){
                    resolve(res[i])
                    a = '1'
                  }
                }
                if(a=='0'){
                  resolve(res[0])
                }
              }
          }
    })
  })
  ctx.body=await a
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
  var mo1 = ''
  if(mo==true){
    mo1 = '1'
  }else{
    mo1 = '0'
  }
  var id = a.id
  console.log(receiver,receiverTelnumber,receiverAddress,userId,mo)
  if(mo == false){
    var a = new Promise(function(resolve,reject){
      const sql_str = `update receivingaddress set receiver='${receiver}',receiverTelnumber='${receiverTelnumber}',receiverAddress='${receiverAddress}',mo='${mo1}' where userId='${userId}'`
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
      const sql_str = `update receivingaddress set mo=0 where mo=1 and userId='${userId}'`
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

// 发货接口
router.post('/fahuo', async (ctx,next) => {
  // console.log('请求收到了')
  var danhao = ctx.request.body.orderNumber
  console.log(danhao)
  var a = new Promise(function(resolve,reject){ 
    const sql_str = `update orderform set status='2' where orderNumber='${danhao}'`
    // delete from orderform where orderNumber='${danhao}'
    connection.query(sql_str,(err,res,fields)=>{
      if(err){
              reject(err)
              console.log('失败333333333333')
          }else{
              resolve('发货成功')
              console.log('发货成功')
          }
    })
  })
  ctx.body=await a
})

// 后台修改订单信息接口
router.post('/xiuding', async (ctx,next) => {
  var orderNumber = ctx.request.body.a.orderNumber
  var shouperson = ctx.request.body.a.shouperson
  var shouaddress = ctx.request.body.a.shouaddress
  var shoutel = ctx.request.body.a.shoutel
  var totalPrice = ctx.request.body.a.totalPrice
  console.log('收到请求')
  var a = new Promise(function(resolve,reject){ 
    const sql_str = `update orderform set shouperson='${shouperson}',shouaddress='${shouaddress}',shoutel='${shoutel}',totalPrice='${totalPrice}' where orderNumber='${orderNumber}'`
    // delete from orderform where orderNumber='${danhao}'
    connection.query(sql_str,(err,res,fields)=>{
      if(err){
              reject(err)
              console.log('失败')
          }else{
              resolve('修改成功')
              console.log('修改成功')
          }
    })
  })
  ctx.body=await a
})

// 后台批量删除课程
router.post('/manydelding', async (ctx,next) => {
  var id = ctx.request.body.id
  id = JSON.parse(id)
  console.log(id)
  var a = new Promise(function(resolve,reject){
      for(var i=0; i<id.length; i++){
          var idd = id[i]
          var sql_str = `delete from orderform where orderNumber = "${idd}"`
          connection.query(sql_str,(err,res,fields)=>{
              if(err){
                  reject('{code:1, msg:"删除失败"}')
                  }else{
                  console.log('删除了' + i)
                  }
          })
      }
      if(i == id.length){
          resolve('删除成功')
          console.log('删除了')
      }
  })
  ctx.body=await a
})

// 上架接口
router.post('/shangjia', async (ctx,next) => {
  // console.log('请求收到了')
  var productNumber = ctx.request.body.productNumber
  // console.log(danhao)
  var a = new Promise(function(resolve,reject){ 
    const sql_str = `update productinformation set zhuangtai='已上架' where productNumber='${productNumber}'`
    connection.query(sql_str,(err,res,fields)=>{
      if(err){
              reject(err)
              console.log('失败333333333333')
          }else{
              resolve('上架成功')
              console.log('上架成功')
          }
    })
  })
  ctx.body=await a
})
// 下架接口
router.post('/xiajia', async (ctx,next) => {
  // console.log('请求收到了')
  var productNumber = ctx.request.body.productNumber
  // console.log(danhao)
  var a = new Promise(function(resolve,reject){ 
    const sql_str = `update productinformation set zhuangtai='未上架' where productNumber='${productNumber}'`
    connection.query(sql_str,(err,res,fields)=>{
      if(err){
              reject(err)
              console.log('失败333333333333')
          }else{
              resolve('下架成功')
              console.log('下架成功')
          }
    })
  })
  ctx.body=await a
})

// 后台修改订单信息接口
router.post('/xiushang', async (ctx,next) => {
  var productNumber = ctx.request.body.a.productNumber
  var productName = ctx.request.body.a.productName
  var stocks = ctx.request.body.a.stocks
  var productPicture = ctx.request.body.a.productPicture
  var description = ctx.request.body.a.description
  var price = ctx.request.body.a.price
  console.log('收到请求')
  var a = new Promise(function(resolve,reject){ 
    const sql_str = `update productinformation set productName='${productName}',stocks='${stocks}',productPicture='${productPicture}',description='${description}',price='${price}' where productNumber='${productNumber}'`
    // delete from orderform where orderNumber='${danhao}'
    connection.query(sql_str,(err,res,fields)=>{
      if(err){
              reject(err)
              console.log('失败')
          }else{
              resolve('修改成功')
              console.log('修改成功')
          }
    })
  })
  ctx.body=await a
})

// 后台添加商品接口
router.post('/addgoods', async (ctx,next) => {
  var productNumber = ctx.request.body.goods.productNumber
  var productName = ctx.request.body.goods.productName
  var category = ctx.request.body.goods.category
  var stocks = ctx.request.body.goods.stocks
  var productPicture = ctx.request.body.goods.productPicture
  var description = ctx.request.body.goods.description
  var price = ctx.request.body.goods.price
  console.log('收到请求')
  var a = new Promise(function(resolve,reject){ 
    const sql_str = `insert into  productinformation(productNumber,productName,category,stocks,productPicture,description,price) values('${productNumber}','${productName}','${category}','${stocks}','${productPicture}','${description}','${price}')`
    // delete from orderform where orderNumber='${danhao}'
    connection.query(sql_str,(err,res,fields)=>{
      if(err){
              reject(err)
              console.log('失败')
          }else{
              resolve('添加成功')
              console.log('添加成功')
          }
    })
  })
  ctx.body=await a
})
// 后台删除商品接口
router.post('/delgoods', async (ctx,next) => {
  console.log('请求收到了')
  var productNumber = ctx.request.body.productNumber
  var a = new Promise(function(resolve,reject){ 
    const sql_str = `delete from productinformation where productNumber='${productNumber}'`
    connection.query(sql_str,(err,res,fields)=>{
      if(err){
              reject(err)
              console.log('失败333333333333')
          }else{
              resolve('删除商品成功')
              console.log('删除商品成功')
          }
    })
  })
  ctx.body=await a
})

// 后台批量删除商品接口
router.post('/manydelgoods', async (ctx,next) => {
  var id = ctx.request.body.id
  id = JSON.parse(id)
  console.log(id)
  var a = new Promise(function(resolve,reject){
      for(var i=0; i<id.length; i++){
          var idd = id[i]
          var sql_str = `delete from productinformation where productNumber = "${idd}"`
          connection.query(sql_str,(err,res,fields)=>{
              if(err){
                  reject('{code:1, msg:"删除失败"}')
                  }else{
                  console.log('删除了' + i)
                  }
          })
      }
      if(i == id.length){
          resolve('删除成功')
          console.log('删除了')
      }
  })
  ctx.body=await a
})
// 获取用户信息接口
router.post('/usersdata', async (ctx,next) => {
  var a = new Promise(function(resolve,reject){ 
    const sql_str = `select * from user`
    connection.query(sql_str,(err,res,fields)=>{
      if(err){
              reject(err)
              console.log('失败333333333333')
          }else{
              resolve(res)
              console.log('获取成功')
          }
    })
  })
  ctx.body=await a
})

// 后台修改用户信息接口
router.post('/xiuuser', async (ctx,next) => {
  var avatar = ctx.request.body.a.avatar
  var userId = ctx.request.body.a.userId
  var nickname = ctx.request.body.a.nickname
  console.log('收到请求')
  var a = new Promise(function(resolve,reject){ 
    const sql_str = `update user set avatar='${avatar}',nickname ='${nickname }' where userId='${userId}'`
    // delete from orderform where orderNumber='${danhao}'
    connection.query(sql_str,(err,res,fields)=>{
      if(err){
              reject(err)
              console.log('失败')
          }else{
              resolve('修改成功')
              console.log('修改成功')
          }
    })
  })
  ctx.body=await a
})

// 后台删除用户接口
router.post('/deluser', async (ctx,next) => {
  console.log('请求收到了')
  var userId = ctx.request.body.userId
  var a = new Promise(function(resolve,reject){ 
    const sql_str = `delete from user where userId='${userId}'`
    connection.query(sql_str,(err,res,fields)=>{
      if(err){
              reject(err)
              console.log('失败333333333333')
          }else{
              resolve('删除用户成功')
              console.log('删除用户成功')
          }
    })
  })
  ctx.body=await a
})
// 冻结接口
router.post('/dong', async (ctx,next) => {
  // console.log('请求收到了')
  var userId = ctx.request.body.userId
  var weigui = ctx.request.body.weigui
  weigui = weigui-0+1
  // console.log(danhao)
  var a = new Promise(function(resolve,reject){ 
    const sql_str = `update user set zhuang='冻结',weigui='${weigui}' where userId='${userId}'`
    connection.query(sql_str,(err,res,fields)=>{
      if(err){
              reject(err)
              console.log('失败333333333333')
          }else{
              resolve('冻结成功')
              console.log('冻结成功')
          }
    })
  })
  ctx.body=await a
})

// 解冻接口
router.post('/jie', async (ctx,next) => {
  // console.log('请求收到了')
  var userId = ctx.request.body.userId
  // console.log(danhao)
  var a = new Promise(function(resolve,reject){ 
    const sql_str = `update user set zhuang='解冻' where userId='${userId}'`
    connection.query(sql_str,(err,res,fields)=>{
      if(err){
              reject(err)
              console.log('失败333333333333')
          }else{
              resolve('解冻成功')
              console.log('解冻成功')
          }
    })
  })
  ctx.body=await a
})
module.exports = router

module.exports = router

// 查询头像接口
router.post('/tousel', async (ctx, body) => {
	console.log(111111)
	var one_per = ctx.request.body.data
	var sql = "select avatar from user where userId = '"+ one_per.userId +"'"
	var results = await query(sql)
	ctx.body = results[0]
})

// 更改头像接口
router.post('/touset', async (ctx, body) => {
	var one_per = ctx.request.body.data
	var image = one_per.imgurl
	var userId = one_per.userId
	var base64Data = image.replace(/^data:image\/\w+;base64,/, "");
	const dataBuffer = new Buffer(base64Data,'base64')
	var cur_name = await aaa()
	var img_path = "http://localhost:3001/"+ cur_name +".jpg"
	ctx.body = img_path
	fs.writeFile("./static/images/"+ cur_name +".jpg",dataBuffer,(res)=>{
	  console.log('写入成功')
	})
	var sql = "UPDATE user SET avatar = '"+ img_path +"' WHERE userId = '"+ userId +"'"
	var results = await query(sql)
	ctx.body = img_path
	console.log(one_per)
	// var sql = "update user set avatar = '"+ one_per. +"'"
})

// 给头像返回状态接口
router.get('/newconn', async(ctx, body) => {
	ctx.body = {
    "name": "xxx.png",
    "status": "done",
    "url": "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    "thumbUrl": "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
	}
})

// 前台订单用接口
router.post('/moaddress', async (ctx,next) => {
  // console.log('请求收到了')
  var userId = ctx.request.body.data.userId
  // console.log(user)
  var a = new Promise(function(resolve,reject){
    // const sql_str = `select * from collecting,productinformation where collecting.productNumber=productinformation.productNumber` 
    const sql_str = `select * from receivingaddress where userId='${userId}'`
    connection.query(sql_str,(err,res,fields)=>{
      if(err){
              reject(err)
              console.log('失败333333333333')
          }else{
              if(res.length==0){
                resolve([])
              }else{
                var a = '0'
                for(var i=0;i<res.length;i++){
                  if(res[i].mo=='1'){
                    resolve(res[i])
                    a = '1'
                  }
                }
                if(a=='0'){
                  resolve(res[0])
                }
              }
          }
    })
  })
  ctx.body=await a
})

module.exports = router
