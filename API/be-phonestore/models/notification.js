const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
	name: {
		type: String,
	},
	user: {							// notification cho mỗi user
		type: Schema.Types.ObjectId,
		ref: 'User',
		default: null
	},
	image: {
		type: Schema.Types.ObjectId,
		ref: 'Image',
	},
	content: {
		type: String,
	},
	active: {
		type: Boolean,
		default: true
	},
	type: {						// 0: đơn hàng, 1: event
		type: Number
	}
},{
	timestamps: true // createAt, updateAt
});

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;
