const mongoose = require('mongoose')
const env = require('../config/config')
const connect = () => {
  mongoose.connect(env.mongodb.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  })
}

module.exports = { connect }
