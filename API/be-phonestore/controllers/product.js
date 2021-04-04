const Comment = require('../models/Comment');
const Image_Pro = require('../models/Image_Pro');
const Validator = require('../validators/validator');
const cloudinary = require('cloudinary');
const Specification = require('../models/specification');
const Brand = require('../models/Brand');
const Category = require('../models/Category');
const Color = require('../models/Color');
const Product = require('../models/Product');

const getAllProduct = async (req, res, next) => {
	try {
		let condition = {};
		if (req.query.keyword != undefined && req.query.keyword != '') {
			let keyword = req.query.keyword.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
			condition.name = { $regex: '.*' + keyword.trim() + '.*', $options: 'i' };
		}
		if (req.query.brand != undefined && req.query.brand != '') {
			if (Validator.isValidObjId(req.query.brand)) {
				condition.brand = req.query.brand;
			}
		}
		if (req.query.category != undefined && req.query.category != '') {
			if (Validator.isValidObjId(req.query.category)) {
				condition.category = req.query.category;
			}
		}
		if (req.query.color != undefined && req.query.color != '') {
		}
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
		let sort = {};
		if (req.query.sort_n != undefined && req.query.sort_n != '0') {
			sort['name'] = req.query.sort_n == '1' ? 1 : -1;
		}

		if (req.query.sort_p != undefined && req.query.sort_p != '0') {
			sort['price'] = req.query.sort_p == '1' ? 1 : -1;
		}

		if (req.query.min_p != undefined || req.query.max_p != undefined) {
			condition.price = { $lte: req.query.max_p || 10000000, $gte: req.query.min_p || 0 };
		}
		let products;
		if (req.query.color != undefined && req.query.color != '') {
			products = await Product.find(condition)
				.populate({ path: 'bigimage', select: 'public_url' })
				.sort(sort)
				.limit(limit)
				.skip(limit * page);
		} else {
			products = await Product.find(condition)
				.populate({ path: 'bigimage', select: 'public_url' })
				.sort(sort)
				.limit(limit)
				.skip(limit * page);
		}
		let count = await Product.countDocuments(condition);
		return res
			.status(200)
			.json({
				success: true,
				code: 200,
				message: '',
				page: page,
				limit: limit,
				total: count,
				products: products
			});
	} catch (error) {
		return next(error);
	}
};
const searchProduct = async (req, res, next) => {
	try {
		const products = await Product.find()
			.populate({ path: 'bigimage', select: 'public_url' })
			.populate({ path: 'image', select: 'public_url' });
		return res.status(200).json({ success: true, code: 200, message: '', products: products });
	} catch (error) {
		return next(error);
	}
};

const updateProduct = async (req, res, next) => {
	try {
		const { IDProduct } = req.params;
		const {
			name,
			price,
			amount,
			pathseo,
			warrently,
			bigimage,
			image,
			category,
			brand,
			specifications,
			colors,
			discount
		} = req.body;

		const product = await Product.findById(IDProduct);
		if (!product)
			return res.status(200).json({ success: false, code: 404, message: 'Can not found product need to update' });

		if (name) {
			const productFound = await Product.findOne({ name })
			if(productFound) return res.status(200).json({ success: false, code: 404, message: 'Product had stored' });
			else product.name = name;
		}
		if (price) product.price = price;
		if (amount) product.amount = amount;
		if (pathseo) {
			const productFound = await Product.findOne({ pathseo })
			if(productFound) return res.status(200).json({ success: false, code: 404, message: 'Product had stored' });
			else product.pathseo = pathseo;
		}
		if (warrently) product.warrently = warrently;
		if (bigimage) product.bigimage = bigimage;
		if (discount) product.discount = discount;
		if (image) product.image = image;
		if (category) {
			console.log()
			const is_category = await Category.findById(category);
			if (!is_category)
				return res.status(200).json({ success: false, code: 404, message: 'category is identify' });
			product.category = category;
		}
		if (brand) {
			const is_brand = await Brand.findById(brand);
			if (!is_brand) return res.status(200).json({ success: false, code: 404, message: 'brand is identify' });
			product.brand = brand;
		}
		if (specifications) {
			var specificationArray=[];
			for (let item of specifications) {
				let specificationFound = await Specification.findById(item._id);
				if (specificationFound) {
					let _id = specificationFound._id;
					let name = specificationFound.name;
					let value = item.value;
					specificationArray.push({ _id, name, value })
				}
			}
			product.specifications = specificationArray;
		}
		if (colors) {
			var colorArray=[];
			for (let item of colors) {
				let colorFound = await Color.findById(item._id);
				if (colorFound) {
					let _id = colorFound._id;
					let name_en = colorFound.name_en;
					let name_vn = colorFound.name_vn;
					let amount = item.amount;
					let price = item.price;
					let image = item.image;
					colorArray.push({ _id, name_en, name_vn, amount, price, image });
				}
			}
			let priceArray =[];
			colorArray.map(item =>{
				priceArray.push(item.price)
			})
			product.price_max = Math.max(...priceArray)
			product.price_min = Math.min(...priceArray)
			product.colors = colorArray;
		}
		await product.save();
		return res.status(200).json({ success: true, code: 200, message: '' });
	} catch (error) {
		return next(error);
	}
};

const addProduct = async(req, res, next) => {
	try {
		const { name, price, amount, pathseo, warrently, bigimage, image, category, brand, specifications,
			colors,
			discount } = req.body
		const product = new Product();
		if (name) {
			const productFound = await Product.findOne({ name })
			if(productFound) return res.status(200).json({ success: false, code: 404, message: 'Product had stored' });
			else product.name = name;
		}
		if (price) product.price = price;
		if (amount) product.amount = amount;
		if (pathseo) {
			const productFound = await Product.findOne({ pathseo })
			if(productFound) return res.status(200).json({ success: false, code: 404, message: 'Product had stored' });
			else product.pathseo = pathseo;
		}
		if (warrently) product.warrently = warrently;
		if (bigimage) product.bigimage = bigimage;
		if (discount) product.discount = discount;
		if (image) product.image = image
		if (category) {
			const is_category = await Category.findById(category)
			if (!is_category) return res.status(200).json({ success: false, code: 404, message: 'category is identify' })
			product.category = category
		}
		if (brand) {
			const is_brand = await Brand.findById(brand)
			if (!is_brand) return res.status(200).json({ success: false, code: 404, message: 'brand is identify' })
			product.brand = brand;
		}
		if (specifications) {
			var specificationArray=[];
			for (let item of specifications) {
				let specificationFound = await Specification.findById(item._id);
				if (specificationFound) {
					let _id = specificationFound._id;
					let name = specificationFound.name;
					let value = item.value;
					specificationArray.push({ _id, name, value })
				}
			}
			product.specifications = specificationArray;
		}
		if (colors) {
			var colorArray=[];
			for (let item of colors) {
				let colorFound = await Color.findById(item._id);
				if (colorFound) {
					let _id = colorFound._id;
					let name_en = colorFound.name_en;
					let name_vn = colorFound.name_vn;
					let amount = item.amount;
					let price = item.price;
					let image = item.image;
					colorArray.push({ _id, name_en, name_vn, amount, price, image });
				}
			}
			let priceArray =[];
			colorArray.map(item =>{
				priceArray.push(item.price)
			})
			product.price_max = Math.max(...priceArray)
			product.price_min = Math.min(...priceArray)
			product.colors = colorArray;
		}
		await product.save()
		return res.status(201).json({
			success: true,
			code: 201,
			product
		})
	} catch (error) {
		return next(error)
	}
}
const deleteProduct = async(req, res, next) => {
	try {
		const { IDProduct } = req.params
		const product = await Product.findById(IDProduct)
		if (!product) return res.status(200).json({ success: false, code: 404, message: 'The product is not exist' })
		await Product.findByIdAndDelete(IDProduct)
		return res.status(200).json({ success: true, code: 200, message: 'success' })
	} catch (error) {
		next(error)
	}
}
const getProductDetail = async(req, res, next) => {
	try {
		const { IDProduct } = req.params
		const product = await Product.findById(IDProduct)
			.populate({ path: 'category', select: 'name' })
			.populate({ path: 'brand', select: 'name' })
			.populate({ path: 'bigimage', select: 'public_url' })
			.populate({ path: 'image', select: 'public_url' });

		return res.status(200).json({ success: true, code: 200, message: '', product })
	} catch (error) {
		return next(error)
	}
}

module.exports = {
	getAllProduct,
	getProductDetail,
	searchProduct,
	updateProduct,
	addProduct,
	deleteProduct
};
