const Shop = require('../models/Shop')

const createError = require('http-errors')

const updateShopInfo = async(req, res, next) => {

    const { IDShop } = req.params

    const shop = req.body

    const result = await Shop.findByIdAndUpdate(IDShop, shop)

    return res.status(200).json({ success: true, code: 200, message: '' })
}

module.exports = {
    updateShopInfo
}