const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RelateSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  recommend: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }
  ],
})

const Relate = mongoose.model('Relate', RelateSchema)

module.exports = Relate