const Installment = require('../models/installment');
const Validator = require('../validators/validator');

const getAllInstallment = async (req, res, next) => {
	try {
		const installments = await Installment.find();
		return res.status(200).json({ success: true, code: 200, message: '', installments });
	} catch (error) {
		return next(error);
	}
};

const addInstallment = async (req, res, next) => {
  try {
    const newInstallment = new Installment(req.body);
    await newInstallment.save();
    return res.status(200).json({ success: true, code: 201, message: '', installment: newInstallment });
  } catch (error) {
    return next(error);
  }
};

const updateInstallment = async (req, res, next) => {
  try {
    const { IDInstallment } = req.params;
    const installment = req.body;
    const result = await Installment.findByIdAndUpdate(IDInstallment, installment);
    if (!result) {
      return res.status(200).json({ success: false, code: 400, message: 'id installment is not correctly' });
    }
    return res.status(200).json({ success: true, code: 200, message: '' });
  } catch (error) {
    return next(error);
  }
};

const deleteInstallment = async (req, res, next) => {
  try {
    const { IDInstallment } = req.params;
    const isValid = await Validator.isValidObjId(IDInstallment);
    if (!isValid) {
      return res.status(200).json({ success: false, code: 400, message: 'id installment is not correctly' });
    } else {
      const result = await Installment.findByIdAndDelete(IDInstallment);
      if (result) return res.status(200).json({ success: true, code: 200, message: '' });
    }
  } catch (error) {
    return next(error);
  }
};

const getDetailInstallment = async (req, res, next) => {
  try {
    const { IDInstallment } = req.params;
    const isValid = await Validator.isValidObjId(IDInstallment);
    if (!isValid) {
      return res.status(200).json({ success: false, code: 400, message: 'id installment is not correctly' });
    } else {
      const result = await Installment.findById(IDInstallment);
      return res.status(200).json({ success: true, code: 200, message: '', installment: result });
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
	getAllInstallment,
	addInstallment,
	updateInstallment,
	deleteInstallment,
	getDetailInstallment
};
