const Color = require('../models/Color')

const createError = require('http-errors')

const getAllColor = async(req, res, next) => {
    try {
        const colors = await Color.find()

        return res.status(200).json({ colors: { success: 'true', colors } })
    } catch (error) {
        return next(error)
    }
}
const addColor = async(req, res, next) => {
    const newColor = new Color(req.body)
    await newColor.save()
    return res.status(201).json({ color: newColor })
}
const updateColor = async(req, res, next) => {

    const { IDColor } = req.params

    const color = req.body

    const result = await Color.findByIdAndUpdate(IDColor, color)

    if (!result) {
        return res.status(404).json({ message: 'id color is not correctly' })
    }

    return res.status(200).json({ success: 'true' })
}

module.exports = {
    getAllColor,
    addColor,
    updateColor
}