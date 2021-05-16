const Brand = require('../models/Brand');
const Product = require('../models/Product');
const Image = require('../models/Image');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const imageController = require('./image');
const Validator = require('../validators/validator');

const getAllBrand = async (req, res, next) => {
	try {
		var condition = {
			'active': true
		}
		if (req.query.keyword != undefined && req.query.keyword != '') {
			let keyword = req.query.keyword.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
			condition['name'] = { $regex: '.*' + keyword.trim() + '.*', $options: 'i' };
		}
		if (req.query.category != undefined && req.query.category != '') {
			if (Validator.isValidObjId(req.query.category)) {
				condition['category'] = ObjectId(req.query.category);
			}
		}
		if (req.query.min_p != undefined || req.query.max_p != undefined) {
			condition['price_min'] = { $lte: parseInt(req.query.max_p) || 10000000, $gte: parseInt(req.query.min_p) || 0 };
		}
		const pipeline = [
			{
				'$match': condition
			},
			{	'$group': 	
				{
					'_id': '$brand',
					'count': { '$sum': 1 }
				}
			},
		];
		const count = await Product.aggregate(pipeline);
		await Brand.populate(count, {path: "_id", select: ['name']});
		const brands = await Brand.find().populate({path: 'image', select: 'public_url'});
		return res.status(200).json({ success: true, code: 200, message: '', count, brands });
	} catch (error) {
		return next(error);
	}
};
const addBrand = async (req, res, next) => {
	const {name} = req.body;
  const newBrand = new Brand();
  if (name) newBrand.name = name;
  if (req.files){
    const {image} = req.files;
    const newImage = await imageController.upload(image,Image)
    newBrand.image = newImage._id;
  }
	await newBrand.save();
	return res.status(200).json({ success: true, code: 201, message: '', brand: newBrand });
};
const updateBrand = async (req, res, next) => {
	const { IDBrand } = req.params;
  const {name} = req.body;
  const brand = await Brand.findById(IDBrand);
  if (name) brand.name = name;
  if (req.files){
    const {image} = req.files;
    const newImage = await imageController.upload(image,Image)
    brand.image = newImage._id;
  }
	await brand.save();
	return res.status(200).json({ success: true, code: 200, data: brand });
};
const deleteBrand = async (req, res, next) => {
	const { IDBrand } = req.params;
	const isValid = await Validator.isValidObjId(IDBrand);
	if (!isValid) {
		return res.status(200).json({ success: false, code: 400, message: 'id brand is not correctly' });
	} else {
		const result = await Brand.findByIdAndDelete(IDBrand);
		if (result) return res.status(200).json({ success: true, code: 200, message: '' });
	}
};
const getDetailBrand = async (req, res, next) => {
	const { IDBrand } = req.params;
	const isValid = await Validator.isValidObjId(IDBrand);
	if (!isValid) {
		return res.status(200).json({ success: false, code: 400, message: 'id Brand is not correctly' });
	} else {
		const result = await Brand.findById(IDBrand).populate('image');
		return res.status(200).json({ success: true, code: 200, message: '', category: result });
	}
};

module.exports = {
	getAllBrand,
	addBrand,
	updateBrand,
	deleteBrand,
	getDetailBrand
};
