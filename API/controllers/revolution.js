const Revolution = require('../models/Revolution')

const createError = require('http-errors')

const getAllRevolution = async(req, res, next) => {
    try {
        const revolutions = await Revolution.find()

        return res.status(200).json({ revolutions: { success: 'true', revolutions } })
    } catch (error) {
        return next(error)
    }
}
const addRevolution = async(req, res, next) => {
    const newRevolution = new Revolution(req.body)
    await newRevolution.save()
    return res.status(201).json({ revolution: newRevolution })
}
const updateRevolution = async(req, res, next) => {

    const { IDRevolution } = req.params

    const revolution = req.body

    const result = await Revolution.findByIdAndUpdate(IDRevolution, revolution)

    if (!result) {
        return res.status(404).json("message: id revolution is not correctly")
    }

    return res.status(200).json({ success: 'true' })
}

module.exports = {
    getAllRevolution,
    addRevolution,
    updateRevolution
}