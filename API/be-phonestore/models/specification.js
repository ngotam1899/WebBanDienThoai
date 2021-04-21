const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SpecificationSchema = new Schema({
	name: {
		type: String,
		unique: true
	},
	selections: [{
		type: String
	}]
});

SpecificationSchema.pre('findOneAndDelete', function(next) {
	try {
		mongoose
			.model('Category')
			.updateMany(
				{ specifications: this._conditions._id },
				{ $pull: { specifications: this._conditions._id } },
				next
      );
		mongoose
			.model('Product')
			.updateMany(
				{  },
				{ $pull: { specifications: {_id: this._conditions._id} } },
				{ multi:true },
				next
      );
	} catch (error) {
		next(error);
	}
});

const Specification = mongoose.model('Specification', SpecificationSchema);

module.exports = Specification;
