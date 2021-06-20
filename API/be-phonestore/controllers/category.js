const Category = require('../models/Category')
const Product = require('../models/Product');
const Specification = require('../models/specification')
const Validator = require('../validators/validator')

const getAllCategorySortByKeyword = async(req, res, next) => {
  try {
    var condition = {
			'active': true
		}
		if (req.query.keyword != undefined && req.query.keyword != '') {
			let keyword = req.query.keyword.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
			condition = {$or:[
				{name:{$regex: '.*' + keyword.trim() + '.*', $options: 'i'}},
				{desc_text:{$regex: '.*' + keyword.trim() + '.*', $options: 'i'}}
			]};
		}
		const pipeline = [
			{
				'$match': condition
			},
			{	'$group': 	
				{
					'_id': '$category',
					'count': { '$sum': 1 }
				}
			},
			{
				'$sort': { 'count': -1, '_id': -1 }
      }
    ];
    const categories = await Product.aggregate(pipeline);
    await Category.populate(categories, {path: "_id", select: 'name'})
    return res.status(200).json({ success: true, code: 200, message: '', categories})
  } catch (error) {
    return next(error)
  }
}

const getAllCategory = async(req, res, next) => {
  try {
    let condition = {};
    if (req.query.accessories != undefined && req.query.accessories != '0') {
			condition.accessories = req.query.accessories=='1' ? true : false;
		}
    const categorys = await Category.find(condition)
    .populate({ path: 'specifications', select: ['selections', 'name'], populate : {path : 'selections', select: "name"}  })
    .populate({ path: 'image', select: 'public_url' });
    return res.status(200).json({ success: true, code: 200, message: '', categorys})
  } catch (error) {
    return next(error)
  }
}
const addCategory = async(req, res, next) => {
  try {
    const { name, name_en, pathseo, image, specifications, filter, price, accessories, description } = req.body
    const category = new Category();
    if (name) category.name = name;
    if (name_en) category.name_en = name_en;
    if (pathseo) category.pathseo = pathseo;
    if (image) category.image = image;
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
    if(price) category.price = price;
    if(accessories) category.accessories = accessories;
    if(description) category.description = description;
    await category.save()
    return res.status(200).json({ success: true, code: 201, message: '', category })
  } catch (error) {
    return next(error)
  }
}
const updateCategory = async(req, res, next) => {
  try {
    const { IDCategory } = req.params
    const { name, name_en, pathseo, image, specifications, filter, price, accessories, description } = req.body
    const category = await Category.findById(IDCategory);
    if(name) category.name = name;
    if (image) category.image = image;
    if (name_en) category.name_en = name_en;
    if (pathseo) category.pathseo = pathseo;
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
    if(price) category.price = price;
    if(accessories) category.accessories = accessories;
    if(description) category.description = description;
    await category.save();
    return res.status(200).json({ success: true, code: 200, message: '' })
  } catch (error) {
    return next(error)
  }
}
const deleteCategory = async(req, res, next) => {
  try {
    const { IDCategory } = req.params
    const isValid = await Validator.isValidObjId(IDCategory);
    if (!isValid) { return res.status(200).json({ success: false, code: 400, message: 'id category is not correctly' }) } 
    else {
      const result = await Category.findByIdAndDelete(IDCategory);
      if (result) return res.status(200).json({ success: true, code: 200, message: '' })
    }
  } catch (error) {
    return next(error)
  }
}
const getDetailCategory = async(req, res, next) => {
  try {
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
      })
      .populate({ path: 'image', select: 'public_url' });
      return res.status(200).json({ success: true, code: 200, message: '', category: result })
    }
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  getAllCategorySortByKeyword,
  getAllCategory,
  addCategory,
  updateCategory,
  deleteCategory,
  getDetailCategory
}