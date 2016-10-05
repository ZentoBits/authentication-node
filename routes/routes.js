'use strict';

/////// general requires ///////
const { Router } = require("express");
const router = Router();

const Users = require('../models/User')

/////// routes ///////
router.get('/', (req, res) => {
  res.render("index")
});

router.get('/login', (req, res) => {
  res.render("login")
});

router.get('/register', (req, res) => {
  res.render("register")
});

router.post('/register', (req, res, err) => {
  console.log( req.body );
  Users
    .create( req.body )
    .then( msg =>  {
      res.redirect('/login')

    })
    .catch(err)
})

/*
  -- Finds the Users information and logs them in accordingly
*/
router.post('/login', ({ session, body: { email, password } }, res, err) => {
  Users.findOne({ email })
    .then(user => {

      /*
        -- If statement to check for user info.
        -- If user info is matched, it logs the unique ID and then redirects to the home page
        -- Else If only the user is confirmed, it prints 'Invalid Info' to the console
        -- Else they are redirected to the register page and asked to make an account
      */
      if(user && user.password === password) {
        console.log("Welcome user:", user);
        res.redirect('/')
      } else if ( user ) {
        console.log('Invalid Info')
      } else {
        res.redirect('/register')
        console.log('Register a new account to log in!')
      }
    })
})

  module.exports = router;
