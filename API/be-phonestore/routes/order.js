const express = require('express')
const router = require("express-promise-router")()

const orderController = require('../controllers/order')

const passport = require('passport')


router.route('/')
    .get(orderController.getAllOrder)
router.route('/')
    .post(passport.authenticate('jwt', { session: false }), orderController.addOrder)
router.route('/find')
    .get(orderController.findOrderByPhone)
router.route('/:IDOrder')
    .get(orderController.getAnOrder)
    .delete(orderController.deleteOrder)
router.route('/:IDUser/order-list')
    .get(orderController.userGetOrder)
router.route('/email/:IDOrder')
    .get(passport.authenticate('jwt', { session: false }), orderController.requestSendEmail)
router.route('/confirm/:tokenOrder')
    .get(orderController.confirmOrder)
router.route('/finish/:IDOrder')
    .get(orderController.finishOrder)
module.exports = router