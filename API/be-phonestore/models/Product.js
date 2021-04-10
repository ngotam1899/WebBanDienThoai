const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    price_max: {
        type: Number
    },
    price_min: {
        type: Number
    },
    amount: {   // Tổng số lượng các sản phẩm
        type: Number
    },
    discount:{
        type: Number
    },
    pathseo: {
        type: String,
        unique: true
    },
    warrently: {   
        type: Number
    },
    bigimage: {     //Thumbnail
        type: Schema.Types.ObjectId,
        ref: "Image"
    },
    image: [{       // Bỏ
        type: Schema.Types.ObjectId,
        ref: "Image"
    }],
    category: {     
        type: Schema.Types.ObjectId, 
        ref: "Category"
    },
    brand: {        
        type: Schema.Types.ObjectId,
        ref: "Brand"
    },
    specifications: [{
        _id: {
            type: Schema.Types.ObjectId,
            ref: "Specification" 
        },
        name: {
            type: String
        },
        value: {
            type: String
        }
    }],
    colors: [{
        _id: {
            type: Schema.Types.ObjectId,
            ref: "Color" 
        },
        name_en: {
            type: String
        },
        name_vn: {
            type: String
        },
        image: {
            type: Schema.Types.ObjectId,
            ref: "Image"
        },
        image_link: {
            type: String
        },
        amount: {
           type: Number 
        },
        price: {
           type: Number
        }
    }],
    overallReview: {
        type: Number
    },
    
}, {
    timestamps: true
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product