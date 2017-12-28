const {send} = require('micro')
const {emailColletionRef} = require('../firebase')
const hashString = require('../hash')

const getPoints = async (req, res) => {
  const {email} = req.query
  const emailHash = hashString(email)

  const emailObjectRef = emailColletionRef.doc(emailHash)
  const doc = await emailObjectRef.get()

  if (!doc.exists) {
    return send(res, 404, {
      message: `Could not find any lingon :(`,
    })
  }

  send(res, 200, {
    message: `Success`,
    lingon: doc.data().lingon,
  })
}

module.exports = getPoints
