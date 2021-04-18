const Review = require('../models/Review')
const Product = require('../models/Product');

const Validator = require('../validators/validator')
//const User = require('../models/User')

const getProductReView = async(req, res, next) => {
  const { IDProduct } = req.params;
  try {
    const isValid = await Validator.isValidObjId(IDProduct);
    if (!isValid) return res.status(200).json({ success: false, code: 400, message: 'ProductID is not correctly' });
    const reviews = await Review.find({ product: IDProduct });
    return res.status(200).json({ success: true, code: 200, reviews })
  } catch {
    new next(error)
  }
}

const addReview = async(req, res, next) => {
  const {content, user, product, rating} = req.body;
  const newReview = new Review({content, user, product, rating})
  await newReview.save();
  // Cập nhật rating của product
  const reviews = await Review.find({ product });
  var ratingTotal = 0;
  reviews.map(item =>{
    ratingTotal += item.rating;
  })
  const productFound = await Product.findById(product);
  productFound.stars = (ratingTotal/ reviews.length).toFixed(2);
  await productFound.save()
  
  return res.status(200).json({ 
    success: true,
    code: 201,
    review: newReview 
  })
}

const updateReview = async(req, res, next) => {
  const { reviewID } = req.params
  const result = await Review.findByIdAndUpdate(reviewID, req.body)
  if (!result) {
    return res.status(200).json({ success: 'false', code: 400, message: 'id review is not correctly' })
  }
  return res.status(200).json({ success: 'true', code: 200, review: result })
}

module.exports = {
  getProductReView,
  addReview,
  updateReview
}