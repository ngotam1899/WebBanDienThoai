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
    image: {
        type: Schema.Types.ObjectId,
        ref: "Image"
    },
    specifications: [{
        type: Schema.Types.ObjectId,
        ref: "Specification"
    }],
    filter: [{
        _id: {
            type: Schema.Types.ObjectId,
            ref: "Specification"
        },
        query: {
            type: String, 
        },
        
    }],
    price: [{
        name: {
            type: String, 
        },
        min: {
            type: Number, 
        },
        max: {
            type: Number, 
        }
    }],
    accessories: {
        type: Boolean,
        default: true
    },
    description: {
        type: String
    },
})

CategorySchema.pre('findOneAndDelete', function(next) {
	mongoose.model('Product').deleteOne({ category: this._conditions._id }, next);
});

const Category = mongoose.model('Category', CategorySchema)

module.exports = Category