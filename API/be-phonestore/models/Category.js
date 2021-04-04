const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    name: {
        type: String,
        unique:true
    },
    name_en: {
        type: String,
        unique:true
    },
    pathseo: {
        type: String,
        unique: true
    },
    specifications: [{
        type: Schema.Types.ObjectId,
        ref: "Specification"
    }],
})

const Category = mongoose.model('Category', CategorySchema)

module.exports = Category