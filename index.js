const Koa = require('koa')
const Router = require('koa-router')
const fs = require('fs')

const app = new Koa()
const router = new Router()

// Use different ports for tests and actual server, so that both can function
// simultaneously
const port = process.env.NODE_ENV === 'test' ? 3001 : 3000
const server = app.listen(port)

let colleges
try {
  colleges = JSON.parse(fs.readFileSync('./data/college-costs.json'))
} catch (e) {
  console.error(
    "Error loading college data. Make sure you run 'yarn build' before starting the server",
  )
}

router.get('/colleges//cost', ctx => {
  ctx.throw(400, 'Error: College name is required')
})

router.get('/colleges/:college_name/cost', async ctx => {
  const { college_name: name } = ctx.params

  const college = colleges[name]
  ctx.assert(college, 404, 'Error: College not found')

  ctx.body = college.tuitionInState + college.tuitionOutOfState
})

app.use(router.routes()).use(router.allowedMethods())

module.exports = { server }
