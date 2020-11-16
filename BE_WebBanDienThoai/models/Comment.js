const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    content: {
        type: String
    },
    level: {
        type: Number
    },
    createdate: {
        type: Date
    },
    lastupdate: {
        type: Date
    },
    child: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }],
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},{
    timestamps: true // createAt, updateAt
})

const Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment