const mongoose = require('mongoose')
const Schema = mongoose.Schema

const InstallmentSchema = new Schema(
  {
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
    status: { // -1 (chưa duyệt), 0 (Chưa hoàn tất), 1 (Đã hoàn tất), 2 (Qúa hạn)
      type: Number,
      default: -1
    },
    prepay: {
      type: Number
    },
    paid: {
      type: Number,
      default: 0
    },
    debt: {
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
      status: { // -1 (Qúa hạn), 0 (Chưa tới hạn), 1 (Hoàn tất)
        type: Number
      }
    }],
    active: {
      type: Boolean,
      default: true,
    }
  },
	{
		timestamps: true
	}
)

const Installment = mongoose.model('Installment', InstallmentSchema)

module.exports = Installment