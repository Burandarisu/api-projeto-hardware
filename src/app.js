const express = require('express')
const app = express()
const routes = require('./routes')

app.use((req, res, next) => {
  console.log('request ' + req.hostname + req.path + ` ${req.method}`)
  next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)

module.exports = app
