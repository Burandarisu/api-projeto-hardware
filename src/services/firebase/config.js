const firebase = require('firebase-admin')
const serviceAccount = require('../../../private/firebase.json')

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount)
})

const db = firebase.firestore()

module.exports = db
