const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
	name: {
		type: String,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	content: {
		type: String,
	},
	isAdmin: {
		type: Boolean,
	}
},{
	timestamps: true // createAt, updateAt
});

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;
