const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    order_list: [{
        _id: false,
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product"
        },
        color: {
            type: Schema.Types.ObjectId,
            ref: "Color"
        },
        name: {
            type: String
        },
        name_color: {
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
    paid: {          // Đã thanh toán chưa ? "DateTime" : ""
        type: Boolean,
        default: false
    },
    payment_method: {
        type: String,
        enum: ['local', 'paypal'],
        default: 'local'
    },
    status: {           // Đã nhận hàng chưa ? "DateTime" : "" && status:-1 (Chưa giao), status:0 (Đang giao), status:1 (Đã giao)
        type: Number,
        default: 0
    },
    confirmed: {        // Đã xác nhận chưa ? "DateTime" : ""
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: true  
    }
}, {
    timestamps: true
})

const Order = mongoose.model('Order', OrderSchema)

module.exports = Order