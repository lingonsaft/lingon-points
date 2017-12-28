const hash = require('hash.js')

const hashString = string =>
  hash.sha256().update(string).digest('hex')

module.exports = hashString
