'use strict'
const  mongoose = require('mongoose')
  ,   MONGODB_URL = process.env.TEST || 'mongodb://localhost:27017/loginAuth'

mongoose.Promise = Promise

module.exports.connect = () => mongoose.connect(MONGODB_URL)
module.exports.disconnect = () => mongoose.disconnect()
