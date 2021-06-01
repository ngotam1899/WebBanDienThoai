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
	content: {
		type: String,
	},
	active: {
		type: Boolean,
		default: true
	}
},{
	timestamps: true // createAt, updateAt
});

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;
