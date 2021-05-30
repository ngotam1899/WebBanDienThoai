const Specification = require('../models/specification')
const Selector = require('../models/selector')
const Validator = require('../validators/validator')

const getAllSpecification = async(req, res, next) => {
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
    const specifications = await Specification.find(condition, {__v : 0})
    .limit(limit)
    .skip(limit * page);
    let count = await Specification.countDocuments(condition);
    return res.status(200).json({ success: true, code: 200, message: '', page: page, limit: limit, total: count, specifications: specifications })
  } catch (error) {
      return next(error)
  }
}
const addSpecification = async(req, res, next) => {
  const { name, selections } = req.body;
  var selectArray=[];
  if(selections.length > 0){
    for (let item of selections){
      const select = new Selector({name : item.name});
      await select.save();
      selectArray.push(select._id)
    }
  }
  const newSpecification = new Specification({
    name,
    selections: selectArray
  })
  await newSpecification.save()
  return res.status(200).json({ success: true, code: 201, message: '', specification: newSpecification })
}
const updateSpecification = async(req, res, next) => {
  const { IDSpecification } = req.params
  const { name, selections } = req.body
  const specFound = await Specification.findById(IDSpecification)
  if (!specFound) {
    return res.status(200).json({ success: false, code: 400, message: 'id Specification is not correctly' })
  }
  if (name) specFound.name = name;
  if (selections) {
    var selectArray=[];
    for (let item of selections) {
      if(item._id){
        let selectFound = await Selector.findById(item._id);
        if (selectFound) {
          selectArray.push(item)
        }
      }
      else{
        const select = new Selector({name : item.name});
        await select.save();
        selectArray.push(select._id)
      }
    }
    specFound.selections = selectArray;
  }
  await specFound.save();
  return res.status(200).json({ success: true, code: 200, message: '', specification: specFound })
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
    const result = await Specification.findById(IDSpecification)
    .populate({path: 'selections', select: 'name'});
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