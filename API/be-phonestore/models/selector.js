const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SelectorSchema = new Schema({
    name: {
        type: String
    }
})

const Selector = mongoose.model('Selector', SelectorSchema)

module.exports = Selector