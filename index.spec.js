const request = require('supertest')
const { server } = require('./index')

afterEach(() => {
  server.close()
})

test('returns a 404 for root endpoint', async () => {
  await request(server)
    .get('/')
    .expect(404)
})

test('returns a 200 for "/education_costs" endpoint', async () => {
  await request(server)
    .get('/education_costs')
    .expect(200)
})
