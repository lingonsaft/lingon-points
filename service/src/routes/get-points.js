const {send, createError} = require('micro')
const {inputColletionRef} = require('../firebase')
const hashString = require('../hash')
const {isValidNumber} = require('libphonenumber-js')
const {validateEmail} = require('../validation')

const getPoints = async (req, res) => {
  const {input} = req.query

  if (!isValidNumber(input) && !validateEmail(input)) {
    throw createError(400, 'input must be of type email or phonenumber')
  }

  const inputHash = hashString(input)
  const inputObjectRef = inputColletionRef.doc(inputHash)
  const doc = await inputObjectRef.get()

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
