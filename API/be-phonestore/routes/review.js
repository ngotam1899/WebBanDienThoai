const router = require("express-promise-router")()

const reviewController = require('../controllers/review')

router.route('/').post(reviewController.addReview)

router.route('/:IDProduct/review-list').get(reviewController.getProductReView)

router.route('/:reviewID').put(reviewController.updateReview)

module.exports = router