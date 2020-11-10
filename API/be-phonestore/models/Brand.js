const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BrandSchema = new Schema({
    name: {
        type: String
    }
})

const Brand = mongoose.model('Brand', BrandSchema)

module.exports = Brand