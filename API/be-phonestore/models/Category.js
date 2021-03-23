const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    name: {
        type: String
    },
    name_en: {
        type: String
    },
    pathseo: {
        type: String
    },
    pathseo_en: {
        type: String
    },
    specifications: [{
        type: Schema.Types.ObjectId,
        ref: "Specification"
    }],
})

const Category = mongoose.model('Category', CategorySchema)

module.exports = Category