const Validator = require('../validators/validator');

const Brand = require('../models/Brand');
const Category = require('../models/Category');
const Color = require('../models/Color');
const Group = require('../models/group');
const Image = require('../models/Image');
const Order = require('../models/Order');
const Product = require('../models/Product');
const Specification = require('../models/specification');

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
			sort['price_min'] = req.query.sort_p == '1' ? 1 : -1;
		}
		if (req.query.active != undefined && req.query.active != '0') {
			condition.active = req.query.active=='1' ? true : false || undefined;
		}
		if (req.query.min_p != undefined || req.query.max_p != undefined) {
			condition.price = { $lte: req.query.max_p || 10000000, $gte: req.query.min_p || 0 };
		}
		let products;
		products = await Product.find(condition, {specifications : 0, colors: 0, image:0, warrently: 0, description: 0, group: 0})
			.populate({ path: 'bigimage', select: 'public_url' })
			.populate({ path: 'brand', select: "image", populate : {path : 'image', select: "public_url"} })
			.sort(sort)
			.limit(limit)
			.skip(limit * page);
		let count = await Product.countDocuments(condition);
		return res
			.status(200)
			.json({
				success: true,
				code: 200,
				message: '',
				page,
				limit,
				total: count,
				products
			});
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
			discount,
			group,
			description,
			weight,
			height,
			length,
			width,
		} = req.body;
		const product = await Product.findById(IDProduct);
		if (!product) return res.status(200).json({ success: false, code: 404, message: 'Can not found product need to update' });
		if (name) product.name = name;
		if (price) product.price = price;
		if (amount) product.amount = amount;
		if (pathseo) product.pathseo = pathseo;
		if (warrently) product.warrently = warrently;
		if (bigimage) product.bigimage = bigimage;
		if (discount) product.discount = discount;
		if (image) product.image = image;
		if (description) product.description = description;
		if (weight) product.weight = weight;
		if (height) product.height = height;
		if (length) product.length = length;
		if (width) product.width = width;
		if (category) {
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
		if (group) {
			const is_group = await Group.findById(group);
			if (!is_group) return res.status(200).json({ success: false, code: 404, message: 'group is identify' });
			product.group = group;
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
					let image = await Image.findById(item.image);
					if(image){
						let image_link = image.public_url
						colorArray.push({ _id, name_en, name_vn, amount, price, image, image_link });
					}
					else{
						colorArray.push({ _id, name_en, name_vn, amount, price });
					}
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
		const { name, price, amount, pathseo, warrently, bigimage, image, category, brand, specifications, description, group,
			colors,
			weight,
			height,
			length,
			width,
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
		if (description) product.description = description;
		if (weight) product.weight = weight;
		if (height) product.height = height;
		if (length) product.length = length
		if (width) product.width = width;
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
		if (group) {
			const is_group = await Group.findById(group);
			if (!is_group) return res.status(200).json({ success: false, code: 404, message: 'group is identify' });
			product.group = group;
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
			.populate({ path: 'category', select: ['name', 'pathseo'] })
			.populate({ path: 'brand', select: 'name' })
			.populate({ path: 'group', select: 'name' })
			.populate({ path: 'bigimage', select: 'public_url' })
			.populate({ path: 'image', select: 'public_url' });
		return res.status(200).json({ success: true, code: 200, message: '', product })
	} catch (error) {
		return next(error)
	}
}

const deactivateProduct = async (req, res, next) => {
	try {
		const { IDProduct } = req.params;
		const product = await Product.findById(IDProduct);
		if (!product)	return res.status(200).json({ success: false, code: 404, message: 'Can not found product' });
		product.active = false;
		await product.save();
		return res.status(200).json({ success: true, code: 200, product });
	} catch (error) {
		return next(error)
	}
}

const activateProduct = async (req, res, next) => {
	try {
		const { IDProduct } = req.params;
		const product = await Product.findById(IDProduct);
		if (!product)	return res.status(200).json({ success: false, code: 404, message: 'Can not found product' });
		product.active = true;
		await product.save();
		return res.status(200).json({ success: true, code: 200, product });
	} catch (error) {
		return next(error)
	}
}

const bestSellerProduct = async (req, res, next) => {
	const pipeline = [
		{ 
			'$unwind': "$order_list",	// lấy ra param order_list[] chia đều thành mảng các object
			
		},
		{ '$project': { 'order_list': 1, '_id' : 0 } },	// chỉ hiển thị field order_list
		{	'$group': 	
			{
				'_id': '$order_list.product',
				'count': { '$sum': 1 }
			}
		},
		{
			'$sort': { 'count': -1 }
		}, {
			'$limit': 2
		},
	];
	const order = await Order.aggregate(pipeline);
	console.log(order)
	await Product.populate(order, {path: "_id", select: ['name', 'bigimage', 'stars', 'price_min', 'reviewCount', 'pathseo', 'active'], 
	populate : {path : 'bigimage', select: "public_url"} })
	return res.status(200).json({ success: true, code: 200, products: order });
}

const newestProduct = async (req, res, next) => {
	let products = await Product.find({active: true}, {specifications : 0, colors: 0, image:0, warrently: 0, description: 0, group: 0, category: 0, brand: 0, 
		createdAt: 0, updatedAt: 0, price_max: 0})
		.populate({ path: 'bigimage', select: 'public_url' })
		.limit(2)
		.sort({'createdAt' : -1})
	return res.status(200).json({ success: true, code: 200, products });
}

const favoriteProduct = async (req, res, next) => {
	const pipeline = [
		{
			'$sort': { 'stars': -1 }
		}, {
			'$limit': 2
		},
		{ '$project': { 'name': 1, 'bigimage': 1, 'stars': 1, 'price_min': 1, 'reviewCount': 1, 'pathseo': 1, 'active' : 1 } }
	];
	const products = await Product.aggregate(pipeline);
	await Image.populate(products, {path: "bigimage", select: 'public_url'})
	return res.status(200).json({ success: true, code: 200, products });
}

module.exports = {
	getAllProduct,
	getProductDetail,
	updateProduct,
	addProduct,
	deleteProduct,
	deactivateProduct,
	activateProduct,
	bestSellerProduct,
	favoriteProduct,
	newestProduct
};
