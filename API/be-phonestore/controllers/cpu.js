const CPU = require('../models/CPU')
const Validator = require('../validators/validator')

const createError = require('http-errors')

const getAllCPU = async(req, res, next) => {
    try {
        const cpus = await CPU.find()

        return res.status(200).json({ success: true, code: 200, message: '', cpus: cpus })
    } catch (error) {
        return next(error)
    }
}
const addCPU = async(req, res, next) => {
    const newCPU = new CPU(req.body)
    await newCPU.save()
    return res.status(200).json({ success: true, code: 201, message: '', cpu: newCPU })
}
const updateCPU = async(req, res, next) => {

    const { IDCPU } = req.params

    const cpu = req.body

    const result = await CPU.findByIdAndUpdate(IDCPU, cpu)

    if (!result) {
        return res.status(200).json({ success: false, code: 400, message: 'id cpu is not correctly' })
    }

    return res.status(200).json({ success: true, code: 200, message: '' })
}
const deleteCPU = async(req, res, next) => {
    const { IDCPU } = req.params
    const isValid = await Validator.isValidObjId(IDCPU);
    if (!isValid) { return res.status(200).json({ success: false, code: 400, message: 'id cpu is not correctly' }) } else {
        const result = await CPU.findByIdAndDelete(IDCPU);
        if (result) return res.status(200).json({ success: true, code: 200, message: '' })
    }
}

module.exports = {
    getAllCPU,
    addCPU,
    updateCPU,
    deleteCPU
}