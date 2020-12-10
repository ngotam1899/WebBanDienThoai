const Product = require('../models/Product')
const EarPhone = require('../models/EarPhone')
const Category = require('../models/Category')
const Brand = require('../models/Brand')
const Image_Pro = require('../models/Image_Pro')
    //const Origin = require('../models/Origin')

const Validator = require('../validators/validator')

const addproduct = async(req, res, next) => {
    try {
        const { name, price, amount, pathseo, warrently, bigimage, image, category, brand } = req.body
        const { compatible, port, used_time, full_charge_time, connect_the_same_time, connect_support, weight, brand_from } = req.body.detail_info

        const product = new Product();
        if (name) product.name = name;
        if (price) product.price = price;
        if (amount) product.amount = amount;
        if (pathseo) product.pathseo = pathseo;
        if (warrently) product.warrently = warrently;
        if (bigimage) product.bigimage = bigimage;
        if (image) product.image = image
        if (category) {
            const is_category = await Category.findById(category)
            if (!is_category) return res.status(200).json({ success: false, code: 404, message: 'category is identify' })
            product.category = category
        }
        if (brand) {
            const is_brand = await Brand.findById(brand)
            if (!is_brand) return res.status(200).json({ success: false, code: 404, message: 'brand is identify' })
            product.brand = brand;
        }
        /*if (origin) {
            const is_origin = await Origin.findById(origin)
            if (!is_origin) return res.status(200).json({ success: false, code: 404, message: 'origin is identify' })
        }*/

        const earphone = new EarPhone();
        if (compatible) earphone.compatible = compatible;
        if (used_time) earphone.used_time = used_time;
        if (port) earphone.port = port;
        if (full_charge_time) earphone.full_charge_time = full_charge_time;
        if (connect_the_same_time) earphone.connect_the_same_time = connect_the_same_time;
        if (connect_support) earphone.connect_support = connect_support;
        if (weight) earphone.weight = weight;
        if (brand_from) earphone.brand_from = brand_from;
        await earphone.save()

        product.detail_info.earphone = earphone._id
        await product.save()

        const returnProduct = await Product.findById(product._id).populate('detail_info.earphone')
        console.log(returnProduct)
        return res.status(201).json({
            success: true,
            code: 201,
            product: returnProduct
        })

    } catch (error) {
        return next(error)
    }
}


const updateproduct = async(req, res, next) => {
    try {
        const { IDProduct } = req.params

        const { name, price, amount, pathseo, warrently, bigimage, image, category, brand } = req.body
        const { compatible, port, used_time, full_charge_time, connect_the_same_time, connect_support, weight, brand_from } = req.body.detail_info.earphone

        const product = await Product.findById(IDProduct)
        if (!product) return res.status(200).json({ success: false, code: 404, message: 'Can not found product need to update' })

        if (name) product.name = name;
        if (price) product.price = price;
        if (amount) product.amount = amount;
        if (pathseo) product.pathseo = pathseo;
        if (warrently) product.warrently = warrently;
        if (bigimage) product.bigimage = bigimage;
        if (image) product.image = image
        if (category) {
            const is_category = await Category.findById(category)
            if (!is_category) return res.status(200).json({ success: false, code: 404, message: 'category is identify' })
            product.category = category
        }
        if (brand) {
            const is_brand = await Brand.findById(brand)
            if (!is_brand) return res.status(200).json({ success: false, code: 404, message: 'brand is identify' })
            product.brand = brand;
        }
        /*if (origin) {
            const is_origin = await Origin.findById(origin)
            if (!is_origin) return res.status(200).json({ success: false, code: 404, message: 'origin is identify' })
        }*/

        const earphone = await EarPhone.findById(product.detail_info.earphone._id)
        if (compatible) earphone.compatible = compatible;
        if (port) earphone.port = port;
        if (used_time) earphone.used_time = used_time;
        if (full_charge_time) earphone.full_charge_time = full_charge_time;
        if (connect_the_same_time) earphone.connect_the_same_time = connect_the_same_time;
        if (connect_support) earphone.connect_support = connect_support;
        if (weight) earphone.weight = weight;
        if (brand_from) earphone.brand_from = brand_from;
        await product.save()
        await earphone.save()
        return res.status(200).json({ success: true, code: 200, message: '' })
    } catch (error) {
        return next(error)
    }
}

const deleteproduct = async(req, res, next) => {
    try {
        const { IDProduct } = req.params
        const product = await Product.findById(IDProduct)
        if (!product) return res.status(200).json({ success: false, code: 404, message: 'The product is not exist' })
        await EarPhone.findByIdAndDelete(product.detail_info.earphone)
        await Product.findByIdAndDelete(IDProduct)
        return res.status(200).json({ success: true, code: 200, message: 'success' })
    } catch (error) {
        next(error)
    }
}

const getproduct = async(req, res, next) => {
    try {
        const { IDProduct } = req.params

        const product = await Product.findById(IDProduct).populate('detail_info.earphone')

        return res.status(200).json({ success: true, code: 200, message: '', product })
    } catch (error) {
        return next(error)
    }
}
const getAllEarPhone = async(req, res, next) => {
    try {
        const product = await Product.find().where('detail_info.earphone').ne(null)

        return res.status(200).json({ success: true, code: 200, message: '', product })
    } catch (error) {
        return next(error)
    }
}

const useImage = async(Schema) => {
    if (Schema.image) {
        for (const id_image of Schema.image) {
            const image = await Image_Pro.findById(id_image)
            image.use.push(Schema._id)
            await image.save()
        }
    }
    if (Schema.bigimage) {
        const bigImage = await Image_Pro.findById(Schema.bigimage)
        bigImage.use.push(Schema._id)
        await bigImage.save()
    }
}
const unUseImage = async(Schema) => {
    if (Schema.bigimage) {
        const bigImage = await Image_Pro.findById(Schema.bigimage)
        var index = bigImage.use.indexOf(Schema._id)
        if (index) {
            bigImage.use.splice(index, 1)
            await bigImage.save()
        }
    }
    if (Schema.image) {
        for (const id_image of Schema.image) {
            const imageObject = await Image_Pro.findById(id_image)
            if (imageObject) {
                var index = imageObject.use.indexOf(Schema._id)
                if (index) {
                    imageObject.use.splice(index, 1)
                    await imageObject.save()
                }
            }
        }
    }
}

const getAllProductByBrand = async(req, res, next) => {
    try {
        const { IDBrand } = req.params
        if (!Validator.isValidObjId(IDBrand)) return res.status(200).json({ success: false, code: 400, message: 'check link again!' })
        const products = await Product.find({ "brand": IDBrand }).where('detail_info.earphone').ne(null);

        return res.status(200).json({ success: true, code: 200, message: 'success', products })
    } catch (error) {
        return next(error)
    }
}

const getAllProductByCategory = async(req, res, next) => {
    try {
        const { IDCategory } = req.params
        if (!Validator.isValidObjId(IDCategory)) return res.status(200).json({ success: false, code: 400, message: 'check link again!' })
        const products = await Product.find({ "category": IDCategory }).where('detail_info.earphone').ne(null);

        return res.status(200).json({ success: true, code: 200, message: 'success', products: products })
    } catch (error) {
        return next(error)
    }
}
module.exports = {
    getproduct,
    addproduct,
    updateproduct,
    deleteproduct,
    getAllEarPhone,
    getAllProductByBrand,
    getAllProductByCategory
}