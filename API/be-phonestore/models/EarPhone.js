const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EarPhoneSchema = new Schema({
    name: {
        type: String
    }
})

const EarPhoneSchema = mongoose.model('EarPhone', EarPhoneSchema)

module.exports = EarPhoneSchema