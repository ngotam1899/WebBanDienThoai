const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MobileSchema = new Schema({
    display: {
        type: String
    },
    widescreen: {
        type: String
    },
    operation: {
        type: Schema.Types.ObjectId,
        ref: "Operation"
    },
    camera1: {
        type: String
    },
    camera2: {
        type: String
    },
    cpu: {
        type: String
    },
    ram: {
        type: Number
    },
    memory: {
        type: Number
    },
    microcard: {
        type: String
    },
    sim: {
        type: String
    },
    network: {
        type: String
    },
    pin: {
        type: String
    },
    quickcharging: {
        type: String
    },
    weight: {
        type: String
    },
    thick: {
        type: String
    },
    color: {
        type: Schema.Types.ObjectId,
        ref: "Color"
    },
    generalinfo: {
        type: Schema.Types.ObjectId,
        ref: "Product"
    }
}, {
    timestamps: true
})

const Mobile = mongoose.model('Mobile', MobileSchema)

module.exports = Mobile