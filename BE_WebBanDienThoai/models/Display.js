const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DisplaySchema = new Schema({
    name: {
        type: String
    }
})

const Display = mongoose.model('Display', DisplaySchema)

module.exports = Display