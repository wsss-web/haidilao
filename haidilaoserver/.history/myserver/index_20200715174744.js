const koa =require('koa')
const app =new koa()
app.use(async ctx=>{
    ctx.body=''
})
app.listen(3000);