const Color = require('../models/Color')
const Validator = require('../validators/validator')
const createError = require('http-errors')

const getAllColor = async(req, res, next) => {
    try {
        const colors = await Color.find()

        return res.status(200).json({ success: true, code: 200, message: '', colors: colors })
    } catch (error) {
        return next(error)
    }
}
const addColor = async(req, res, next) => {
    const newColor = new Color(req.body)
    await newColor.save()
    return res.status(200).json({ success: true, code: 201, message: '', color: newColor })
}
const updateColor = async(req, res, next) => {

    const { IDColor } = req.params

    const color = req.body

    const result = await Color.findByIdAndUpdate(IDColor, color)

    if (!result) {
        return res.status(200).json({ success: false, code: 400, message: 'id color is not correctly' })
    }

    return res.status(200).json({ success: true, code: 200, message: '' })
}
const deleteColor = async(req, res, next) => {
    const { IDColor } = req.params
    const isValid = await Validator.isValidObjId(IDColor);
    if (!isValid) { return res.status(200).json({ success: false, code: 400, message: 'id color is not correctly' }) } else {
        const result = await Color.findByIdAndDelete(IDColor);
        if (result) return res.status(200).json({ success: true, code: 200, message: '' })
    }
}

const getDetailColor = async(req, res, next) => {
    const { IDColor } = req.params;
    const isValid = await Validator.isValidObjId(IDColor);
    if (!isValid) { return res.status(200).json({ success: false, code: 400, message: 'id Brand is not correctly' }) } else {
        const result = await Color.findById(IDColor);
        return res.status(200).json({ success: true, code: 200, message: '', category: result })
    }
}

module.exports = {
    getAllColor,
    addColor,
    updateColor,
    deleteColor,
    getDetailColor
}