const express = require('express')
const router = require("express-promise-router")()
const userController = require('../controllers/user')
const imageController = require('../controllers/image')

const passport = require('passport')
require('../middlewares/passport')

router.route('/')
    .get(userController.getAllUser)
    .post(userController.newUser)

router.route('/signin')
    .post(passport.authenticate('local', { session: false }), userController.signIn)

router.route('/signup')
    .post(userController.signUp)

router.route('/logout')
    .get(passport.authenticate('jwt', { session: false }), userController.logOut)

router.route('/:userID')
    .get(userController.getUser)
    .put(userController.replaceUser)

router.route('/image')
    .get(imageController.getAllImgUser)
    .post(imageController.uploadImageUser)

router.route('/image/:IDImage')
    .get(imageController.getImageUser)
module.exports = router