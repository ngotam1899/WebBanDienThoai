const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    },
    amount: {   // Tổng số lượng các sản phẩm
        type: Number
    },
    pathseo: {
        type: String
    },
    warrently: {    //Bỏ
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
}, {
    timestamps: true
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product