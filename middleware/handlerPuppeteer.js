const puppeteer = require('puppeteer');

const goPuppeteer = async (url, user, pwd, list) => {
    const browser = await puppeteer.launch({
        headless: true
    })
    const page = await browser.newPage()

    // 打开链接
    await page.goto(url, {
        waitUntil: 'networkidle0'
    });
    // 执行登录操作
    await page.type('#j_username', user, {delay: 10})
    let domList = await page.$$('.normal')
    await domList[1].type(pwd, {delay: 10})
    await page.click('.submit-button')
    let statusList = [];
    for (const item of list) {
        const result = await handlerProject(page, item)
        if (result) {
            statusList.push(result)
        }
    }
    // await browser.close();
    return statusList;
}

const handlerProject = async (page, pro) => {
    return new Promise((async resolve => {
        try {
            await delay(1000)
            await page.waitForSelector(`#job_${pro} a`)
            let jobDom = await page.$$(`#job_${pro} a`)
            await jobDom[1].click()
            await delay(500)
            let taskList = await page.$$('.task-link')
            await taskList[3].click()
            await taskList[0].click()
            await page.waitForNavigation()
            resolve(pro)
        } catch (e) {
            console.log(e)
            resolve(false)
        }
    }))
}

const delay = (time) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, time)
    })
}

module.exports = goPuppeteer;
