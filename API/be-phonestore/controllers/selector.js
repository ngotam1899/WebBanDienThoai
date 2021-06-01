const Selector = require('../models/selector')
const Validator = require('../validators/validator')

const addSelector = async(req, res, next) => {
  const selector = new Selector(req.body)
  await selector.save()
  return res.status(200).json({ success: true, code: 201, message: '', selector })
}

const deleteSelector = async(req, res, next) => {
  const { IDSelector } = req.params
  const isValid = await Validator.isValidObjId(IDSelector);
  if (!isValid) { return res.status(200).json({ success: false, code: 400, message: 'id Selector is not correctly' }) } else {
    const result = await Selector.findByIdAndDelete(IDSelector);
    if (result) return res.status(200).json({ success: true, code: 200, message: '' })
  }
}

module.exports = {
  addSelector,
  deleteSelector
}