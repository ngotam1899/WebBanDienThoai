const Color = require('../models/Color');
const Validator = require('../validators/validator');

const getAllColor = async (req, res, next) => {
	try {
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
		const total = await Color.countDocuments();
		const colors = await Color.find()
		.limit(limit)
		.skip(limit * page);
		return res.status(200).json({ success: true, code: 200, message: '', total, colors });
	} catch (error) {
		return next(error);
	}
};

const addColor = async (req, res, next) => {
	try {
		const color = new Color(req.body);
		await color.save();
		return res.status(200).json({ success: true, code: 201, message: '', color });
	} catch (error) {
		return next(error);
	}
};

const updateColor = async (req, res, next) => {
	try {
		const { IDColor } = req.params;
		const color = req.body;
		const result = await Color.findByIdAndUpdate(IDColor, color);
		if (!result) {
			return res.status(200).json({ success: false, code: 400, message: 'id color is not correctly' });
		}
		return res.status(200).json({ success: true, code: 200, message: '' });
	} catch (error) {
		return next(error);
	}
};

const deleteColor = async (req, res, next) => {
	try {
		const { IDColor } = req.params;
		const isValid = await Validator.isValidObjId(IDColor);
		if (!isValid) {
			return res.status(200).json({ success: false, code: 400, message: 'id color is not correctly' });
		} else {
			const result = await Color.findByIdAndDelete(IDColor);
			if (result) return res.status(200).json({ success: true, code: 200, message: '' });
		}
	} catch (error) {
		return next(error);
	}
};

const getDetailColor = async (req, res, next) => {
	try {
		const { IDColor } = req.params;
		const isValid = await Validator.isValidObjId(IDColor);
		if (!isValid) {
			return res.status(200).json({ success: false, code: 400, message: 'id Brand is not correctly' });
		} else {
			const result = await Color.findById(IDColor);
			return res.status(200).json({ success: true, code: 200, message: '', category: result });
		}
	} catch (error) {
		return next(error);
	}
};

module.exports = {
	getAllColor,
	addColor,
	updateColor,
	deleteColor,
	getDetailColor
};
