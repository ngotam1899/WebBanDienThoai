const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ChargerSchema = new Schema({
    func: {
        type: String
    },
    input: {
        type: String
    },
    output: {
        type: String
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: "Product"
    }
})

const Charger = mongoose.model('Charger', ChargerSchema)

module.exports = Charger