const Group = require('../models/group')
const Validator = require('../validators/validator')

const getAllGroup = async(req, res, next) => {
  try {
    let condition = {}
    if (req.query.keyword != undefined && req.query.keyword != "") {
      let keyword = req.query.keyword.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
      condition.name = { $regex: '.*' + keyword.trim() + '.*', $options: 'i' };
    }
    let limit = 30;
    let page = 0;
    if (req.query.limit != undefined && req.query.limit != "") {
      const number_limit = parseInt(req.query.limit);
      if (number_limit && number_limit > 0) {
          limit = number_limit;
      }
    }
    if (req.query.limit != undefined && req.query.limit != "") {
      const number_limit = parseInt(req.query.limit);
      if (number_limit && number_limit > 0) {
          limit = number_limit;
      }
    }
    if (req.query.page != undefined && req.query.page != "") {
      const number_page = parseInt(req.query.page);
      if (number_page && number_page > 0) {
          page = number_page;
      }
    }
    const groups = await Group.find(condition, {products: 0})
    .limit(limit)
    .skip(limit * page);
    let count = await Group.countDocuments(condition);
    return res.status(200).json({ success: true, code: 200, message: '', page, limit, total: count, groups })
  } catch (error) {
    return next(error)
  }
}
const addGroup = async(req, res, next) => {
  const newGroup = new Group(req.body)
  await newGroup.save()
  return res.status(200).json({ success: true, code: 201, message: '', group: newGroup })
}
const updateGroup = async(req, res, next) => {
  const { IDGroup } = req.params
  const group = req.body
  const result = await Group.findByIdAndUpdate(IDGroup, group)
  if (!result) {
      return res.status(200).json({ success: false, code: 400, message: 'id group is not correctly' })
  }
  return res.status(200).json({ success: true, code: 200, message: '' })
}
const deleteGroup = async(req, res, next) => {
  const { IDGroup } = req.params
  const isValid = await Validator.isValidObjId(IDGroup);
  if (!isValid) { return res.status(200).json({ success: false, code: 400, message: 'id group is not correctly' }) } else {
      const result = await Group.findByIdAndDelete(IDGroup);
      if (result) return res.status(200).json({ success: true, code: 200, message: '' })
  }
}

const getDetailGroup = async(req, res, next) => {
  const { IDGroup } = req.params;
  const isValid = await Validator.isValidObjId(IDGroup);
  if (!isValid) { return res.status(200).json({ success: false, code: 400, message: 'id category is not correctly' }) } else {
    const result = await Group.findById(IDGroup)
    .populate({ path: 'products.product', select: ['name', 'bigimage', 'price_min', 'pathseo'], populate : {path : 'bigimage', select: "public_url"}  });
    return res.status(200).json({ success: true, code: 200, message: '', group: result })
  }
}

module.exports = {
  getAllGroup,
  addGroup,
  updateGroup,
  deleteGroup,
  getDetailGroup
}