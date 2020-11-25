const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderitemSchema = new Schema({
    /*order: {
        type: Schema.Types.ObjectId,
        ref: "Order"
    },*/
    //must be add all info product to keep the price
    products: {
        type: Schema.Types.ObjectId,
        ref: "Product"
    },
    price: {
        type: Number
    },
    quantity: {
        type: Number
    }
}, {
    timestamps: true
})

const Orderitem = mongoose.model('Orderitem', OrderitemSchema)

module.exports = Orderitem