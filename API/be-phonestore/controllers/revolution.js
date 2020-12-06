const Revolution = require('../models/Revolution')
const Validator = require('../validators/validator')

const createError = require('http-errors')

const getAllRevolution = async(req, res, next) => {
    try {
        const revolutions = await Revolution.find()

        return res.status(200).json({ success: true, code: 200, message: '', revolutions: revolutions })
    } catch (error) {
        return next(error)
    }
}
const addRevolution = async(req, res, next) => {
    const newRevolution = new Revolution(req.body)
    await newRevolution.save()
    return res.status(200).json({ success: true, code: 201, message: '', revolution: newRevolution })
}
const updateRevolution = async(req, res, next) => {

    const { IDRevolution } = req.params

    const revolution = req.body

    const result = await Revolution.findByIdAndUpdate(IDRevolution, revolution)

    if (!result) {
        return res.status(200).json({ success: false, code: 400, message: 'id revolution is not correctly' })
    }

    return res.status(200).json({ success: true, code: 200, message: '' })
}
const deleteRevolution = async(req, res, next) => {
    const { IDRevolution } = req.params
    const isValid = await Validator.isValidObjId(IDRevolution);
    if (!isValid) { return res.status(200).json({ success: false, code: 400, message: 'id revolution is not correctly' }) } else {
        const result = await Revolution.findByIdAndDelete(IDRevolution);
        if (result) return res.status(200).json({ success: true, code: 200, message: '' })
    }

}

module.exports = {
    getAllRevolution,
    addRevolution,
    updateRevolution,
    deleteRevolution
}