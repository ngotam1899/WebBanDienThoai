const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BrandSchema = new Schema({
    name: {
        type: String
    },
    image: {
        type: Schema.Types.ObjectId,
        ref: 'Image_Brand'
    }
})

const Brand = mongoose.model('Brand', BrandSchema)

module.exports = Brand