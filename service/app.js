const {send, createError, json} = require('micro')
const {router, post, get} = require('microrouter')
const getPoints = require('./src/routes/get-points')
const motifyPoints = require('./src/routes/modify-points')

const notfound = (req, res) =>
  send(res, 404, 'Not found route')

module.exports = router(
  post('/', motifyPoints),
  get('/', getPoints),
  get('/*', notfound)
)
