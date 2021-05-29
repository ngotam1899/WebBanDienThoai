const router = require('express-promise-router')();

const brandController = require('../controllers/brand');
const categoryController = require('../controllers/category');
const commentController = require('../controllers/comment');
const colorController = require('../controllers/color');
const groupController = require('../controllers/group')
const productController = require('../controllers/product');
const selectorController = require('../controllers/selector')
const specificationController = require('../controllers/specification');

const passport = require('passport');
require('../middlewares/passport');

// Region Brand
router.route('/brands').get(brandController.getAllBrand).post(brandController.addBrand);
router
	.route('/brands/:IDBrand')
	.get(brandController.getDetailBrand)
	.put(brandController.updateBrand)
	.delete(brandController.deleteBrand);

// Region CateGory
router.route('/categorys').get(categoryController.getAllCategory).post(categoryController.addCategory);
router
	.route('/categorys/:IDCategory')
	.put(categoryController.updateCategory)
	.delete(categoryController.deleteCategory)
	.get(categoryController.getDetailCategory);

// Region Specification
router
	.route('/specifications')
	.get(specificationController.getAllSpecification)
	.post(specificationController.addSpecification);
router
	.route('/specifications/:IDSpecification')
	.put(specificationController.updateSpecification)
	.delete(specificationController.deleteSpecification)
	.get(specificationController.getDetailSpecification);

// Region Color
router.route('/colors').get(colorController.getAllColor).post(colorController.addColor);
router
	.route('/colors/:IDColor')
	.put(colorController.updateColor)
	.delete(colorController.deleteColor)
	.get(colorController.getDetailColor);

	// Region Selector
router.route('/selectors').post(selectorController.addSelector);
router.route('/selectors/:IDSelector').delete(colorController.deleteColor)
/* 	.get(colorController.getDetailColor);
.put(colorController.updateColor)
 */
// Region Group
router
	.route('/groups')
	.get(groupController.getAllGroup)
	.post(groupController.addGroup);
router
	.route('/groups/:IDGroup')
	.put(groupController.updateGroup)
	.delete(groupController.deleteGroup)
	.get(groupController.getDetailGroup);

router.route('/best-seller').get(productController.bestSellerProduct)
router.route('/favorite').get(productController.favoriteProduct)
router.route('/newest').get(productController.newestProduct)
router.route('/cluster').get(productController.clusterData)
router.route('/').get(productController.getAllProduct).post(productController.addProduct);
router.route('/:IDProduct')
  .get(productController.getProductDetail)
  .put(productController.updateProduct)
	.delete(productController.deleteProduct);


router.route('/:IDProduct/activate').put(productController.activateProduct)
router.route('/:IDProduct/deactivate').put(productController.deactivateProduct)

router.route('/comment').post(passport.authenticate('jwt', { session: false }), commentController.addComment);

module.exports = router;
