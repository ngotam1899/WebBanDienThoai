const Installment = require('../models/installment');
const Validator = require('../validators/validator');

const getAllInstallment = async (req, res, next) => {
	try {
    const installments = await Installment.find()
    .populate({ path: 'user', select: ["image", "firstname", "lastname"], populate : {path : 'image', select: "public_url"} })
    .populate({ path: 'staff', select: ["image", "firstname", "lastname"], populate : {path : 'image', select: "public_url"} })
    .populate({ path: 'product.color', select: "name_vn"})
    .populate({ path: 'product._id', select: ["bigimage", "name"], populate : {path : 'bigimage', select: "public_url"}});
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
      const result = await Installment.findById(IDInstallment)
      .populate({ path: 'user', select: ["image", "firstname", "lastname"], populate : {path : 'image', select: "public_url"} })
      .populate({ path: 'staff', select: ["image", "firstname", "lastname"], populate : {path : 'image', select: "public_url"} })
      .populate({ path: 'product.color', select: "name_vn"})
      .populate({ path: 'product._id', select: ["bigimage", "name"], populate : {path : 'bigimage', select: "public_url"}});
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
