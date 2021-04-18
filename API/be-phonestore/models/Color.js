const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ColorSchema = new Schema({
	name_vn: {
		type: String,
		unique: true
	},
	name_en: {
		type: String,
		unique: true
	},
	code: {
		type: String
	}
});

ColorSchema.pre('findOneAndDelete', function(next) {
	try {
		mongoose
			.model('Product')
			.updateMany({}, { $pull: { colors: { _id: this._conditions._id } } }, { multi: true }, next);
	} catch (error) {
		next(error);
	}
});

const Color = mongoose.model('Color', ColorSchema);

module.exports = Color;
