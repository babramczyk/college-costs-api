module.exports = {
  // Ignore built JSON data when triggering test runs in watch mode. Otherwise,
  // the build tests, which write/remove this file, will infinitely trigger
  // test runs
  watchPathIgnorePatterns: ['<rootDir>/data/college-costs.json'],
}
