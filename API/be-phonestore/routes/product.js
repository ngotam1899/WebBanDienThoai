const express = require('express');
const router = require('express-promise-router')();

const commentController = require('../controllers/comment');
const brandController = require('../controllers/brand');
const categoryController = require('../controllers/category');
const specificationController = require('../controllers/specification');
const displayController = require('../controllers/display');
const revolutionController = require('../controllers/revolution');
const colorController = require('../controllers/color');
const cpuController = require('../controllers/cpu');
const widescreenController = require('../controllers/widescreen');
const operationController = require('../controllers/operation');
const productController = require('../controllers/product');
const imageController = require('../controllers/image');

const passport = require('passport');
require('../middlewares/passport');

//Region Brand
router.route('/brands').get(brandController.getAllBrand).post(brandController.addBrand);
router.route('/brands/image').post(imageController.uploadImageBrand);
router
	.route('/brands/:IDBrand')
	.get(brandController.getDetailBrand)
	.put(brandController.updateBrand)
	.delete(brandController.deleteBrand);

//Region CateGory
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

//Region Display
router.route('/displays').get(displayController.getAllDisplay).post(displayController.addDisplay);
router.route('/displays/:IDDisplay').put(displayController.updateDisplay).delete(displayController.deleteDisplay);

//Region Revolution
router.route('/revolutions').get(revolutionController.getAllRevolution).post(revolutionController.addRevolution);
router
	.route('/revolutions/:IDRevolution')
	.put(revolutionController.updateRevolution)
	.delete(revolutionController.deleteRevolution);

//Region Color
router.route('/colors').get(colorController.getAllColor).post(colorController.addColor);
router
	.route('/colors/:IDColor')
	.put(colorController.updateColor)
	.delete(colorController.deleteColor)
	.get(colorController.getDetailColor);

//Region CPU
router.route('/cpus').get(cpuController.getAllCPU).post(cpuController.addCPU);
router.route('/cpus/:IDCPU').put(cpuController.updateCPU).delete(cpuController.deleteCPU);

//Region Widescreen
router.route('/widescreens').get(widescreenController.getAllWideScreen).post(widescreenController.addWideScreen);
router
	.route('/widescreens/:IDWideScreen')
	.put(widescreenController.updateWideScreen)
	.delete(widescreenController.deleteWidecreen);

//Region Operation
router.route('/operations').get(operationController.getAllOperation).post(operationController.addOperation);
router
	.route('/operations/:IDOperation')
	.get(operationController.getDetailOperation)
	.put(operationController.updateOperation)
	.delete(operationController.deleteOperation);

router.route('/').get(productController.getAllProduct).post(productController.addProduct);
router.route('/:IDProduct')
  .get(productController.getProductDetail)
  .put(productController.updateProduct)
  .delete(productController.deleteProduct);

router.route('/comment').post(passport.authenticate('jwt', { session: false }), commentController.addComment);

router.route('/image').post(imageController.uploadImage);


module.exports = router;
