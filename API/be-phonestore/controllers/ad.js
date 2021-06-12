const Ad = require('../models/ad');
const Image = require('../models/Image');
const Validator = require('../validators/validator');
const imageController = require('./image');

const getAllAd = async (req, res, next) => {
	try {
		const ads = await Ad.find().populate({path: 'image', select: 'public_url'});;
		return res.status(200).json({ success: true, code: 200, message: '', ads });
	} catch (error) {
		return next(error);
	}
};

const addAd = async (req, res, next) => {
  try {
    const {
      name, content, link, startedAt, endedAt
    } = req.body;
    const ad = new Ad();
    if (name) ad.name = name;
    if (content) ad.content = content;
    if (link) ad.link = link;
    if (startedAt) ad.startedAt = startedAt;
    if (endedAt) ad.endedAt = endedAt;
    if (req.files){
      const {image} = req.files;
      const newImage = await imageController.upload(image,Image)
      ad.image = newImage._id;
    }
    await ad.save();
    return res.status(200).json({ success: true, code: 201, message: '', ad });
  } 
  catch(error) {
    return next(error)
  }
};

const updateAd = async (req, res, next) => {
  try {
    const { IDAd } = req.params;
    const {
      name, content, link, startedAt, endedAt
    } = req.body;
    const ad = await Ad.findById(IDAd);
    if (name) ad.name = name;
    if (content) ad.content = content;
    if (link) ad.link = link;
    if (startedAt) ad.startedAt = startedAt;
    if (endedAt) ad.endedAt = endedAt;
    if (req.files){
      const {image} = req.files;
      const newImage = await imageController.upload(image,Image)
      ad.image = newImage._id;
    }
    await ad.save();
    return res.status(200).json({ success: true, code: 200, ad });
  } 
  catch(error) {
    return next(error)
  }
};

const deleteAd = async (req, res, next) => {
  try {
    const { IDAd } = req.params;
    const isValid = await Validator.isValidObjId(IDAd);
    if (!isValid) {
      return res.status(200).json({ success: false, code: 400, message: 'id ad is not correctly' });
    } else {
      const result = await Ad.findByIdAndDelete(IDAd);
      if (result) return res.status(200).json({ success: true, code: 200, message: '' });
    }
  } 
  catch(error) {
    return next(error)
  }
};

const getDetailAd = async (req, res, next) => {
  try {
    const { IDAd } = req.params;
    const isValid = await Validator.isValidObjId(IDAd);
    if (!isValid) {
      return res.status(200).json({ success: false, code: 400, message: 'id ad is not correctly' });
    } else {
      const result = await Ad.findById(IDAd).populate({path: 'image', select: 'public_url'});;
      return res.status(200).json({ success: true, code: 200, message: '', ad: result });
    }
  } 
  catch(error) {
    return next(error)
  }
};

module.exports = {
	getAllAd,
	addAd,
	updateAd,
	deleteAd,
	getDetailAd
};
