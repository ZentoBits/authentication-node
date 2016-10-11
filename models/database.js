'use strict'

////// General //////
const  mongoose = require('mongoose')
const MONGODB_URL = process.env.TEST || 'mongodb://localhost:27017/loginAuth'

mongoose.Promise = Promise

module.exports.connect = () => mongoose.connect(MONGODB_URL)
module.exports.disconnect = () => mongoose.disconnect()
