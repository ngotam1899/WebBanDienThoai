const Operation = require('../models/Operation')
const Validator = require('../validators/validator')
const createError = require('http-errors')

const getAllOperation = async(req, res, next) => {
    try {
        const operations = await Operation.find()

        return res.status(200).json({ success: true, code: 200, message: '', operations: operations })
    } catch (error) {
        return next(error)
    }
}
const addOperation = async(req, res, next) => {
    const newOperation = new Operation(req.body)
    await newOperation.save()
    return res.status(200).json({ success: true, code: 201, message: '', operation: newOperation })
}
const updateOperation = async(req, res, next) => {

    const { IDOperation } = req.params
    if (Validator.isValidFile(IDOperation) == false) return res.status(200).json({ success: false, code: 400, message: 'check link and try again' })
    const operation = req.body

    const result = await Operation.findByIdAndUpdate(IDOperation, operation)

    if (!result) {
        return res.status(200).json({ success: false, code: 400, message: 'id operation is not correctly' })
    }

    return res.status(200).json({ success: true, code: 200, message: '' })
}
const deleteOperation = async(req, res, next) => {
    const { IDOperation } = req.params
    const isValid = await Validator.isValidObjId(IDOperation);
    if (!isValid) { return res.status(200).json({ success: false, code: 400, message: 'id operator is not correctly' }) } else {
        const result = await Operation.findByIdAndDelete(IDColor);
        if (result) return res.status(200).json({ success: true, code: 200, message: '' })
    }
}
const getDetailOperation = async(req, res, next) => {
    const { IDOperation } = req.params;
    const isValid = await Validator.isValidObjId(IDOperation);
    if (!isValid) { return res.status(200).json({ success: false, code: 400, message: 'id operation is not correctly' }) } else {
        const result = await Operation.findById(IDOperation);
        return res.status(200).json({ success: true, code: 200, message: '', category: result })
    }
}

module.exports = {
    getAllOperation,
    getDetailOperation,
    addOperation,
    updateOperation,
    deleteOperation
}