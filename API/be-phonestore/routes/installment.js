const router = require("express-promise-router")()
const installmentController = require('../controllers/installment')
const passport = require('passport')

router.route('/')
  .get(passport.authenticate('jwt', { session: false }), installmentController.getAllInstallment)
  .post(passport.authenticate('jwt', { session: false }), installmentController.addInstallment)
router.route('/session-installment')
  .get(passport.authenticate('jwt', { session: false }), installmentController.sessionInstallment)
router.route('/:IDInstallment')
  .get(passport.authenticate('jwt', { session: false }), installmentController.getDetailInstallment)
  .put(passport.authenticate('jwt', { session: false }), installmentController.updateInstallment)
  .delete(passport.authenticate('jwt', { session: false }), installmentController.deleteInstallment)

module.exports = router;