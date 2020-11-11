const Comment = require('../models/Comment')
const Product = require('../models/Product')

const createError = require('http-errors')

const addComment = async(req, res, next) => {
    const newComment = new Comment(req.body)
}
const updateShopInfo = async(req, res, next) => {

    const { IDShop } = req.params

    const shop = req.body

    const result = await Comment.findByIdAndUpdate(IDShop, shop)

    return res.status(200).json({ success: 'true' })
}

module.exports = {
    addComment,
    updateShopInfo
}