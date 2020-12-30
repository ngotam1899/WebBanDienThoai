const Brand = require('../models/Brand')

const createError = require('http-errors')
const Validator = require('../validators/validator')

const getAllBrand = async(req, res, next) => {
    try {
        const brands = await Brand.find()

        return res.status(200).json({ success: true, code: 200, message: '', brands: brands })
    } catch (error) {
        return next(error)
    }
}
const addBrand = async(req, res, next) => {
    const newBrand = new Brand(req.body)
    await newBrand.save()
    return res.status(200).json({ success: true, code: 201, message: '', brand: newBrand })
}
const updateBrand = async(req, res, next) => {

    const { IDBrand } = req.params

    const brand = req.body

    const result = await Brand.findByIdAndUpdate(IDBrand, brand)

    if (!result) {
        return res.status(200).json({ success: false, code: 400, message: 'id brand is not correctly' });
    }

    return res.status(200).json({ success: true, code: 200, message: '' })
}
const deleteBrand = async(req, res, next) => {
    const { IDBrand } = req.params
    const isValid = await Validator.isValidObjId(IDBrand);
    if (!isValid) { return res.status(200).json({ success: false, code: 400, message: 'id brand is not correctly' }) } else {
        const result = await Brand.findByIdAndDelete(IDBrand);
        if (result) return res.status(200).json({ success: true, code: 200, message: '' })
    }

}
const getDetailBrand = async(req, res, next) => {
    const { IDBrand } = req.params;
    const isValid = await Validator.isValidObjId(IDBrand);
    if (!isValid) { return res.status(200).json({ success: false, code: 400, message: 'id Brand is not correctly' }) } else {
        const result = await Brand.findById(IDBrand);
        return res.status(200).json({ success: true, code: 200, message: '', category: result })
    }
}

module.exports = {
    getAllBrand,
    addBrand,
    updateBrand,
    deleteBrand,
    getDetailBrand
}