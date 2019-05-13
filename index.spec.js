const request = require('supertest')
const { exec } = require('child_process')
const fs = require('fs')

describe('server', () => {
  let server
  // Track any previous build file, so we can restore it after tests are
  // complete
  let originalJsonFile

  beforeAll(done => {
    if (fs.existsSync('./data/college-costs.json')) {
      originalJsonFile = fs.readFileSync('./data/college-costs.json')
    }

    exec('yarn build', done)
  })

  afterAll(() => {
    if (originalJsonFile) {
      // Restore any original build data before tests started
      fs.writeFileSync('./data/college-costs.json', originalJsonFile)
    }
  })

  beforeAll(() => {
    server = require('./index').server
  })

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

  test('returns the correct cost for valid "/colleges/:college_name/cost" endpoint', async () => {
    // Happy path integration test that relies on Adelphi University in CSV data
    const res = await request(server)
      .get('/colleges/Adelphi%20University/cost')
      .expect(200)
    expect(res.body).toBe(38657)
  })

  test('includes room and board if given `room_and_board=1` as a query param', async () => {
    // Integration test that relies on Adelphi University in CSV data
    const res = await request(server)
      .get('/colleges/Adelphi%20University/cost?room_and_board=1')
      .expect(200)
    expect(res.body).toBe(54184)
  })

  test('does not include room and board if given other `room_and_board` query param', async () => {
    // Integration test that relies on Adelphi University in CSV data
    const res = await request(server)
      .get('/colleges/Adelphi%20University/cost')
      .expect(200)
    expect(res.body).toBe(38657)
  })
})
