const Order = require('../models/Order');
const Product = require('../models/Product');
const Image = require('../models/Image');
const Validator = require('../validators/validator');
const nodemailer = require('nodemailer');
const service = require('../services/service');
const JWT = require('jsonwebtoken');
const { JWT_SECRET, EMAIL_NAME, PASS } = require('../configs/config');

const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	service: 'gmail',
	port: 465,
	secure: true,
	auth: {
		type: 'login',
		user: EMAIL_NAME,
		pass: PASS
	},
	tls: {
		rejectUnauthorized: false
	}
});

const getAllOrder = async (req, res, next) => {
	try {
		let condition = {};
		if (req.query.keyword != undefined && req.query.keyword != '') {
			let keyword = req.query.keyword.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
			condition.order_list = { $elemMatch: {name: { $regex: '.*' + keyword.trim() + '.*', $options: 'i' }} }
			//elemMatch: duyệt vào mảng chứa object
		}
		if (req.query.paid != undefined && req.query.paid != '0') {
			condition.paid = req.query.paid == '1' ? true : false;
		}
		if (req.query.confirmed != undefined && req.query.confirmed != '0') {
			condition.confirmed = req.query.confirmed == '1' ? true : false;
		}
		if (req.query.active != undefined && req.query.active != '0') {
			condition.active = req.query.active == '1' ? true : false;
		}
		if (req.query.status != undefined) {
			condition.status = req.query.status;
		}
		if (req.query.user != undefined) {
			condition.user = req.query.user;
    }
    if (req.query.phone != undefined) {
			condition.shipping_phonenumber = req.query.phone;
		}
		let limit = 10;
		let page = 0;
		if (req.query.limit != undefined && req.query.limit != '') {
			const number_limit = parseInt(req.query.limit);
			if (number_limit && number_limit > 0) {
				limit = number_limit;
			}
		}
		if (req.query.page != undefined && req.query.page != '') {
			const number_page = parseInt(req.query.page);
			if (number_page && number_page > 0) {
				page = number_page;
			}
		}
		let sort = {};
		if (req.query.sort != undefined && req.query.sort != '0') {
			sort['createAt'] = req.query.sort == '1' ? 1 : -1;
		}
		const orders = await Order.find(condition)
		.populate({ path: 'order_list.color', select: 'name_vn' })
		.sort(sort)
		.limit(limit)
		.skip(limit * page);
		let total = await Order.countDocuments(condition);
		return res
			.status(200)
			.json({ success: true, code: 200, message: '', page, limit, total, orders });
	} catch (error) {
		return next(error);
	}
};
const addOrder = async (req, res, next) => {
	try {
		const {
			shipping_phonenumber,
			payment_method,
			email,
			shipping_address,
			note,
			total_price,
			total_quantity,
			order_list
		} = req.body;
		const userID = req.user._id;
		const order = new Order();
		if (!shipping_phonenumber)
			return res.status(200).json({ success: false, code: 400, massage: 'Phone Number is required' });
		order.shipping_phonenumber = shipping_phonenumber;
		if (!shipping_address)
			return res.status(200).json({ success: false, code: 400, message: 'Address is required' });
		order.shipping_address = shipping_address;
		if (note) order.note = note;
		if (!email) return res.status(200).json({ success: false, code: 400, message: 'Email is required' });
		order.email = email;
		if (!total_price)
			return res.status(200).json({ success: false, code: 400, message: 'Total Price is required' });
		order.total_price = total_price;
		if (!total_quantity)
			return res.status(200).json({ success: false, code: 400, message: 'Total Quantity is required' });
		order.total_quantity = total_quantity;
		if (payment_method == 'paypal') {
			order.paid = true;
			order.payment_method = 'paypal';
			order.confirmed = true;
		}
		if (order_list) {
			for (let item of order_list) {
				let productFound = await Product.findById(item.product);
				if (productFound) {
					let product = productFound._id;
					let name = productFound.name;
					let price = productFound.colors.find(i => i._id == item.color).price;
					if(productFound.colors.find(i => i._id == item.color).amount < item.quantity){
						return res.status(200).json({ success: true, code: 400, message: `Sản phẩm ${productFound.name} trong kho chỉ còn lại ${productFound.colors.find(i => i._id == item.color).amount}, không đủ số lượng giao hàng` });
					}
					// Đặt hàng thì cập nhật lại số lượng
					productFound.colors.find(i => i._id == item.color).amount = productFound.colors.find(i => i._id == item.color).amount - item.quantity;
					await productFound.save();
					let imageFound = await Image.findById(productFound.bigimage);
					if (imageFound) {
						var image = imageFound.public_url;
					}
					let quantity = item.quantity;
					let color = item.color;
					let name_color = productFound.colors.find(i => i._id == item.color).name_en
					await order.order_list.push({ product, name, price, image, quantity, color, name_color });
				}
			}
		}
		order.user = userID;
		await order.save();
		return res.status(200).json({ success: true, code: 201, message: 'success', order: order });
	} catch (error) {
		next(error);
	}
};

const getAnOrder = async (req, res, next) => {
	try {
		const { IDOrder } = req.params;
		const isValid = await Validator.isValidObjId(IDOrder);
		if (!isValid) return res.status(200).json({ success: false, code: 400, message: 'ID is not correctly' });
		const order = await Order.findById(IDOrder).populate({ path: 'order_list.color', select: 'name_vn' });
		return res.status(200).json({ success: true, code: 200, message: '', order: order });
	} catch (error) {
		return next(error);
	}
};

const updateOrder = async (req, res, next) => {
	try {
		const { IDOrder } = req.params;
		if (Validator.isValidObjId(IDOrder) == true) {
			const order = await Order.findById(IDOrder);
			if (!order) {
				return res.status(200).json({ success: false, code: 400, message: 'id không chính xác' });
			} else {
				const orderUpdate = req.body;
				const {status, active} = req.body;
				let result;
				if(status==1){
					result = await Order.findByIdAndUpdate(IDOrder, Object.assign(orderUpdate, {paid: true}));
				}
				else {
					// Hủy đơn hàng thì cập nhật lại số lượng
					if(active==false){
						for (let item of order.order_list){
							let productFound = await Product.findById(item.product);
							if(productFound){
								productFound.colors.find(i => i._id.toString() === item.color.toString()).amount = productFound.colors.find(i => i._id.toString() === item.color.toString()).amount + item.quantity;
								await productFound.save();
							}
						}
					}
					result = await Order.findByIdAndUpdate(IDOrder, orderUpdate);
				}
				if (!result) {
					return res.status(200).json({ success: false, code: 400, message: 'id không chính xác' });
				}
				return res.status(200).json({ success: true, code: 200, message: '' });
			}
		} else {
			return res.status(200).json({ success: false, code: 400, message: 'id không chính xác' });
		}
	} catch (error) {
		return next(error);
	}
};

const requestSendEmail = async (req, res, next) => {
	try {
		const { IDOrder } = req.params;
		const order = await Order.findById(IDOrder);
		if (!order || order.confirmed == true)
			return res
				.status(200)
				.json({ success: false, code: 404, message: 'Something wrong, can not found Order to confirm' });
		if (String(order.user) != String(req.user._id))
			return res.status(200).json({ success: false, code: 403, message: 'permission denied' });
		if (!order.email) return res.status(200).json({ success: false, code: 400, message: 'email of order is null' });

		await sendEmail(order.email, order._id);
		return res.status(200).json({ message: 'success', 'send to: ': order.email });
	} catch (error) {
		next(error);
	}
};
const sendEmail = async (email, IDOrder) => {
	const token = service.encodedToken(IDOrder, '1h');
	const url = 'https://localhost:5000/#/order/active/' + token;
	const at = {
		from: '"admin@be-phonestore.herokuapp.com" <admin@be-phonestore.herokuapp.com/>',
		to: email,
		subject: 'Confirm Order',
		text: '',
		html:
			'<h2>Confirm Order PhoneStore</h2><p>Click <a href="' +
			url +
			'">here</a> to confirm order by PhoneStore</p>'
	};
	transporter.sendMail(at, async (err, response) => {
		if (err) {
		} else {
			console.log(response);
		}
	});
};

const confirmOrder = async (req, res, next) => {
	try {
		const { tokenOrder } = req.params;
		if (tokenOrder) {
			JWT.verify(tokenOrder, JWT_SECRET, async (err, decodeToken) => {
				if (err) {
					return res.status(200).json({ success: false, code: 400, message: 'Incorect or Expired link' });
				}
				const IDOrder = decodeToken.sub;
				const order = await Order.findById(IDOrder);

				if (!order) {
					return res.status(200).json({ success: false, code: 400, message: 'Incorect Link' });
				}
				order.confirmed = true;
				order.status = -1;
				await order.save();
				return res.status(200).json({ message: true, code: 200, message: 'Confirm Successfull' });
			});
		}
	} catch (error) {
		return next(error);
	}
};

const deleteOrder = async (req, res, next) => {
	const { IDOrder } = req.params;
	let is_valid = await Validator.isValidObjId(IDOrder);
	if (!is_valid) return res.status(200).json({ success: false, code: 400, message: 'id is not correctly' });

	let result = await Order.findByIdAndDelete(IDOrder);
	if (result) {
		return res.status(200).json({ success: true, code: 200, message: 'removed' });
	} else {
		return res.status(200).json({ success: false, code: 400, message: 'id is not correctly' });
	}
};

// Doanh thu mỗi ngày, mỗi tháng, mỗi quí
const revenue = async (req, res, next) => {
	const today = new Date();
	try {
		let condition = {};
		if (req.query.browse != undefined && req.query.browse != '') {
			switch(req.query.browse){
				case 'day':
					condition.browse = {
						'$match': { 
							'_id.year' : today.getFullYear(), 
							'_id.month' : today.getMonth() + 1, 
							'_id.day': today.getDate()
						}
					}
					break;
				case 'month':
					condition.browse = { 
						'$match': { 
							'_id.year' : today.getFullYear(), 
							'_id.month' : today.getMonth() + 1 
						},
					}
					break;
				case 'year':
					condition.browse = {
						'$match': { 
							'_id.year' : today.getFullYear()
						}
					}
					break;
				default:
					condition.browse = {
						'$project': { 
							'_id' : 1, 'total_price': 1, 'total_quantity': 1
						}
					};
			}
		}
		else{
			condition.browse = {
				'$project': { 
					'_id' : 1, 'total_price': 1, 'total_quantity': 1
				}
			};
		}
		const pipeline = [
			{'$match': {'paid': true}},
			{
				'$group':
				{
					'_id':  {						
						day: {'$dayOfMonth': '$createdAt'}, 
						month: {'$month': '$createdAt'}, 
						year: {'$year': '$createdAt'}
					},
					'total_price': { 
						'$sum': `$total_price` 
					},
					'total_quantity': { 
						'$sum': `$total_quantity` 
					}
				}
			},
			{ '$sort': { '_id.year': 1, '_id.month': 1, '_id.day': 1} },
			condition.browse
		];
		const order = await Order.aggregate(pipeline);
		const total_price = order.reduce((accumulator, currentValue) => accumulator + currentValue.total_price, 0);
		const total_quantity = order.reduce((accumulator, currentValue) => accumulator + currentValue.total_quantity, 0);
		return res
			.status(200)
			.json({ success: true, code: 200, message: '',total_price,total_quantity});
	} catch (error) {
		return next(error);
	}
};

// Số lượng order mỗi ngày, mỗi tháng, mỗi quí
const sessionOrder = async (req, res, next) => {
	const today = new Date();
	try {
		let condition = {};
		if (req.query.browse != undefined && req.query.browse != '') {
			switch(req.query.browse){
				case 'day':
					condition.browse = {
						'$match': { 
							'_id.year' : today.getFullYear(), 
							'_id.month' : today.getMonth() + 1, 
							'_id.day': today.getDate()
						}
					}
					break;
				case 'month':
					condition.browse = { 
						'$match': { 
							'_id.year' : today.getFullYear(), 
							'_id.month' : today.getMonth() + 1 
						}
					}
					break;
				case 'year':
					condition.browse = {
						'$match': { 
							'_id.year' : today.getFullYear()
						}
					}
					break;
				default:
					condition.browse = {
						'$project': { 
							'_id' : 1, 'count': 1
						}
					};
			}
		}
		else{
			condition.browse = {
				'$project': { 
					'_id' : 1, 'count': 1
				}
			};
		}
		const pipeline = [
			{
				'$group':
				{
					'_id':  {						
						day: {'$dayOfMonth': '$createdAt'}, 
						month: {'$month': '$createdAt'}, 
						year: {'$year': '$createdAt'}
					},
					'count': {
						'$sum': 1
					}
				}
			},
			{ '$sort': { '_id.year': 1, '_id.month': 1, '_id.day': 1} },
			condition.browse
		];
		const order = await Order.aggregate(pipeline);
		const count = order.reduce((accumulator, currentValue) => accumulator + currentValue.count, 0);
		return res
			.status(200)
			.json({ success: true, code: 200, message: '', count, order});
	} catch (error) {
		return next(error);
	}
};

// Danh sách doanh thu trong khoảng thời gian
const revenueList = async (req, res, next) => {
	try {
		let condition = {};
		if (req.query.browse_from != undefined && req.query.browse_from != '' && req.query.browse_to != undefined && req.query.browse_to != '' ) {
			condition.browse_from = req.query.browse_from;
			condition.browse_to = req.query.browse_to;
		}
		const pipeline = [
			{
				'$match': {
					'paid': true,
					'createdAt': {
						'$lte': new Date(condition.browse_to),
						'$gte': new Date(condition.browse_from)
					}
				}
			},
			{
				'$group':
				{
					'_id':  {
						month: {'$month': '$createdAt'}, 
						year: {'$year': '$createdAt'}
					},
					'total_price': { 
						'$sum': `$total_price` 
					},
					'total_quantity': { 
						'$sum': `$total_quantity` 
					}
				}
			},
			{ '$sort': { '_id.year': 1, '_id.month': 1, '_id.day': 1} }
		];
		const order = await Order.aggregate(pipeline);
		return res
			.status(200)
			.json({ success: true, code: 200, message: '', order});
	} catch (error) {
		return next(error);
	}
};

module.exports = {
	getAllOrder,
	getAnOrder,
	addOrder,
	updateOrder,
	requestSendEmail,
	deleteOrder,
	confirmOrder,
	revenue,
	revenueList,
	sessionOrder,
};
