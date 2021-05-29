const Category = require('../models/Category')
const Specification = require('../models/specification')
const Validator = require('../validators/validator')

const createError = require('http-errors')

const getAllCategory = async(req, res, next) => {
  try {
    const categorys = await Category.find()
    .populate({ path: 'specifications', select: ['selections', 'name'], populate : {path : 'selections', select: "name"}  })
    return res.status(200).json({ success: true, code: 200, message: '', categorys: categorys })
  } catch (error) {
    return next(error)
  }
}
const addCategory = async(req, res, next) => {
  const newCategory = new Category(req.body)
  await newCategory.save()
  return res.status(200).json({ success: true, code: 201, message: '', category: newCategory })
}
const updateCategory = async(req, res, next) => {
  const { IDCategory } = req.params
  const { name, specifications, filter } = req.body
  const category = await Category.findById(IDCategory);
  if(name) category.name = name;
  if(specifications){
    var specArray=[];
    for (let item of specifications) {
      let specFound = await Specification.findById(item);
      if (specFound) {
        specArray.push(item)
      }
    }
    category.specifications = specArray 
  } 
  if(filter){
    var filterArray=[];
    for (let item of filter) {
      let specFound = await Specification.findById(item._id);
      if (specFound) {
        filterArray.push(item)
      }
    }
    category.filter = filterArray 
  } 
  await category.save();
  return res.status(200).json({ success: true, code: 200, message: '' })
}
const deleteCategory = async(req, res, next) => {
  const { IDCategory } = req.params
  const isValid = await Validator.isValidObjId(IDCategory);
  if (!isValid) { return res.status(200).json({ success: false, code: 400, message: 'id category is not correctly' }) } 
  else {
    const result = await Category.findByIdAndDelete(IDCategory);
    if (result) return res.status(200).json({ success: true, code: 200, message: '' })
  }
}
const getDetailCategory = async(req, res, next) => {
  const { IDCategory } = req.params;
  const isValid = await Validator.isValidObjId(IDCategory);
  if (!isValid) { return res.status(200).json({ success: false, code: 400, message: 'id category is not correctly' }) } else {
    const result = await Category.findById(IDCategory)
    .populate({ 
      path: 'specifications', select: ['selections', 'name'], 
      populate : {path : 'selections', select: "name"},
    })
    .populate({ 
      path: 'filter', select: '_id',
      populate : {path : '_id', select: ["name", "selections"], 
      populate : {path : 'selections', select: "name"}},
    });
    return res.status(200).json({ success: true, code: 200, message: '', category: result })
  }
}

module.exports = {
    getAllCategory,
    addCategory,
    updateCategory,
    deleteCategory,
    getDetailCategory
}