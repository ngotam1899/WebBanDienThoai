const express = require('express')
const router = require("express-promise-router")()

const reviewController = require('../controllers/review')

router.route('/')
    .get(reviewController.getReView)
    .post(reviewController.newReview)

router.route('/:ID')
    .put(reviewController.updateReview)


module.exports = router