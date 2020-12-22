const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    order_list: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product"
        },
        name: {
            type: String
        },
        price: {
            type: String
        },
        image: {
            type: String
        },
        quantity: {
            type: Number
        }
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
    total_quantity: {
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
    is_paid: {
        type: Boolean,
        default: false
    },
    payment_method: {
        type: String,
        enum: ['local', 'paypal'],
        default: 'local'
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