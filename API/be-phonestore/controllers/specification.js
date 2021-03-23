const Specification = require('../models/specification')
const Validator = require('../validators/validator')

const getAllSpecification = async(req, res, next) => {
  try {
      const specifications = await Specification.find()

      return res.status(200).json({ success: true, code: 200, message: '', specifications: specifications })
  } catch (error) {
      return next(error)
  }
}
const addSpecification = async(req, res, next) => {
  const newSpecification = new Specification(req.body)
  await newSpecification.save()
  return res.status(200).json({ success: true, code: 201, message: '', specification: newSpecification })
}
const updateSpecification = async(req, res, next) => {
  const { IDSpecification } = req.params
  const specification = req.body
  const result = await Specification.findByIdAndUpdate(IDSpecification, specification)
  if (!result) {
      return res.status(200).json({ success: false, code: 400, message: 'id Specification is not correctly' })
  }
  return res.status(200).json({ success: true, code: 200, message: '' })
}
const deleteSpecification = async(req, res, next) => {
  const { IDSpecification } = req.params
  const isValid = await Validator.isValidObjId(IDSpecification);
  if (!isValid) { return res.status(200).json({ success: false, code: 400, message: 'id Specification is not correctly' }) } else {
      const result = await Specification.findByIdAndDelete(IDSpecification);
      if (result) return res.status(200).json({ success: true, code: 200, message: '' })
  }
}

const getDetailSpecification = async(req, res, next) => {
  const { IDSpecification } = req.params;
  const isValid = await Validator.isValidObjId(IDSpecification);
  if (!isValid) { return res.status(200).json({ success: false, code: 400, message: 'id category is not correctly' }) } else {
      const result = await Specification.findById(IDSpecification);
      return res.status(200).json({ success: true, code: 200, message: '', specification: result })
  }
}

module.exports = {
  getAllSpecification,
  addSpecification,
  updateSpecification,
  deleteSpecification,
  getDetailSpecification
}