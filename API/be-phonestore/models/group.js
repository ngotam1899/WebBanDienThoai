const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GroupSchema = new Schema({
    name: {
      type: String
    },
    products: [{
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
      },
      name: {
        type: String
      }
    }]
})

const Group = mongoose.model('Group', GroupSchema)

module.exports = Group