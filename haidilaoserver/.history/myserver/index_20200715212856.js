const koa =require('koa2')//引入koa框架
const static =require('koa-static')//设置静态资源访问能力
const Router =require('koa-router')//导入路由模块
const app =new koa()
const router =require("./router/router")
app.use(static(__dirname+'./static/images'))
app.use(router.routes())//配置路由
app.use(router.allowedMethods());
app.use(async ctx=>{
    ctx.body='hello'
    console.log('3000服务器已启动')
})
app.listen(3000);
console.log('server is runing on 3000')
