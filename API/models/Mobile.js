const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MobileSchema = new Schema({
    display: {
        type: Schema.Types.ObjectId,
        ref: "Display"
    },
    revolution: {
        type: Schema.Types.ObjectId,
        ref: "Revolution"
    },
    widescreen: {
        type: Schema.Types.ObjectId,
        ref: "Widescreen"
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
        type: Schema.Types.ObjectId,
        ref: "CPU"
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
})

const Mobile = mongoose.model('Mobile', MobileSchema)

module.exports = Mobile