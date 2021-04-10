const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReviewSchema = new Schema({
    content: {
        type: String
    },
    rating: {
        type: Number
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product"
    }
}, {
    timestamps: true
})

const Review = mongoose.model('Review', ReviewSchema)

module.exports = Review