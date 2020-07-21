const Router = require('koa-router')
const router = new Router()
const mysql = require('mysql')
const fs = require("fs")

//测试路由
router.get('/huawei', (ctx,next) => {
	ctx.body = '我是华为界面'
});
module.exports = router