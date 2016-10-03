'use strict'

const bodyParser = require('body-parser')
const express = require('express')
// const session = require('express-session')
// const RedisStore = require('connect-redis')(session)
const routes = require('./client/routes/routes')
const { connect } = require('./client/db/database')

const app = express()

const port = process.env.PORT || 3000
app.set('port', port)
app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({extended: false}))

connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`listening on PORT ${port}`)
    })
  })
  .catch(console.error)
