const Display = require('../models/Display')
const Validator = require('../validators/validator')

const createError = require('http-errors')

const getAllDisplay = async(req, res, next) => {
    try {
        const displays = await Display.find()

        return res.status(200).json({ displays: { success: 'true', code: 200, message: '', displays } })
    } catch (error) {
        return next(error)
    }
}
const addDisplay = async(req, res, next) => {
    const newDisplay = new Display(req.body)
    await newDisplay.save()
    return res.status(200).json({ success: true, code: 201, message: '', display: newDisplay })
}
const updateDisplay = async(req, res, next) => {
    const { IDDisplay } = req.params

    const display = req.body

    const result = await Display.findByIdAndUpdate(IDDisplay, display)

    if (!result) {
        return res.status(200).json({ success: false, code: 400, message: 'id display is not correctly' });
    }

    return res.status(200).json({ success: true, code: 200, message: '' })
}
const deleteDisplay = async(req, res, next) => {
    const { IDDisplay } = req.params
    const isValid = await Validator.isValidObjId(IDDisplay);
    if (!isValid) { return res.status(200).json({ success: false, code: 400, message: 'id display is not correctly' }) } else {
        const result = await Display.findByIdAndDelete(IDDisplay);
        if (result) return res.status(200).json({ success: true, code: 200, message: '' })
    }

}

module.exports = {
    getAllDisplay,
    addDisplay,
    updateDisplay,
    deleteDisplay
}