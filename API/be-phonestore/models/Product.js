const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    name: {
        type: String
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
        type: String
    },
    warrently: {   
        type: Number
    },
    bigimage: {     //Thumbnail
        type: Schema.Types.ObjectId,
        ref: "Image_Pro"
    },
    image: [{       // Bỏ
        type: Schema.Types.ObjectId,
        ref: "Image_Pro"
    }],
    category: {     
        type: Schema.Types.ObjectId, 
        ref: "Category"
    },
    brand: {        
        type: Schema.Types.ObjectId,
        ref: "Brand"
    },
    detail_info: {  
        mobile: {
            type: Schema.Types.ObjectId,
            ref: "Mobile"
        },
        earphone: {
            type: Schema.Types.ObjectId,
            ref: "EarPhone"
        }
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
            type: String
        },
        amount: {
           type: Number 
        },
        price: {
           type: Number
        }
    }]
}, {
    timestamps: true
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product