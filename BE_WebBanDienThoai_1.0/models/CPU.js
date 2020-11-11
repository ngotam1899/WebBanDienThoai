const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CPUSchema = new Schema({
    cpu: {
        type: String
    }
})

const CPU = mongoose.model('CPU', CPUSchema)

module.exports = CPU