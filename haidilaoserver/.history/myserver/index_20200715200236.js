const koa =require('koa')
const static =require('koa-static')
const app =new koa()
app.use(static(__dirname+'./static'))
app.use(async ctx=>{
    ctx.body=''
    console.log('3000服务器已启动')
})
app.listen(3000);
console.log('server is runing on 3000')
