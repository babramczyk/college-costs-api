const fs = require('fs')

describe('build', () => {
  // Track any previous build file, so we can restore it after tests are
  // complete
  let originalJsonFile

  beforeAll(() => {
    if (fs.existsSync('./data/college-costs.json')) {
      originalJsonFile = fs.readFileSync('./data/college-costs.json')
    }
  })

  afterAll(() => {
    if (originalJsonFile) {
      // Restore any original build data before tests started
      fs.writeFileSync('./data/college-costs.json', originalJsonFile)
    }
  })

  test("creates a JSON file if it doesn't already exist", () => {
    if (fs.existsSync('./data/college-costs.json')) {
      fs.unlinkSync('./data/college-costs.json')
    }

    require('./build')

    expect(fs.existsSync('./data/college-costs.json')).toBe(true)
  })

  test('JSON file still exists if one already existed', () => {
    fs.writeFileSync('./data/college-costs.json', '{}')

    require('./build')

    expect(fs.existsSync('./data/college-costs.json')).toBe(true)
  })

  test('successfully converts the CSV data to JSON with correct data types', () => {
    require('./build')

    const jsonData = JSON.parse(fs.readFileSync('./data/college-costs.json'))
    expect(typeof jsonData === 'object').toBe(true)

    for (const key in jsonData) {
      const {
        name,
        tuitionInState,
        tuitionOutOfState,
        roomAndBoard,
      } = jsonData[key]

      expect(key).toBe(name)

      expect(typeof name)

      expect(typeof tuitionInState).toBe('number')
      expect(isNaN(tuitionInState)).toBe(false)

      expect(typeof tuitionOutOfState).toBe('number')
      expect(isNaN(tuitionOutOfState)).toBe(false)

      expect(typeof roomAndBoard).toBe('number')
      expect(isNaN(roomAndBoard)).toBe(false)
    }
  })
})
