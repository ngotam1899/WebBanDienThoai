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
router.route('/brands')
	.get(brandController.getAllBrand)
	.post(passport.authenticate('jwt', { session: false }), brandController.addBrand);
router.route('/brands-search')
	.get(brandController.getAllBrandByKeyword)
router.route('/brands/accessory')
	.get(brandController.accessoryBrand)
router.route('/brands/:IDBrand')
	.get(passport.authenticate('jwt', { session: false }), brandController.getDetailBrand)
	.put(passport.authenticate('jwt', { session: false }), brandController.updateBrand)
	.delete(passport.authenticate('jwt', { session: false }), brandController.deleteBrand);

// Region CateGory
router.route('/categories-search')
	.get(categoryController.getAllCategorySortByKeyword)
router.route('/categories')
	.get(categoryController.getAllCategory)
	.post(passport.authenticate('jwt', { session: false }), categoryController.addCategory);
router.route('/categories/:IDCategory')
	.put(passport.authenticate('jwt', { session: false }), categoryController.updateCategory)
	.delete(passport.authenticate('jwt', { session: false }), categoryController.deleteCategory)
	.get(categoryController.getDetailCategory);

// Region Specification
router.route('/specifications')
	.get(passport.authenticate('jwt', { session: false }), specificationController.getAllSpecification)
	.post(passport.authenticate('jwt', { session: false }), specificationController.addSpecification);
router.route('/specifications/:IDSpecification')
	.put(passport.authenticate('jwt', { session: false }), specificationController.updateSpecification)
	.delete(passport.authenticate('jwt', { session: false }), specificationController.deleteSpecification)
	.get(passport.authenticate('jwt', { session: false }), specificationController.getDetailSpecification);

// Region Color
router.route('/colors')
	.get(colorController.getAllColor)
	.post(passport.authenticate('jwt', { session: false }), colorController.addColor);
router.route('/colors/:IDColor')
	.put(passport.authenticate('jwt', { session: false }), colorController.updateColor)
	.delete(passport.authenticate('jwt', { session: false }), colorController.deleteColor)
	.get(passport.authenticate('jwt', { session: false }), colorController.getDetailColor);

	// Region Selector
router.route('/selectors')
	.post(passport.authenticate('jwt', { session: false }), selectorController.addSelector);
router.route('/selectors/:IDSelector')
	.delete(passport.authenticate('jwt', { session: false }), selectorController.deleteSelector)

// Region Group
router.route('/groups')
	.get(groupController.getAllGroup)
	.post(passport.authenticate('jwt', { session: false }), groupController.addGroup);
router.route('/groups/:IDGroup')
	.put(passport.authenticate('jwt', { session: false }), groupController.updateGroup)
	.delete(passport.authenticate('jwt', { session: false }), groupController.deleteGroup)
	.get(groupController.getDetailGroup);

router.route('/best-seller')
	.get(productController.bestSellerProduct)

router.route('/favorite')
	.get(productController.favoriteProduct)

router.route('/newest')
	.get(productController.newestProduct)

router.route('/cluster')
	.get(productController.clusterData)

router.route('/accessory')
	.get(productController.accessoryProduct)

router.route('/compare')
	.get(productController.compareProduct)

router.route('/')
	.get(productController.getAllProduct)
	.post(passport.authenticate('jwt', { session: false }), productController.addProduct);
router.route('/:IDProduct')
  .get(productController.getProductDetail)
  .put(passport.authenticate('jwt', { session: false }), productController.updateProduct)
	.delete(passport.authenticate('jwt', { session: false }), productController.deleteProduct);

router.route('/:IDProduct/activate')
	.put(passport.authenticate('jwt', { session: false }), productController.activateProduct)
router.route('/:IDProduct/deactivate')
	.put(passport.authenticate('jwt', { session: false }), productController.deactivateProduct)

router.route('/like/:IDProduct')
  .get(productController.likeProducts)
router.route('/relate/:IDProduct')
  .get(productController.relateProducts)

router.route('/comment')
	.post(passport.authenticate('jwt', { session: false }), commentController.addComment);

module.exports = router;
