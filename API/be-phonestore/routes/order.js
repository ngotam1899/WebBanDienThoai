const express = require('express')
const router = require("express-promise-router")()

const orderController = require('../controllers/order')

const passport = require('passport')


router.route('/')
    .get(orderController.getAllOrder)
router.route('/')
    .get(orderController.findOrderByPhone)
    .post(passport.authenticate('jwt', { session: false }), orderController.addOrder)
router.route('/:IDOrder')
    .get(orderController.getAnOrder)
router.route('/:IDUser/order-list')
    .get(orderController.userGetOrder)
router.route('/email/:IDOrder')
    .get(passport.authenticate('jwt', { session: false }), orderController.requestSendEmail)
router.route('/confirm/:tokenOrder')
    .get(orderController.confirmOrder)
router.route('/finish/:IDOrder')
    .get(orderController.finishOrder)
module.exports = router