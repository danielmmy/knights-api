const mongoose = require('mongoose')
const uri = process.env.MONGODB_URI
const options =  {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

module.exports = mongoose.createConnection(uri, options)
