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

test('returns a 404 for "/colleges/cost" endpoint', async () => {
  await request(server)
    .get('/colleges/cost')
    .expect(404)
})

test('returns a 404 for "/colleges/:college_name" endpoint', async () => {
  await request(server)
    .get('/colleges/fake_college')
    .expect(404)
})

test('returns a 400 if college_name omitted', async () => {
  await request(server)
    .get('/colleges//cost')
    .expect(400)
})

test('returns the correct cose for valid "/colleges/:college_name/cost" endpoint', async () => {
  const res = await request(server)
    .get('/colleges/Adelphi%20University/cost')
    .expect(200)
  expect(res.body).toBe(38657)
})
