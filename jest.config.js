module.exports = {
  // Run tests in parallel, since many of them are touching data files,
  // and could corrupt other test files
  runInBand: true,
  // Ignore built JSON data when triggering test runs in watch mode. Otherwise,
  // the build tests, which write/remove this file, will infinitely trigger
  // test runs
  watchPathIgnorePatterns: ['<rootDir>/data/college-costs.json'],
}
