const express = require('express')
const router = require("express-promise-router")()
const userController = require('../controllers/user')

const passport = require('passport')
require('../middlewares/passport')

router.route('/')
    .get(userController.getAllUser)
    .post(userController.newUser)

router.route('/signin')
    .post(passport.authenticate('local', { session: false }), userController.signIn)

router.route('/signup')
    .post(userController.signUp)

router.route('/secret')
    .get(passport.authenticate('jwt', { session: false }), userController.secret)

router.route('/:userID')
    .get(userController.getUser)
    .put(userController.replaceUser)

module.exports = router