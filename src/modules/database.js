const mongoose = require('mongoose')
require('dotenv').config()
module.exports.login = () => {
     mongoose.connect(process.env.db, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
     }).then(() => {
          console.log(`Connected to database.`)
     }).catch((err) => {
          console.log(`Failed to connect to database`)
          console.log(err)
     })
}

