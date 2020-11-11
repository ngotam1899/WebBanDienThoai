const Category = require('../models/Category')

const createError = require('http-errors')

const getAllCategory = async(req, res, next) => {
    try {
        const categorys = await Category.find()

        return res.status(200).json({ categorys: { success: 'true', categorys } })
    } catch (error) {
        return next(error)
    }
}
const addCategory = async(req, res, next) => {
    const newCategory = new Category(req.body)
    await newCategory.save()
    return res.status(201).json({ category: newCategory })
}
const updateCategory = async(req, res, next) => {

    const { IDCategory } = req.params

    const category = req.body

    const result = await Category.findByIdAndUpdate(IDCategory, category)

    if (!result) {
        return res.status(404).json("message: id category is not correctly")
    }

    return res.status(200).json({ success: 'true' })
}

module.exports = {
    getAllCategory,
    addCategory,
    updateCategory
}