const User = require('../models/User');
const bcrypts = require('bcryptjs');
const Validator = require('../validators/validator');
const service = require('../services/service');
/* SEND_EMAIL */
const nodemailer = require('nodemailer');
const JWT = require('jsonwebtoken');
const { JWT_SECRET, EMAIL_NAME, PASS } = require('../configs/config');
/* GOOGLE_ANALYTICS */
const { google } = require('googleapis')
const scopes = 'https://www.googleapis.com/auth/analytics.readonly'
const key = require("../mongodb-api-training-aff257b47418.json")
const jwt = new google.auth.JWT(process.env.CLIENT_EMAIL, null, key.private_key, scopes)
const view_id = process.env.VIEW_ID

const hashString = async (textString) => {
	const salt = await bcrypts.genSalt(15);
	return await bcrypts.hash(textString, salt);
};

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
});

const authGoogle = async (req, res, next) => {
	const user = req.user;
	const token = 'Bearer ' + service.encodedToken(req.user._id, '6h');
	user.token = token;
	user.save();
	await user.populate('image').execPopulate();

	res.setHeader('authorization', token);
	return res.status(200).json({ success: true, code: 200, message: '', user: user });
};

const authFacebook = async (req, res, next) => {
	try {
		const user = req.user;
		const token = 'Bearer ' + service.encodedToken(user._id, '6h');
		res.setHeader('authorization', token);
		user.token = token;
		await user.save();
		await user.populate('image').execPopulate();
		return res.status(200).json({ success: true, code: 200, message: '', user: user });
	} catch (error) {
		next(error);
	}
};
const logOut = async (req, res, next) => {
	headers = req.headers;
	headers.authorization = headers.authorization.replace('Bear ', '');
	JWT.verify(headers.authorization.trim(), JWT_SECRET, async (err, decodeToken) => {
		const user = await User.findById(decodeToken.sub);
		user.token = '';
		await user.save();
	});
	return res.status(200).json({ success: true, message: 'logout success', code: 200 });
};

const signIn = async (req, res, next) => {
	if (req.user.confirmed == false) {
		sendEmail(req.user._id);
		return res
			.status(200)
			.json({ success: false, code: 403, message: 'An email activate have send to' + req.user.email });
	}
	const token = 'Bearer ' + service.encodedToken(req.user._id, '6h');
	const user = req.user;
	user.token = token;
	await user.save();
	res.setHeader('Authorization', token);
	return res.status(200).json({ success: true, code: 200, message: '', user: req.user });
};

const changePassword = async (req, res, next) => {
	try {
		const { password, new_password } = req.body;
		const user = await User.findById(req.user._id);
		if(user.password){
			if (!password) return res.status(200).json({ success: false, code: 400, message: 'Please insert old password' });
			if (!new_password) return res.status(200).json({ success: false, code: 400, message: 'Please insert new password' });
			if (password == new_password)
				res.status(200).json({ success: false, code: 400, message: 'New password is incorrectly' });
			const result = await user.isSignin(password);
			if (!result) return res.status(200).json({ success: false, code: 400, message: 'Old password is incorrect' });
			else {
				user.password = await hashString(new_password);
				await user.save();
				return res.status(200).json({ success: true, code: 200, message: 'Password change' });
			}
		}
		else{
			if (!new_password) return res.status(200).json({ success: false, code: 400, message: 'Please insert new password' });
			else {
				user.password = await hashString(new_password);
				user.confirmed = true;
				await user.save();
				return res.status(200).json({ success: true, code: 200, message: 'Password change' });
			}
		}
	} catch (error) {
		next(error);
	}
};

const activeAccount = async (req, res, next) => {
	try {
		const { tokenUser } = req.params;
		if (tokenUser) {
			JWT.verify(tokenUser, JWT_SECRET, async (err, decodeToken) => {
				if (err) {
					return res.status(200).json({ success: false, code: 400, message: 'Incorect or Expired link' });
				}
				const email = decodeToken.sub;
				const user = await User.findOne({ email });
				if (!user) {
					return res.status(200).json({ success: false, code: 400, message: 'Incorect Link' });
				}
				user.confirmed = true;
				await user.save();
				return res.status(200).json({ success: true, code: 200, message: 'Activate Successfull' });
			});
		}
	} catch (error) {}
};

const activePassword = async (req, res, next) => {
	try {
		const { tokenUser } = req.params;
		const { password } = req.body;
		if (tokenUser) {
			JWT.verify(tokenUser, JWT_SECRET, async (err, decodeToken) => {
				if (err) {
					return res.status(200).json({ success: false, code: 400, message: 'Incorect or Expired link' });
				}
				const email = decodeToken.sub;
				const user = await User.findOne({ email });
				if (!user) {
					return res.status(200).json({ success: false, code: 400, message: 'Incorect Link' });
				}
				user.password = await hashString(password);
				await user.save();
				return res.status(200).json({ success: true, code: 200, message: 'Activate Successfull' });
			});
		}
	} catch (error) {}
};

const signUp = async (req, res, next) => {
	try {
		const { firstname, lastname, phonenumber, address, image, email, password, role } = req.body;
		const foundUser = await User.findOne({ email });
		if (foundUser) {
			return res.status(200).json({ success: false, code: 403, message: 'Email is already to use' });
		}
		const newUser = new User({ firstname, lastname, phonenumber, address, image, email, role });
		newUser.password = await hashString(password);
		sendEmail(email);
		await newUser.save();
		return res.status(200).json({ success: true, code: 200, message: '' });
	} catch (error) {
		next(error);
	}
};

const sendEmail = (email) => {
	const token = service.encodedToken(email, '1h');
	const url = 'https://localhost:5000/#/account/active/' + token;
	const at = {
		from: '"admin@be-phonestore.herokuapp.com" <admin@be-phonestore.herokuapp.com/>',
		to: email,
		subject: 'Activate Account',
		text: 'Click button below to active',
		html: '<h2> Activate Account</h2><p>Click <a href="' + url + '">here</a> to active your account</p>'
	};
	transporter.sendMail(at, async (err, response) => {
		if (err) {
		} else {
			console.log(response);
		}
	});
};

const forgotPassword = async (req, res, next) => {
	try {
		const { email } = req.body;
		const foundUser = await User.findOne({ email });
		if (!foundUser) {
			return res.status(200).json({ success: false, code: 403, message: 'Email is not sign up' });
		}
		sendEmailPassword(email);
		return res.status(200).json({ success: true, code: 200, message: '' });
	} catch (error) {
		next(error);
	}
};

const sendEmailPassword = (email) => {
	const token = service.encodedToken(email, '1h');
	const url = 'https://localhost:5000/#/account/active-password/' + token;
	const at = {
		from: '"admin@be-phonestore.herokuapp.com" <admin@be-phonestore.herokuapp.com/>',
		to: email,
		subject: 'Activate Password',
		text: 'Click button below to active',
		html: '<h2> Activate Password</h2><p>Click <a href="' + url + '">here</a> to activate your account and select a password!</p>'
	};
	transporter.sendMail(at, async (err, response) => {
		if (err) {
		} else {
			console.log(response);
		}
	});
};

const getAllUser = async (req, res, next) => {
	try {
		let limit = 5;
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
		const users = await User.find().limit(limit).skip(limit * page);;
		let total = await User.countDocuments()
		return res.status(200).json({ 
			success: true, 
			code: 200, 
			message: '',
			page,
			limit,
			total, 
			users 
		});
	} catch (error) {
		return next(error);
	}
};

const getUser = async (req, res, next) => {
	try {
		const { userID } = req.params;
		const user = await User.findById(userID).populate({ path: 'image', select: 'public_url' });

		return res.status(200).json({ success: true, code: 200, message: '', user: user });
	} catch (error) {
		return next(error);
	}
};

const newUser = async (req, res) => {
	const newUser = new User(req.body);
	await newUser.save();
	return res.status(200).json({ success: true, code: 201, message: '', user: newUser });
};

const updateUser = async (req, res, next) => {
	try {
		const { userID } = req.params;
		const newUser = req.body;
		const user = await User.findById(userID);
		if (!user) {
			return res.status(200).json({ success: false, code: 404, message: 'Can not found user need to update' });
		}
		newUser.email = user.email;
		newUser.password = user.password;
		await user.update(newUser);
		return res.status(200).json({ success: true, code: 200, message: '' });
	} catch (error) {}
};

const returnUserByToken = async (req, res, next) => {
	try {
		return res.status(200).json({ success: true, code: 200, message: 'success', user: req.user });
	} catch (error) {}
};

const deleteUser = async (req, res, next) => {
	const { userID } = req.params;
	const isValid = await Validator.isValidObjId(userID);
	if (!isValid) {
		return res.status(200).json({ success: false, code: 400, message: 'id user is not correctly' });
	} else {
		const result = await User.findByIdAndDelete(userID);
		if (result) return res.status(200).json({ success: true, code: 200, message: '' });
	}
};

const findUserByPhone = async (req, res, next) => {
	const phone = req.query.phone;
	const user = await User.findOne({ phonenumber: phone });
	return res.status(200).json({ success: true, code: 200, message: '', user: user });
};

const onlineUsers = async (req, res, next) => {
	const defaults = {
    "auth": jwt,
    "ids": "ga:" + view_id,
	}
  await jwt.authorize()
	const result = await google.analytics('v3').data.realtime.get({
    ...defaults,
		'metrics': 'rt:activeUsers',
	})
	return res.status(200).json({ success: true, code: 200, message: '', total: result.data.rows ? result.data.rows[0][0] : 0 });	
};

const sessionUsers = async (req, res, next) => {
	let condition = {};
	const today =  new Date();
	if (req.query.browse != undefined && req.query.browse != '') {
		switch(req.query.browse){
			case 'day':
				condition.browse = 'today'
				break;
			case 'month':
				const thisMonth = today.getMonth()+1 < 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1;
				condition.browse = `${today.getFullYear()}-${thisMonth}-01`
				break;
			case 'year':
				condition.browse = `${today.getFullYear()}-01-01`
				break;
			default:
				condition.browse = 'today';
		}
	}
	else {
		condition.browse = 'today';
	}
	const defaults = {
    "auth": jwt,
    "ids": "ga:" + view_id,
	}
  await jwt.authorize()
  const result = await google.analytics('v3').data.ga.get({
    ...defaults,
    'start-date': condition.browse,
    'end-date': 'today',
		'metrics': 'ga:sessions'
		/* 'metrics': 'ga:users' */
	})
	return res.status(200).json({ success: true, code: 200, message: '', total: result.data.rows ? result.data.rows[0][0] : 0 });
};

module.exports = {
	authGoogle,
	authFacebook,
	getAllUser,
	getUser,
	newUser,
	updateUser,
	signIn,
	signUp,
	logOut,
	returnUserByToken,
	activeAccount,
	activePassword,
	forgotPassword,

	deleteUser,
	changePassword,
	findUserByPhone,

	sessionUsers,
	onlineUsers
};
