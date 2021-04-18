const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BrandSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    image: {
        type: Schema.Types.ObjectId,
        ref: 'Image'
    }
})

BrandSchema.pre('findOneAndDelete', function(next) {
	mongoose.model('Product').remove({ brand: this._conditions._id }, next);
});

const Brand = mongoose.model('Brand', BrandSchema)

module.exports = Brand