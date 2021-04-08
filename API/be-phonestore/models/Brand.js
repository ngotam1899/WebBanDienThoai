const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BrandSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    image: {
        type: Schema.Types.ObjectId,
        ref: 'Image'
    }
})

const Brand = mongoose.model('Brand', BrandSchema)

module.exports = Brand