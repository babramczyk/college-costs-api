const fs = require('fs')
const csvParse = require('csv-parse/lib/sync')

console.log('~> Loading college data from CSV')
try {
  const csvData = fs.readFileSync('./data/college-costs.csv').toString()
} catch (e) {
  throw Error(
    "Error parsing CSV data. Make sure './data/college-costs.csv exists",
  )
}

console.log('~> Parsing CSV data')
/**
 * Convert CSV data to an object mapping college name to college data
 */
const colleges = csvParse(csvData, {
  columns: true,
  cast: (value, context) => {
    switch (context.column) {
      case 'tuitionInState':
      case 'tuitionOutOfState':
      case 'roomAndBoard':
        if (value === '') {
          return 0
        } else {
          return parseInt(value, 10)
        }
      default:
        return value
    }
  },
}).reduce((obj, college) => {
  return {
    ...obj,
    [college.name]: college,
  }
}, {})

console.log('~> Writing college data to JSON file')
fs.writeFileSync('./data/college-costs.json', JSON.stringify(colleges, null, 2))

console.log(
  '~> Successfully stored college cost data to ./data/college-costs.json',
)
