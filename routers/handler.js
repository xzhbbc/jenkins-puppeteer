const goPuppeteer = require("../middleware/handlerPuppeteer");
const router = require('koa-router')();

router.get('/test', async ctx => {
    console.log(ctx.request.query)
    ctx.status = 200;
    ctx.body = '成功！！！！'
})

router.post('/setJest',async ctx => {
    const {address, user, pwd, list} = ctx.request.body;
    console.log(address, user, pwd, list)
    if (!address) {
        ctx.body  = {
            code: 0,
            message: '请填写地址'
        }
    }
    if (!user || !pwd) {
        ctx.body = {
            code: 0,
            message: '请填写操作用户密码'
        }
    }
    if (!list || list.length === 0) {
        ctx.body = {
            code: 0,
            message: '请填写需要构建的项目'
        }
    }

    const goP = await goPuppeteer(address, user, pwd, list)
    console.log(goP)
    ctx.body = {
        message: '成功',
        code: 1,
        body: goP,
    }
})

module.exports = router
