const koa = require('koa')
const router = require('koa-router')()
const koaBody = require('koa-body')
const koaStatic = require('koa-static')
const fs = require('fs')
const path = require('path')
const config = require('./config/config')
const handleResponse = require('./middleware/handleReponseStatus')
const app = new koa();
const SECRET = 'testXzhQuick'; // 加密参数

console.log(path.join(__dirname, '/client/build/static'))


/**
 * post接口数据处理
 */
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 3000 * 1024 * 1024    // 设置上传文件大小最大限制，默认30M
    }
}))


/**
 * 配置全局的变量
 */
router.use(async (ctx, next) => {
    // 全局变量
    ctx.state.BASE_URL = config.baseURL + ':' + config.port;
    ctx.state.ROOT_PATH = path.join(__dirname, './');
    ctx.state.SERVER_PATH = path.join(__dirname, './');
    ctx.state.SECRET = SECRET;
    await next()
})

;(async () => {
    // 配置路由
    fs.readdirSync(path.join(__dirname, './routers')).forEach(route => {
        let api = require(`./routers/${route}`)
        router.use(`/${route.replace('.js', '')}`, api.routes())
    })
    // 全局status处理
    // app.use(handleResponse)

    // 启动路由
    app.use(router.routes())
    app.use(router.allowedMethods())
    //设置可访问的静态资源
    app.use(koaStatic(
        path.join(__dirname, '/client/build')
    ));

    app.listen(config.port, () => {
        console.log(`服务器开启，${config.baseURL}:${config.port}`)
    });
})()
