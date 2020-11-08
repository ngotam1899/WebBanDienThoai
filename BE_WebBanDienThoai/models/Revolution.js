const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RevolutionSchema = new Schema({
    revolution: {
        type: String
    }
})

const Revolution = mongoose.model('Revolution', RevolutionSchema)

module.exports = Revolution