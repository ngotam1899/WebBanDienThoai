const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ColorSchema = new Schema({
    color: {
        type: String
    }
})

const Color = mongoose.model('Color', ColorSchema)

module.exports = Color