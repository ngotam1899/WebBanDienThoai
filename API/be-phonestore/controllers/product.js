const Comment = require('../models/Comment')
const Image_Pro = require('../models/Image_Pro')
const Validator = require('../validators/validator')
const cloudinary = require('cloudinary')
const Mobile = require('../models/Mobile')
const createError = require('http-errors')
const Product = require('../models/Product')
const { query } = require('express')
    /* const slp = require('sleep') */

const uploadImageMobile = async(req, res, next) => {
    try {
        const { IDProduct } = req.params

        const product = await Product.findById(IDProduct)
        if (!product) return res.status(404).json({ message: 'Can not match any product' })
        if (!req.files || Object.keys(req.files).length === 0)
            return res.status(400).json({ message: 'No file were uploaded' })
        const bigImage = req.files.bigImage
        if (bigImage.size > 1024 * 1024) return res.status(400).json({ message: 'Size too large' })
        if (bigImage.mimetype !== 'image/png' && bigImage.mimetype !== 'image/jpeg' && bigImage.mimetype !== 'image/jpg')
            return res.status(400).json({ message: 'The format file is incorrect' })

        const image1 = req.files.image1
        const image2 = req.files.image2
        const image3 = req.files.image3

        if (image1.size > 1024 * 1024) return res.status(400).json({ message: 'Size too large' })
        if (image1.mimetype !== 'image/png' && image1.mimetype !== 'image/jpeg' && image1.mimetype !== 'image/jpg')
            return res.status(400).json({ message: 'The format file is incorrect' })

        if (image2.size > 1024 * 1024) return res.status(400).json({ message: 'Size too large' })
        if (image2.mimetype !== 'image/png' && image2.mimetype !== 'image/jpeg' && image2.mimetype !== 'image/jpg')
            return res.status(400).json({ message: 'The format file is incorrect' })

        if (image3.size > 1024 * 1024) return res.status(400).json({ message: 'Size too large' })
        if (image3.mimetype !== 'image/png' && image3.mimetype !== 'image/jpeg' && image3.mimetype !== 'image/jpg')
            return res.status(400).json({ message: 'The format file is incorrect' })

        await cloudinary.v2.uploader.upload(bigImage.tempFilePath, { folder: 'Asset' }, function(err, result) {
            if (err) next(err)
            const imageMain = new Image_Pro()
            imageMain.id_cloud = result.asset_id
            imageMain.name = bigImage.name
            imageMain.public_url = result.url
            imageMain.save()
            product.bigimage = imageMain._id
        })



        await cloudinary.v2.uploader.upload(image1.tempFilePath, { folder: 'Asset' }, function(err, result) {
            if (err) next(err)
            const imaged1 = new Image_Pro()
            imaged1.id_cloud = result.asset_id
            imaged1.name = image1.name
            imaged1.public_url = result.url
            imaged1.save()

            product.image.push(imaged1._id)
        })
        await cloudinary.v2.uploader.upload(image2.tempFilePath, { folder: 'Asset' }, function(err, result) {
            if (err) next(err)
            const imaged2 = new Image_Pro()
            imaged2.id_cloud = result.asset_id
            imaged2.name = image2.name
            imaged2.public_url = result.url
            imaged2.save()

            product.image.push(imaged2._id)
        })
        await cloudinary.v2.uploader.upload(image3.tempFilePath, { folder: 'Asset' }, function(err, result) {
            if (err) next(err)
            const imaged3 = new Image_Pro()
            imaged3.id_cloud = result.asset_id
            imaged3.name = image3.name
            imaged3.public_url = result.url
            imaged3.save()
            product.image.push(imaged3._id)
        })
        await product.save();
        return res.status(200).json({ message: 'success' })

    } catch (error) {
        next(error)
    }
}

const getAllProduct = async(req, res, next) => {
    try {
        //let regex = /^[a-zA-Z0-9& ]*$/;
        let condition = {}
        if (req.query.keyword != undefined && req.query.keyword != "") {
            let keyword = req.query.keyword.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
            condition.name = { $regex: '.*' + keyword.trim() + '.*', $options: 'i' };
        }
        if (req.query.brand != undefined && req.query.brand != "") {
            if (Validator.isValidObjId(req.query.brand)) {
                condition.brand = req.query.brand
            }
        }
        if (req.query.category != undefined && req.query.category != "") {
            if (Validator.isValidObjId(req.query.category)) {
                condition.category = req.query.category
            }
        }
        if (req.query.color != undefined && req.query.color != "") {
            if (Validator.isValidObjId(req.query.color)) {
                const mobile = await Mobile.find({ "color": req.query.color })

                const listID = [];

                mobile.forEach(async(element) => {
                    listID.push(element._id);
                });

                condition["detail_info.mobile"] = listID;
            }
        }
        //  condition["$options"] = { limit: 1 }
        let limit = 5;
        let page = 0;

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
        let sort = {}
        if (req.query.sort_n != undefined && req.query.sort_n != '0') {
            sort['name'] = req.query.sort_n == '1' ? 1 : -1;
        }

        if (req.query.sort_p != undefined && req.query.sort_p != '0') {
            sort['price'] = req.query.sort_p == '1' ? 1 : -1;
        }

        if (req.query.min_p != undefined || req.query.max_p != undefined) {
            condition.price = { $lte: req.query.max_p || 10000000, $gte: req.query.min_p || 0 }
        }
        //  condition["$orderby"] = sort;
        //  console.log(condition)
        let products;
        if (req.query.color != undefined && req.query.color != "") {
            products = await Product.find(condition)
                .populate({ path: 'bigimage', select: 'public_url' })
                .populate({ path: 'image', select: 'public_url' })
                .populate('detail_info.mobile')
                .sort(sort)
                .limit(limit)
                .skip(limit * page);
        } else {
            products = await Product.find(condition)
                .populate({ path: 'bigimage', select: 'public_url' })
                .populate({ path: 'image', select: 'public_url' })
                .sort(sort)
                .limit(limit)
                .skip(limit * page);
        }
        let count = await Product.countDocuments(condition);
        return res.status(200).json({ success: true, code: 200, message: '', page: page, limit: limit, total: count, products: products })
    } catch (error) {
        return next(error)
    }
}
const getAllProductByBrand = async(req, res, next) => {
    try {
        const { IDBrand } = req.params
        if (!Validator.isValidObjId(IDBrand)) return res.status(200).json({ success: false, code: 400, message: 'check link again!' })
        const products = await Product.find({ "brand": IDBrand })
            .populate({ path: 'bigimage', select: 'public_url' })
            .populate({ path: 'image', select: 'public_url' });;

        return res.status(200).json({ success: true, code: 200, message: 'success', products })
    } catch (error) {
        return next(error)
    }
}

const getAllProductByColor = async(req, res, next) => {
    try {
        const { IDColor } = req.params
        if (!Validator.isValidObjId(IDColor)) return res.status(200).json({ success: false, code: 400, message: 'check link again!' })
        const mobile = await Mobile.find({ "color": IDColor });

        const listID = [];

        mobile.forEach(async(element) => {
            listID.push(element._id);
        });
        const products = await Product.find({ "detail_info.mobile": listID })
            .populate({ path: 'bigimage', select: 'public_url' })
            .populate({ path: 'image', select: 'public_url' });;;
        return res.status(200).json({ success: true, code: 200, message: 'success', products })
    } catch (error) {
        return next(error)
    }
}

const getAllProductByCategory = async(req, res, next) => {
    try {
        const { IDCategory } = req.params
        if (!Validator.isValidObjId(IDCategory)) return res.status(200).json({ success: false, code: 400, message: 'check link again!' })
        const products = await Product.find({ "category": IDCategory })
            .populate({ path: 'bigimage', select: 'public_url' })
            .populate({ path: 'image', select: 'public_url' });;

        return res.status(200).json({ success: true, code: 200, message: 'success', products: products })
    } catch (error) {
        return next(error)
    }
}
const searchProduct = async(req, res, next) => {
    try {
        const products = await Product.find()
            .populate({ path: 'bigimage', select: 'public_url' })
            .populate({ path: 'image', select: 'public_url' });
        return res.status(200).json({ success: true, code: 200, message: '', products: products })
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    uploadImageMobile,
    getAllProduct,
    getAllProductByBrand,
    getAllProductByCategory,
    getAllProductByColor,
    searchProduct
}