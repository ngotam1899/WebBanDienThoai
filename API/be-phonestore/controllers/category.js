const Category = require('../models/Category')
const Validator = require('../validators/validator')

const createError = require('http-errors')

const getAllCategory = async(req, res, next) => {
    try {
        const categorys = await Category.find()

        return res.status(200).json({ success: true, code: 200, message: '', categorys: categorys })
    } catch (error) {
        return next(error)
    }
}
const addCategory = async(req, res, next) => {
    const newCategory = new Category(req.body)
    await newCategory.save()
    return res.status(200).json({ success: true, code: 201, message: '', category: newCategory })
}
const updateCategory = async(req, res, next) => {

    const { IDCategory } = req.params

    const category = req.body

    const result = await Category.findByIdAndUpdate(IDCategory, category)

    if (!result) {
        return res.status(200).json({ success: false, code: 400, message: 'id category is not correctly' })
    }

    return res.status(200).json({ success: true, code: 200, message: '' })
}
const deleteCategory = async(req, res, next) => {
    const { IDCategory } = req.params
    const isValid = await Validator.isValidObjId(IDCategory);
    if (!isValid) { return res.status(200).json({ success: false, code: 400, message: 'id category is not correctly' }) } else {
        const result = await Category.findByIdAndDelete(IDCategory);
        if (result) return res.status(200).json({ success: true, code: 200, message: '' })
    }
}
const getDetailCategory = async(req, res, next) => {
    const { IDCategory } = req.params;
    const isValid = await Validator.isValidObjId(IDCategory);
    if (!isValid) { return res.status(200).json({ success: false, code: 400, message: 'id category is not correctly' }) } else {
        const result = await Category.findById(IDCategory);
        return res.status(200).json({ success: true, code: 200, message: '', category: result })
    }
}

module.exports = {
    getAllCategory,
    addCategory,
    updateCategory,
    deleteCategory,
    getDetailCategory
}