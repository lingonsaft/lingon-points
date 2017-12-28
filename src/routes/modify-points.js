const {send, createError, json} = require('micro')
const hashString = require('../hash')
const {emailColletionRef} = require('../firebase')

const motifyPoints = async (req, res) => {
  if (req.headers.authorization !== `Bearer ${process.env.AUTH_TOKEN}`) {
    throw createError(403, 'Unauthorized')
  }

  const {email, lingon = 0} = await json(req)
  const emailHash = hashString(email)
  const emailObjectRef = emailColletionRef.doc(emailHash)
  const doc = await emailObjectRef.get()

  if (!doc.exists) {

    if (lingon < 0) {
      throw createError(406, 'Points cannot be lower than 0')
    }

    emailColletionRef.doc(emailHash).set({
      emailId: emailHash,
      lingon,
    })

    return send(res, 200, {
      message: `Success: creating points store`,
      activeLingon: lingon,
    })
  }

  const {lingon: activeLingon} = doc.data()
  const totalLingon = activeLingon + lingon

  if (totalLingon < 0) {
    throw createError(406, 'Lingon cannot be lower than 0')
  }

  emailObjectRef.update({
    lingon: totalLingon,
  })

  send(res, 200, {
    message: `Success: updating points`,
    activeLingon: totalLingon,
  })
}

module.exports = motifyPoints
