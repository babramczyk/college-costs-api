const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

// Use different ports for tests and actual server, so that both can function
// simultaneously
const port = process.env.NODE_ENV === 'test' ? 3001 : 3000
const server = app.listen(port)

router.get('/colleges/:college_name/cost', async ctx => {
  console.log('response received')
  ctx.status = 200
})

app.use(router.routes()).use(router.allowedMethods())

module.exports = { server }
