const Review = require('../models/Review')

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
  const newReview = new Review(req.body)
  await newReview.save()
  return res.status(200).json({ 
    success: true,
    code: 201,
    review: newReview 
  })
}

const updateReview = async(req, res, next) => {
  const { reviewID } = req.params
  const newReview = req.body
  const result = await Review.findByIdAndUpdate(reviewID, newReview)
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