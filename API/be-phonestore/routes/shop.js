const express = require('express')
const router = require("express-promise-router")()
const shopController = require('../controllers/shop')

router.route('/:IDShop')
    .put(shopController.updateShopInfo)

module.exports = router