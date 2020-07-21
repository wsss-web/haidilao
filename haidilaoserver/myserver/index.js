const koa =require('koa2')//引入koa框架
const static =require('koa-static')//设置静态资源访问能力
const app =new koa()
const router =require("./router/router")
var cors = require('koa-cors')
var bodyParser = require('koa-bodyparser')

// 文件解析
app.use(bodyParser());
app.use(cors());
app.use(router.routes())
app.use(router.allowedMethods());

app.use(async ctx=>{
    ctx.body='hello'
})
app.listen(3001);
console.log('server is runing on 3001')
