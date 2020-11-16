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
    }
})

const Image_User = mongoose.model('Image_User', ImageSchema)

module.exports = Image_User