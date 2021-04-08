const router = require('express-promise-router')();
const imageController = require('../controllers/image');

router.route('/').post(imageController.uploadImage);

module.exports = router