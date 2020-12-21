const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ImageSchema = new Schema({
    id_cloud: {
        type: String
    },
    name: {
        type: String
    },
    public_url: {
        type: String
    },
    /*use: [{
        type: Schema.Types.ObjectId,
        ref: "Product"
    }]*/
})

const Image_Pro = mongoose.model('Image_Pro', ImageSchema)

module.exports = Image_Pro