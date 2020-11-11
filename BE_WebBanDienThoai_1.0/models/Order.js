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
    fullname: {
        type: String
    },
    phonenumber: {
        type: String
    },
    email: {
        type: String
    },
    address: {
        type: String
    },
    note: {
        type: String
    }
})

const Order = mongoose.model('Order', OrderSchema)

module.exports = Order