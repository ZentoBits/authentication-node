'use strict'

/////// general requires ///////
const bodyParser = require('body-parser')
const express = require('express')
// const session = require('express-session')
// const RedisStore = require('connect-redis')(session)
const routes = require('./client/routes/routes')
const { connect } = require('./client/db/database')

const app = express()

/*
  -- Makes a 'const' for the port and sets the default for the server
*/
const port = process.env.PORT || 3000
app.set('port', port)
app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({extended: false}))

/*
  -- 'connect()' is connecting to my MongoDB and then listens for interaction with the specified port
  -- this is where the app is actually started
*/
connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`listening on PORT ${port}`)
    })
  })
  .catch(console.error)
