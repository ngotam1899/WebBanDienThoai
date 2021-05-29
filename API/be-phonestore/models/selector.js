const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SelectorSchema = new Schema({
  name: {
    type: String
  }
})

SelectorSchema.pre('findOneAndDelete', function(next) {
	try {
		mongoose
			.model('Specification')
			.updateMany(
				{ selections: this._conditions._id },
				{ $pull: { selections: this._conditions._id } },
				next
      );
    } catch (error) {
		next(error);
	}
});

const Selector = mongoose.model('Selector', SelectorSchema)

module.exports = Selector