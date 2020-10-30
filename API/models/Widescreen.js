const mongoose = require('mongoose')
const Schema = mongoose.Schema

const WidescreenSchema = new Schema({
    widescreen: {
        type: String
    }
})

const Widescreen = mongoose.model('Widescreen', WidescreenSchema)

module.exports = Widescreen