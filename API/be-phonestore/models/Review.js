const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReviewSchema = new Schema({
    content: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    createdate: {
        type: Date
    },
    lastupdate: {
        type: Date
    }
})

const Review = mongoose.model('Review', ReviewSchema)

module.exports = Review