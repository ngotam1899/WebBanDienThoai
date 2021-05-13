const Review = require('../models/Review')
const Product = require('../models/Product');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const getAllProductReView = async(req, res, next) => {
  try {
    let condition = {};
    if (req.query.product != undefined) {
			condition.product = req.query.product;
    }
    if (req.query.user != undefined) {
			condition.user = req.query.user;
    }
    let limit = 3;
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
    const reviews = await Review.find(condition)
    .populate({ path: 'user', select: ["image", "firstname", "lastname"], populate : {path : 'image', select: "public_url"} })
    .populate({ path: 'color', select: "name_vn"})
    .limit(limit)
    .skip(limit * page)
    const pipeline = [
      {'$match': {'product': ObjectId(condition.product)}},
      {	'$group': 	
        {
          '_id': '$rating',
          'count': { '$sum': 1 }
        }
      },
    ];
    const count = await Review.aggregate(pipeline)
		let total = await Review.countDocuments(condition);
    return res.status(200).json({ success: true, code: 200, page, limit, total,count, reviews })
  } catch {
    new next(error)
  }
}

const getAProductReView = async (req, res, next) => {
	try {
    let condition = {};
    if (req.query.product != undefined) {
			condition.product = req.query.product;
    }
    if (req.query.user != undefined) {
			condition.user = req.query.user;
    }
    if (req.query.color != undefined) {
			condition.color = req.query.color;
    }
    const review = await Review.findOne(condition)
    .populate({ path: 'color', select: "name_vn"});
		return res.status(200).json({ success: true, code: 200, message: '', review });
	} catch (error) {
		return next(error);
	}
};

const addReview = async(req, res, next) => {
  try {
    const {content, user, product, rating, color} = req.body;
    const newReview = new Review({content, user, product, rating, color})
    await newReview.save();
    // Cập nhật rating của product
    const reviews = await Review.find({ product });
    var ratingTotal = 0;
    reviews.map(item =>{
      ratingTotal += item.rating;
    })
    const productFound = await Product.findById(product);
    productFound.stars = (ratingTotal/ reviews.length).toFixed(2);
    productFound.reviewCount = reviews.length;
    await productFound.save()
    
    return res.status(200).json({ 
      success: true,
      code: 201,
      review: newReview 
    })
  } catch (error) {
    return next(error);
  }
}

const updateReview = async(req, res, next) => {
  try {
    const { IDReview } = req.params;
    const {product, like} = req.body;
    const result = await Review.findByIdAndUpdate(IDReview, req.body);
    // Cập nhật rating của product
    if(product && !like){
      const reviews = await Review.find({ product });
      var ratingTotal = 0;
      reviews.map(item =>{
        ratingTotal += item.rating;
      })
      const productFound = await Product.findById(product);
      productFound.stars = (ratingTotal/ reviews.length).toFixed(2);
      await productFound.save()
    }
    if (!result) {
      return res.status(200).json({ success: 'false', code: 400, message: 'id review is not correctly' })
    }
    return res.status(200).json({ success: 'true', code: 200, review: result })
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getAllProductReView,
  getAProductReView,
  addReview,
  updateReview
}