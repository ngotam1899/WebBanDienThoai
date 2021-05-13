const Brand = require('../models/Brand');
const Product = require('../models/Product');
const Image = require('../models/Image');
const imageController = require('./image');
const Validator = require('../validators/validator');

const getAllBrand = async (req, res, next) => {
	try {
		if (req.query.keyword != undefined && req.query.keyword != '') {
			let keyword = req.query.keyword.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
			condition.name = { $regex: '.*' + keyword.trim() + '.*', $options: 'i' };
		}
		if (req.query.category != undefined && req.query.category != '') {
			if (Validator.isValidObjId(req.query.category)) {
				condition.category = req.query.category;
			}
		}
		let sort = {};
		if (req.query.sort_n != undefined && req.query.sort_n != '0') {
			sort['name'] = req.query.sort_n == '1' ? 1 : -1;
		}

		if (req.query.sort_p != undefined && req.query.sort_p != '0') {
			sort['price'] = req.query.sort_p == '1' ? 1 : -1;
		}
		if (req.query.active != undefined && req.query.active != '0') {
			condition.active = req.query.active=='1' ? true : false || undefined;
		}
		if (req.query.min_p != undefined || req.query.max_p != undefined) {
			condition.price = { $lte: req.query.max_p || 10000000, $gte: req.query.min_p || 0 };
		}
		const pipeline = [
/* 			{	'$group': 	
				{
					'_id': '$order_list.product',
					'count': { '$sum': 1 }
				}
			}, */
		];
		//const brands = await Product.aggregate(pipeline);
		const brands = await Brand.find().populate({path : 'image', select: "public_url"});
		return res.status(200).json({ success: true, code: 200, message: '', brands });
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
