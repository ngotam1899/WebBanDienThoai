const Brand = require('../models/Brand');
const Image = require('../models/Image');
const imageController = require('./image');

const createError = require('http-errors');
const Validator = require('../validators/validator');

const getAllBrand = async (req, res, next) => {
	try {
		const brands = await Brand.find().populate('image');
		return res.status(200).json({ success: true, code: 200, message: '', brands: brands });
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
