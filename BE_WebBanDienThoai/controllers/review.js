const Review = require('../models/Review')
const Shop = require('../models/Shop')

const createError = require('http-errors')
const User = require('../models/User')

const getReView = async(req, res, next) => {
    let shop
    let review
    try {
        shop = await Shop.find()

        if (!shop) {
            const error = createError(404, 'Could not found any item')
            return next(error)
        }

        review = await Review.find()

        if (!review) {
            const error = createError(404, 'Could not found any review')
            return next(error)
        }

        return res.status(200).json({ shop, review })

    } catch {
        const error = createError(500, "Something went wrong, try again!")
        return next(error)
    }
}

const newReview = async(req, res, next) => {
    const newReview = new Review(req.body)

    const user = await User.findById(req.body.user)

    if (!user) {
        const error = createError(404, "User's id does not exist")
        return next(error)
    }

    newReview.user = user._id
    await newReview.save()

    return res.status(201).json({ review: newReview })
}

const updateReview = async(req, res, next) => {
    const { reviewID } = req.params

    const newReview = req.body

    await Review.findByIdAndUpdate(reviewID, newReview);

    return res.status(200).json({ success: 'true' })
}

module.exports = {
    getReView,
    newReview,
    updateReview
}