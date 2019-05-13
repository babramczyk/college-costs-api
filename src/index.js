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
  throw Error(
    "Error loading college data. Make sure you run 'yarn build' before starting the server",
  )
}

router.get('/colleges//cost', ctx => {
  ctx.throw(400, 'Error: College name is required')
})

router.get('/colleges/:college_name/cost', ctx => {
  const college = colleges[ctx.params.college_name]
  ctx.assert(college, 404, 'Error: College not found')

  let cost = college.tuitionInState

  if (ctx.query.room_and_board === '1') {
    cost += college.roomAndBoard
  }

  ctx.body = cost
})

app.use(router.routes()).use(router.allowedMethods())

module.exports = { server }
