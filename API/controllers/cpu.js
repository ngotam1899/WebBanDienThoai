const CPU = require('../models/CPU')

const createError = require('http-errors')

const getAllCPU = async(req, res, next) => {
    try {
        const cpus = await CPU.find()

        return res.status(200).json({ cpus: { success: 'true', cpus } })
    } catch (error) {
        return next(error)
    }
}
const addCPU = async(req, res, next) => {
    const newCPU = new CPU(req.body)
    await newCPU.save()
    return res.status(201).json({ cpu: newCPU })
}
const updateCPU = async(req, res, next) => {

    const { IDCPU } = req.params

    const cpu = req.body

    const result = await CPU.findByIdAndUpdate(IDCPU, cpu)

    if (!result) {
        return res.status(404).json({ message: 'id cpu is not correctly' })
    }

    return res.status(200).json({ success: 'true' })
}

module.exports = {
    getAllCPU,
    addCPU,
    updateCPU
}