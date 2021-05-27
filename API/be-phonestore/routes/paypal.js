const router = require("express-promise-router")()

const payPalController = require('../controllers/payPal')

router.route('/').get(payPalController.getPayPal)
router.route('/success').get(payPalController.successPayPal)
router.route('/cancel').get(payPalController.cancelPayPal)

module.exports = router