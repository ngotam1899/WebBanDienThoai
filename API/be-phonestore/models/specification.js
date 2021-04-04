const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SpecificationSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
})

const Specification = mongoose.model('Specification', SpecificationSchema)

module.exports = Specification