const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LikeSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  recommend: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }],
})

const Like = mongoose.model('Like', LikeSchema)

module.exports = Like