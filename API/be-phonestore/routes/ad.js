const router = require("express-promise-router")()

const adController = require('../controllers/ad')

const passport = require('passport');
require('../middlewares/passport');

router.route('/')
  .get(adController.getAllAd)
  .post(passport.authenticate('jwt', { session: false }), adController.addAd)

router.route('/:IDAd')
  .get(adController.getDetailAd)
  .put(passport.authenticate('jwt', { session: false }), adController.updateAd)
	.delete(passport.authenticate('jwt', { session: false }), adController.deleteAd);

module.exports = router