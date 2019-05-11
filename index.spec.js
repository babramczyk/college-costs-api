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

test('returns a 200 for "/colleges/:college_name/cost" endpoint', async () => {
  await request(server)
    .get('/colleges/fake_college/cost')
    .expect(200)
})