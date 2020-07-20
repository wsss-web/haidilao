const koa =require('koa')
const app =new koa()
app.use(async ctx=>{
    ctx.body=''
    console.log('3000服务器已启动')
})
app.listen(3000);
console.log('server is runing on 3002')
