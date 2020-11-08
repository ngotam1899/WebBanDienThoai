const express = require('express')
const router = require("express-promise-router")()

const commentController = require('../controllers/comment')

const passport = require('passport')
require('../middlewares/passport')

router.route('/comment')
    .post(passport.authenticate('jwt', { session: false }), commentController.addComment)

router.route('/:ID')
    .put(reviewController.updateReview)


module.exports = router