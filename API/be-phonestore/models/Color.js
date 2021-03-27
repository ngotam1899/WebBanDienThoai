const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ColorSchema = new Schema({
    name_vn: {
        type: String
    },
    name_en: {
        type: String
    },
    code: {
        type: String
    }
})

const Color = mongoose.model('Color', ColorSchema)

module.exports = Color