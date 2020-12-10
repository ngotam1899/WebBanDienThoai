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
    bigimage: {
        type: Schema.Types.ObjectId,
        ref: "Image_Pro"
    },
    image: [{
        type: Schema.Types.ObjectId,
        ref: "Image_Pro"
    }],
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: "Brand"
    },
    /*origin: {
        type: Schema.Types.ObjectId,
        ref: "Origin"
    },*/
    detail_info: {
        mobile: {
            type: Schema.Types.ObjectId,
            ref: "Mobile"
        },
        earphone: {
            type: Schema.Types.ObjectId,
            ref: "EarPhone"
        }
    }
}, {
    timestamps: true
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product