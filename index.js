const Koa = require('koa')

const app = new Koa()

app.listen(3000)

app.use(ctx => {
  console.log('request received')
})
