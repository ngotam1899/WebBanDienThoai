const mongoose = require('mongoose')
const Schema = mongoose.Schema

const InstallmentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  staff: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  product: {
    _id: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    },
    color: {
      type: Schema.Types.ObjectId,
      ref: 'Color'
    },
    product_price: {
      type: Number
    }
  },
  status: {
    type: Boolean,
    default: false
  },
  paid: {
    type: Number
  },
  period: {
    type: Number
  },
  interest_rate: {
    type: Number
  },
  startedAt: {
    type: Date
  },
  endedAt: {
    type: Date
  },
  detail: [{
    month: {
      type: Number
    },
    due_date: {
      type: Date
    },
    payable: {
      type: Number
    },
    status: {
      type: Boolean
    }
  }]
})

const Installment = mongoose.model('Installment', InstallmentSchema)

module.exports = Installment