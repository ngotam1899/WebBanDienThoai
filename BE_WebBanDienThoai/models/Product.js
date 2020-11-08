const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    },
    amount: {
        type: Number
    },
    pathseo: {
        type: String
    },
    warrently: {
        type: Number
    },
    createdate: {
        type: String
    },
    bigimage: {
        type: String
    },
    image: [{
        type: String
    }],
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: "Brand"
    },
    origin: {
        type: String
    }
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product