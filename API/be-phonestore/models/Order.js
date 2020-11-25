const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    orderitem: [{
        type: Schema.Types.ObjectId,
        ref: "Orderitem"
    }],
    //must be add all info product to keep the price
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    total_price: {
        type: Number,
        default: 0
    },
    shipping_phonenumber: {
        type: Number
    },
    email: {
        type: String
    },
    shipping_address: {
        type: String
    },
    note: {
        type: String
    },
    status: {
        type: Boolean,
        default: false
    },
    confirmed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const Order = mongoose.model('Order', OrderSchema)

module.exports = Order