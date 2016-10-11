'use strict'

////// General //////
const  mongoose = require('mongoose')
const MONGODB_URL = 'mongodb://steveHarvey:deathnote1@ds053156.mlab.com:53156/loginauth'
// 'mongodb://localhost:27017/loginAuth'

mongoose.Promise = Promise

module.exports.connect = () => mongoose.connect(MONGODB_URL)
module.exports.disconnect = () => mongoose.disconnect()
