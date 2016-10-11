'use strict'
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
  // cookie: { secure: true }
}))

app.use((req,res,next) => {
  app.locals.user = req.session && req.session.email
  next()
})

app.use(bodyParser.urlencoded({extended: false}))
// error handling
app.use((err,{method, url, headers: {'user-agent': agent}},res,next) => {
  if(process.env.NODE_ENV === 'production') {
    res.sendStatus(err.status || 500)
  } else {
    res.set('Content-Type', 'text/plain').send(err.stack)
  }

  const timeStamp     = new Date()
  const statusCode    = res.statusCode
  const statusMessage = res.statusMessage

  console.error(
       `[${timeStamp}] "${`${method} ${url}`}" Error (${statusCode}): "${statusMessage}"`
     )
  console.error(err.stack)
})
app.use(routes)
// connect to db then initiate server on port 3000
connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Now listening on port ${port}`);
    })
  })
  .catch(console.error)
