'use strict'

////// General //////
const {Router} = require('express')
const bcrypt = require('bcrypt')
const User = require('./models/user')
const route = Router()


route.get('/', (req,res) => {
  res.render('index')
})
route.post('/', (req,res) => {
	if(logout) {
    /*
      - Kills session if logout
    */
		req.session.destroy(err => {
      if(err) throw err
      res.redirect('/login')
    })
	}
})

route.get('/login', (req,res) => {
  res.render('login', console.log("Please log-in"))
})

route.post('/login', ({ body },res,err) => {
	User
		.findOne(body)
		.then(dbUser => {
			if(dbUser) {
				if(body.password === dbUser.password) {
					res.render('index', {user: true}, console.log(`${dbUser.email} logged in`))
				} else {
					res.render('login', console.log("Invalid email or password"))
				}
			}
		})
})

route.get('/register', (req,res) => {
	res.render('register', console.log("Please register"))
})

route.post('/register', ({ body },res, err) => {
  User
    .findOne(body)
    .then(user => {
      if(user) {
        res.render('register', console.log("Email in use"))
      } else {
        User
          .create(body)
          .then(() => res.redirect('/login', console.log("created new user")))
      }
    })
})

module.exports = route
