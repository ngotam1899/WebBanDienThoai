const Brand = require('../models/Brand');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Image = require('../models/Image');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const imageController = require('./image');
const Validator = require('../validators/validator');

const getAllBrand = async (req, res, next) => {
	try {
		let condition = {};
		if (req.query.keyword != undefined && req.query.keyword != '') {
			let keyword = req.query.keyword.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
			condition.name = {$regex: '.*' + keyword.trim() + '.*', $options: 'i'};
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
		const total = await Brand.countDocuments(condition);
		const brands = await Brand.find(condition)
		.populate({path: 'image', select: 'public_url'})
		.limit(limit)
		.skip(limit * page);
		return res.status(200).json({ success: true, code: 200, message: '', total, brands });
	} catch (error) {
		return next(error);
	}
};

const getAllBrandByKeyword = async (req, res, next) => {
	try {
		var condition = {
			'active': true
		}
		if (req.query.keyword != undefined && req.query.keyword != '') {
			let keyword = req.query.keyword.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
			condition['$or'] = [
				{name: { $regex: '.*' + keyword.trim() + '.*', $options: 'i' }},
				{desc_text: { $regex: '.*' + keyword.trim() + '.*', $options: 'i' }}
			];
		}
		if (req.query.category != undefined && req.query.category != '') {
			if (Validator.isValidObjId(req.query.category)) {
				condition['category'] = ObjectId(req.query.category);
				/* Filter area */
				const categoryFound = await Category.findById(req.query.category);
				var filter = categoryFound.filter;
				if(filter.length > 0){
					var specCondition = []
					filter.map(item => {
						if (req.query[`${item.query}`] != undefined && req.query[`${item.query}`] != '') {
							if (Validator.isValidObjId(req.query[`${item.query}`])) {
								var value = req.query[`${item.query}`]
								specCondition.push({specifications: { $elemMatch: { selection : ObjectId(value) }}})
								condition['$and']= specCondition;
							}
						}
					})
				}
				/* Filter area */
			}
		}
		if (req.query.min_p != undefined || req.query.max_p != undefined) {
			if(req.query.min_p == undefined){
				condition['price_min'] = { $lte: parseInt(req.query.max_p) }
			}
			if(req.query.max_p == undefined){
				condition['price_min'] = { $gte: parseInt(req.query.min_p) }
			}
			else{
				condition['price_min'] = { $lte: parseInt(req.query.max_p) || 50000000, $gte: parseInt(req.query.min_p) || 0 };
			}
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
			{
				'$sort': { 'count': -1, '_id': -1 }
			}
		];
		const brands = await Product.aggregate(pipeline);
		const total = await Product.aggregate(pipeline).count("total");
		await Brand.populate(brands, {path: "_id", select: ['name', 'image'], populate: {path: 'image', select: 'public_url'}});
		return res.status(200).json({ success: true, code: 200, message: '', total: total[0].total, brands });
	} catch (error) {
		return next(error);
	}
}

const accessoryBrand = async (req, res, next) => {
	try {
		var accessories = await Category.find({ accessories: true }, { _id: 1 });
		for(let i=0; i<accessories.length; i++){
			accessories[i] = ObjectId(accessories[i]._id)
		}
		const pipeline = [
			{
				'$match': {'active': true, 'category' : { '$in': accessories }}
			},
			{	'$group': 	
				{
					'_id': '$brand',
					'count': { '$sum': 1 }
				}
			},
			{
				'$sort': { 'count': -1, '_id': -1 }
			}
		];
		const brands = await Product.aggregate(pipeline);
		await Brand.populate(brands, {path: "_id", select: ['name', 'image'], populate: {path: 'image', select: 'public_url'}});
		return res.status(200).json({ success: true, code: 200, message: '', brands });
	} catch (error) {
		return next(error);
	}
}

const addBrand = async (req, res, next) => {
	try {
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
	} catch (error) {
		return next(error);
	}
};
const updateBrand = async (req, res, next) => {
	try {
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
	} catch (error) {
		return next(error);
	}
};
const deleteBrand = async (req, res, next) => {
	try {
		const { IDBrand } = req.params;
		const isValid = await Validator.isValidObjId(IDBrand);
		if (!isValid) {
			return res.status(200).json({ success: false, code: 400, message: 'id brand is not correctly' });
		} else {
			const result = await Brand.findByIdAndDelete(IDBrand);
			if (result) return res.status(200).json({ success: true, code: 200, message: '' });
		}
	} catch (error) {
		return next(error);
	}
};
const getDetailBrand = async (req, res, next) => {
	try {
		const { IDBrand } = req.params;
		const isValid = await Validator.isValidObjId(IDBrand);
		if (!isValid) {
			return res.status(200).json({ success: false, code: 400, message: 'id Brand is not correctly' });
		} else {
			const result = await Brand.findById(IDBrand).populate('image');
			return res.status(200).json({ success: true, code: 200, message: '', category: result });
		}
	} catch (error) {
		return next(error);
	}
};

module.exports = {
	getAllBrand,
	getAllBrandByKeyword,
	addBrand,
	updateBrand,
	deleteBrand,
	getDetailBrand,
	accessoryBrand
};
