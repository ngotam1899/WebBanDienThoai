const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
	{
		content: {
			type: String
		},
		rating: {
			type: Number
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		product: {
			type: Schema.Types.ObjectId,
			ref: 'Product'
		},
		color: {
			type: Schema.Types.ObjectId,
			ref: 'Color'
		},
		like: [
			{
				type: Schema.Types.ObjectId,
				ref: 'User'
			}
		]
	},
	{
		timestamps: true
	}
);

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;
