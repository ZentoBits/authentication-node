'use strict'

/////// general requires ///////
const bodyParser = require('body-parser')
const express = require('express')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const routes = require('./routes/routes')
const { connect } = require('./client/db/database')

const app = express()

/*
  -- Makes a 'const' for the port and sets the default for the server
*/
const port = process.env.PORT || 3000
app.set('port', port)
app.set('view engine', 'pug')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))

app.use(session({
  store: new RedisStore(),
  secret: 'cheers!'
}))

app.use((req, res, next) => {
  next()
})

app.use(routes)

app.use((
    err,
    { method, url, headers: { 'user-agent': agent } },
    res,
    next
  ) => {
    res.sendStatus(err.status || 500)

    const timeStamp = new Date()
    const statusCode = res.statusCode
    const statusMessage = res.statusMessage

    console.error(
      `[${timeStamp} '${method} ${url}' Error (${statusCode}): '${statusMessage}']`
    )
    console.error(err.stack)
  }
)
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
