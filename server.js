'use strict'

////// General //////
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const RedisStore = require('connect-redis')(session)
const {connect} = require('./models/database')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes')

app.set('port', port)
app.set('view engine', 'pug')
app.use(express.static('public'))
app.locals.title = 'BASIC LOGIN'
app.locals.body = {}

// middleware
app.use(session({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
	store: new RedisStore(),
	secret: process.env.SESSION_SECRET || 'loginAuth'
}))

app.use((req,res,next) => {
  app.locals.user = req.session && req.session.email
  next()
})

app.use(bodyParser.urlencoded({extended: false}))
app.use(routes)

connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Now listening on port ${port}`);
    })
  })
  .catch(console.error)
