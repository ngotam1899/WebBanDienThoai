const Operation = require('../models/Operation')

const createError = require('http-errors')

const getAllOperation = async(req, res, next) => {
    try {
        const operations = await Operation.find()

        return res.status(200).json({ success: true, code: 200, operations: operations })
    } catch (error) {
        return next(error)
    }
}
const addOperation = async(req, res, next) => {
    const newOperation = new Operation(req.body)
    await newOperation.save()
    return res.status(200).json({ success: true, code: 201, operation: newOperation })
}
const updateOperation = async(req, res, next) => {

    const { IDOperation } = req.params

    const operation = req.body

    const result = await Operation.findByIdAndUpdate(IDOperation, operation)

    if (!result) {
        return res.status(200).json({ success: false, code: 400, message: 'id operation is not correctly' })
    }

    return res.status(200).json({ success: true, code: 200, message = '' })
}

module.exports = {
    getAllOperation,
    addOperation,
    updateOperation
}