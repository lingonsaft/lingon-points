const {send, createError, json} = require('micro')
const hashString = require('../hash')
const {inputColletionRef} = require('../firebase')
const {isValidNumber} = require('libphonenumber-js')
const {validateEmail} = require('../validation')

const motifyPoints = async (req, res) => {
  if (req.headers.authorization !== `Bearer ${process.env.API_TOKEN}`) {
    throw createError(403, 'Unauthorized')
  }

  const {input, lingon = 0} = await json(req)
  const formatedInput = input.toLowerCase()

  if (!isValidNumber(formatedInput) && !validateEmail(formatedInput)) {
    throw createError(400, 'input must be of type email or phonenumber')
  }

  const inputHash = hashString(formatedInput)
  const inputObjectRef = inputColletionRef.doc(inputHash)
  const doc = await inputObjectRef.get()

  if (!doc.exists) {

    if (lingon < 0) {
      throw createError(406, 'Points cannot be lower than 0')
    }

    inputColletionRef.doc(inputHash).set({
      inputId: inputHash,
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

  inputObjectRef.update({
    lingon: totalLingon,
  })

  send(res, 200, {
    message: `Success: updating points`,
    activeLingon: totalLingon,
  })
}

module.exports = motifyPoints
