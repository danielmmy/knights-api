const mongoose = require('mongoose')
const uri = 'mongodb://localhost/knights'
const options =  {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

module.exports = mongoose.createConnection(uri, options)
