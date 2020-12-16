const Product = require('../models/Product')
const Category = require('../models/Category')
const Brand = require('../models/Brand')
    //const Display = require('../models/Display')
    //const Revolution = require('../models/Revolution')
    //const Widescreen = require('../models/Widescreen')
const Operation = require('../models/Operation')
    //const CPU = require('../models/CPU')
const Color = require('../models/Color')
const Mobile = require('../models/Mobile')
const Image_Pro = require('../models/Image_Pro')
    //const Origin = require('../models/Origin')
    //const { Schema, Mongoose } = require('mongoose')
const Validator = require('../validators/validator')

const addproduct = async(req, res, next) => {
    try {
        const { name, price, amount, pathseo, warrently, bigimage, image, category, brand } = req.body
        const { display, widescreen, operation, camera1, camera2, cpu, ram, memory, microcard, sim, network, pin, quickcharging, weight, thick, color } = req.body.detail_info

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


        const mobile = new Mobile();
        if (operation) {
            const is_operation = await Operation.findById(operation);
            if (!is_operation) return res.status(200).json({ success: false, code: 404, message: 'operation is identify' });
            mobile.operation = operation;
        }
        if (camera1) mobile.camera1 = camera1;
        if (camera2) mobile.camera2 = camera2;
        if (cpu) mobile.cpu = cpu;
        if (display) mobile.display = display;
        if (widescreen) mobile.widescreen = widescreen;
        if (ram) mobile.ram = ram;
        if (memory) mobile.memory = memory;
        if (microcard) mobile.microcard = microcard
        if (sim) mobile.sim = sim
        if (pin) mobile.pin = pin
        if (network) mobile.network = network
        if (quickcharging) mobile.quickcharging = quickcharging
        if (weight) mobile.weight = weight
        if (thick) mobile.thick = thick
        if (color) {
            const is_color = await Color.findById(color);
            if (!is_color) return res.status(200).json({ success: false, code: 404, message: 'color is identify' });
            mobile.color = color
        }
        await mobile.save()

        product.detail_info.mobile = mobile._id
        await product.save()

        //await useImage(newProduct)

        const returnProduct = await Product.findById(product._id).populate('detail_info.mobile')
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
        const { display, widescreen, operation, camera1, camera2, cpu, ram, memory, microcard, sim, network, pin, quickcharging, weight, thick, color } = req.body.detail_info.mobile

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

        const mobile = await Mobile.findById(product.detail_info.mobile)
        if (display) mobile.display = display;
        if (widescreen) mobile.widescreen = widescreen;
        if (operation) {
            const is_operation = await Operation.findById(operation);
            if (!is_operation) return res.status(200).json({ success: false, code: 404, message: 'operation is identify' });
            mobile.operation = operation;
        }
        if (camera1) mobile.camera1 = camera1
        if (camera2) mobile.camera2 = camera2

        if (ram) mobile.ram = ram;
        if (memory) mobile.memory = memory;
        if (microcard) mobile.microcard = microcard
        if (sim) mobile.sim = sim
        if (pin) mobile.pin = pin
        if (network) mobile.network = network
        if (quickcharging) mobile.quickcharging = quickcharging
        if (weight) mobile.weight = weight
        if (thick) mobile.thick = thick
        if (color) {
            const is_color = await Color.findById(color);
            if (!is_color) return res.status(200).json({ success: false, code: 404, message: 'color is identify' });
            mobile.color = color
        }

        //await unUseImage(product)
        await product.save()
            //await useImage(product)

        await mobile.save()
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
        await unUseImage(product)
        await Mobile.findByIdAndDelete(product.detail_info.mobile)
        await Product.findByIdAndDelete(IDProduct)
        return res.status(200).json({ success: true, code: 200, message: 'success' })
    } catch (error) {
        next(error)
    }
}

const getproduct = async(req, res, next) => {
    try {
        const { IDProduct } = req.params

        const product = await Product.findById(IDProduct).populate('detail_info.mobile')
            .populate({ path: 'bigimage', select: 'public_url' })
            .populate({ path: 'image', select: 'public_url' });

        return res.status(200).json({ success: true, code: 200, message: '', product })
    } catch (error) {
        return next(error)
    }
}
const getAllMobile = async(req, res, next) => {
    try {
        const product = await Product.find().where('detail_info.mobile').ne(null)
            .populate({ path: 'bigimage', select: 'public_url' })
            .populate({ path: 'image', select: 'public_url' });

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
        const products = await Product.find({ "brand": IDBrand }).where('detail_info.mobile').ne(null)
            .populate({ path: 'bigimage', select: 'public_url' })
            .populate({ path: 'image', select: 'public_url' });

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
        const products = await Product.find({ "detail_info.mobile": listID }).where('detail_info.mobile').ne(null)
            .populate({ path: 'bigimage', select: 'public_url' })
            .populate({ path: 'image', select: 'public_url' });
        return res.status(200).json({ success: true, code: 200, message: 'success', products })
    } catch (error) {
        return next(error)
    }
}

const getAllProductByCategory = async(req, res, next) => {
    try {
        const { IDCategory } = req.params
        if (!Validator.isValidObjId(IDCategory)) return res.status(200).json({ success: false, code: 400, message: 'check link again!' })
        const products = await Product.find({ "category": IDCategory }).where('detail_info.mobile').ne(null)
            .populate({ path: 'bigimage', select: 'public_url' })
            .populate({ path: 'image', select: 'public_url' });

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
    getAllMobile,
    getAllProductByBrand,
    getAllProductByCategory,
    getAllProductByColor
}