const express = require('express')
const router = require("express-promise-router")()

const commentController = require('../controllers/comment')
const brandController = require('../controllers/brand')
const categoryController = require('../controllers/category')
const displayController = require('../controllers/display')
const revolutionController = require('../controllers/revolution')
const colorController = require('../controllers/color')
const cpuController = require('../controllers/cpu')
const widescreenController = require('../controllers/widescreen')
const operationController = require('../controllers/operation')
const mobileController = require('../controllers/phone')
const productController = require('../controllers/product')
const imageController = require('../controllers/image')
const earphoneController = require('../controllers/earphone')

const passport = require('passport')
require('../middlewares/passport')

//Region Brand
router.route('/brands')
    .get(brandController.getAllBrand)
    .post(brandController.addBrand)
router.route('/brands/image')
    .get(imageController.getAllImageBrand)
    .post(imageController.uploadImageBrand)
router.route('/brands/:IDBrand')
    .get(brandController.getDetailBrand)
    .put(brandController.updateBrand)
    .delete(brandController.deleteBrand)
router.route('/brands/image/:IDImage')
    .get(imageController.getAllImageBrand)

//Region CateGory
router.route('/categorys')
    .get(categoryController.getAllCategory)
    .post(categoryController.addCategory)
router.route('/categorys/:IDCategory')
    .put(categoryController.updateCategory)
    .delete(categoryController.deleteCategory)
router.route('/categorys/:IDCategory')
    .get(categoryController.getDetailCategory)


//Region Display
router.route('/displays')
    .get(displayController.getAllDisplay)
    .post(displayController.addDisplay)
router.route('/displays/:IDDisplay')
    .put(displayController.updateDisplay)
    .delete(displayController.deleteDisplay)

//Region Revolution
router.route('/revolutions')
    .get(revolutionController.getAllRevolution)
    .post(revolutionController.addRevolution)
router.route('/revolutions/:IDRevolution')
    .put(revolutionController.updateRevolution)
    .delete(revolutionController.deleteRevolution)

//Region Color
router.route('/colors')
    .get(colorController.getAllColor)
    .post(colorController.addColor)
router.route('/colors/:IDColor')
    .put(colorController.updateColor)
    .delete(colorController.deleteColor)
    .get(colorController.getDetailColor)

//Region CPU
router.route('/cpus')
    .get(cpuController.getAllCPU)
    .post(cpuController.addCPU)
router.route('/cpus/:IDCPU')
    .put(cpuController.updateCPU)
    .delete(cpuController.deleteCPU)

//Region Widescreen
router.route('/widescreens')
    .get(widescreenController.getAllWideScreen)
    .post(widescreenController.addWideScreen)
router.route('/widescreens/:IDWideScreen')
    .put(widescreenController.updateWideScreen)
    .delete(widescreenController.deleteWidecreen)

//Region Operation
router.route('/operations')
    .get(operationController.getAllOperation)
    .post(operationController.addOperation)
router.route('/operations/:IDOperation')
    .get(operationController.getDetailOperation)
    .put(operationController.updateOperation)
    .delete(operationController.deleteOperation)

//Region comment
router.route('/').get(productController.getAllProduct)
router.route('/follow-brand/:IDBrand').get(productController.getAllProductByBrand)
router.route('/follow-category/:IDCategory').get(productController.getAllProductByCategory)
router.route('/follow-color/:IDColor').get(productController.getAllProductByColor)
router.route('/comment')
    .post(passport.authenticate('jwt', { session: false }), commentController.addComment)

//Region Mobile
router.route('/phones')
    .get(mobileController.getAllMobile)
    .post(mobileController.addproduct)
router.route('/phones/brands/:IDBrand')
    .get(mobileController.getAllProductByBrand)
router.route('/phones/colors/:IDColor')
    .get(mobileController.getAllProductByColor)
router.route('/phones/:IDProduct')
    .get(mobileController.getproduct)
router.route('/phones/:IDProduct')
    .put(mobileController.updateproduct)
router.route('/phones/:IDProduct')
    .delete(mobileController.deleteproduct)

router.route('/image')
    .get(imageController.getAllImg)
    .post(imageController.uploadImage)

router.route('/image/:IDImage')
    .get(imageController.getImage)
    .delete(imageController.deleteImage)

router.route('/earphones')
    .get(earphoneController.getAllEarPhone)
    .post(earphoneController.addproduct)
router.route('/earphones/brands/:IDBrand')
    .get(mobileController.getAllProductByBrand)
router.route('/earphones/:IDProduct')
    .put(earphoneController.updateproduct)
    .delete(earphoneController.deleteproduct)
router.route('/earphones/:IDProduct')
    .get(mobileController.getproduct)

module.exports = router