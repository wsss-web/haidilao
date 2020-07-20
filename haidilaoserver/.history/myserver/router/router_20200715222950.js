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
module.exports = router