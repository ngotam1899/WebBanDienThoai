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

const passport = require('passport')
require('../middlewares/passport')

//Region Brand
router.route('/brands')
    .get(brandController.getAllBrand)
    .post(brandController.addBrand)
router.route('/brands/:IDBrand')
    .put(brandController.updateBrand)

//Region CateGory
router.route('/categorys')
    .get(categoryController.getAllCategory)
    .post(categoryController.addCategory)
router.route('/categorys/:IDCategory')
    .put(categoryController.updateCategory)

//Region Display
router.route('/displays')
    .get(displayController.getAllDisplay)
    .post(displayController.addDisplay)
router.route('/displays/:IDDisplay')
    .put(displayController.updateDisplay)

//Region Revolution
router.route('/revolutions')
    .get(revolutionController.getAllRevolution)
    .post(revolutionController.addRevolution)
router.route('/revolutions/:IDRevolution')
    .put(revolutionController.updateRevolution)

//Region Color
router.route('/colors')
    .get(colorController.getAllColor)
    .post(colorController.addColor)
router.route('/colors/:IDColor')
    .put(colorController.updateColor)

//Region CPU
router.route('/cpus')
    .get(cpuController.getAllCPU)
    .post(cpuController.addCPU)
router.route('/cpus/:IDCPU')
    .put(cpuController.updateCPU)

//Region Widescreen
router.route('/widescreens')
    .get(widescreenController.getAllWideScreen)
    .post(widescreenController.addWideScreen)
router.route('/widescreens/:IDWideScreen')
    .put(widescreenController.updateWideScreen)

//Region Operation
router.route('/operations')
    .get(operationController.getAllOperation)
    .post(operationController.addOperation)
router.route('/operations/:IDOperation')
    .put(operationController.updateOperation)

//Region comment
router.route('/comment')
    .post(passport.authenticate('jwt', { session: false }), commentController.addComment)

router.route('/phones')
    .get(mobileController.getAllMobile)
    .post(mobileController.addMobile)
router.route('/phones/:IDMobile/update')
    .put(mobileController.updateMobile)


module.exports = router