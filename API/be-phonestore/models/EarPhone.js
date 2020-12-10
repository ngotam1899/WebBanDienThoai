const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EarPhoneSchema = new Schema({
    compatible: {
        type: String
    },
    port: {
        type: String
    },
    used_time: {
        type: Number
    },
    full_charge_time: {
        type: Number
    },
    connect_the_same_time: {
        type: Number
    },
    connect_support: {
        type: String
    },
    weight: {
        type: Number
    },
    brand_from: {
        type: String
    }
}, {
    timestamps: true
})

const EarPhone = mongoose.model('EarPhone', EarPhoneSchema)

module.exports = EarPhone