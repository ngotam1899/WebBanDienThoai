const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ShopSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String
    }
})

const Shop = mongoose.model('Shop', ShopSchema)

module.exports = Shop