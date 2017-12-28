const { send, createError } = require('micro')

module.exports = async (req, res) => {
  if (req.headers.authorization !== `Bearer ${process.env.AUTH_TOKEN}`) {
    throw createError(403, 'Unauthorized')
  }
  send(res, 200, 'Hello')
}
