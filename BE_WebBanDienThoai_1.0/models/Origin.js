const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OriginSchema = new Schema({
    origin: {
        type: String
    }
})

const Origin = mongoose.model('Origin', OriginSchema)

module.exports = Origin