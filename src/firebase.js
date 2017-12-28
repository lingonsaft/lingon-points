const admin = require('firebase-admin')
const serviceAccount = require('../firebase.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})
const db = admin.firestore()
const emailColletionRef = db.collection('emails')

module.exports = {
  emailColletionRef,
}
