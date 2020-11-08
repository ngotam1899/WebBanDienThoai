const Display = require('../models/Display')

const createError = require('http-errors')

const getAllDisplay = async(req, res, next) => {
    try {
        const displays = await Display.find()

        return res.status(200).json({ displays: { success: 'true', displays } })
    } catch (error) {
        return next(error)
    }
}
const addDisplay = async(req, res, next) => {
    const newDisplay = new Display(req.body)
    await newDisplay.save()
    return res.status(201).json({ display: newDisplay })
}
const updateDisplay = async(req, res, next) => {

    const { IDDisplay } = req.params

    const display = req.body

    const result = await Display.findByIdAndUpdate(IDDisplay, display)

    if (!result) {
        return res.status(404).json("message: id display is not correctly")
    }

    return res.status(200).json({ success: 'true' })
}

module.exports = {
    getAllDisplay,
    addDisplay,
    updateDisplay
}