const router = require("express-promise-router")()

const reviewController = require('../controllers/review')

router.route('/').post(reviewController.addReview)

router.route('/list').get(reviewController.getAllProductReView)
router.route('/detail').get(reviewController.getAProductReView)
router.route('/:IDReview').put(reviewController.updateReview)

module.exports = router