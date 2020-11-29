const Product = require('../models/Product')
const Category = require('../models/Category')
const Brand = require('../models/Brand')
const Display = require('../models/Display')
const Revolution = require('../models/Revolution')
const Widescreen = require('../models/Widescreen')
const Operation = require('../models/Operation')
const CPU = require('../models/CPU')
const Color = require('../models/Color')
const Mobile = require('../models/Mobile')
const Image_Pro = require('../models/Image_Pro')
const Origin = require('../models/Origin')
    //const { Schema, Mongoose } = require('mongoose')
const Validator = require('../validators/validator')

const addproduct = async(req, res, next) => {
    try {
        const { name, price, amount, pathseo, warrently, bigimage, image, category, brand, origin } = req.body
        const { display, revolution, widescreen, operation, camera1, camera2, cpu, ram, memory, microcard, sim, network, pin, quickcharging, weight, thick, color } = req.body.detail_info

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
            if (!is_category) return res.status(404).json({ message: 'category is identify' })
            product.category = category
        }
        if (brand) {
            const is_brand = await Brand.findById(brand)
            if (!is_brand) return res.status(404).json({ message: 'brand is identify' })
            product.brand = brand;
        }
        if (origin) {
            const is_origin = await Origin.findById(origin)
            if (!is_origin) return res.status(404).json({ message: 'origin is identify' })
        }

        const mobile = new Mobile();

        if (display) {
            const is_display = await Display.findById(display)
            if (!is_display) return res.status(404).json({ message: 'display is identify' })
            mobile.display = display;
        }
        if (revolution) {
            const is_revolution = await Revolution.findById(revolution);
            if (!is_revolution) return res.status(404).json({ message: 'revolution is identify' });
            mobile.revolution = revolution
        }
        if (widescreen) {
            const is_widescreen = await Widescreen.findById(widescreen);
            if (!is_widescreen) return res.status(404).json({ message: 'widecreen is identify' });
            mobile.widescreen = widescreen;
        }
        if (operation) {
            const is_operation = await Operation.findById(operation);
            if (!is_operation) return res.status(404).json({ message: 'operation is identify' });
            mobile.operation = operation;
        }
        if (camera1) mobile.camera1 = camera1
        if (camera2) mobile.camera2 = camera2
        if (cpu) {
            const is_cpu = await CPU.findById(cpu);
            if (!is_cpu) return res.status(404).json({ message: 'cpu is identify' });
            mobile.cpu = cpu;
        }
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
            if (!is_color) return res.status(404).json({ message: 'color is identify' });
            mobile.color = color
        }
        await mobile.save()

        product.detail_info.mobile = mobile._id
        await product.save()

        //await useImage(newProduct)

        const returnProduct = await Product.findById(product._id).populate('detail_info.mobile')
        return res.status(201).json({
            product: returnProduct
        })

    } catch (error) {
        return next(error)
    }
}


const updateproduct = async(req, res, next) => {
    try {
        const { IDProduct } = req.params

        const { name, price, amount, pathseo, warrently, bigimage, image, category, brand, origin } = req.body
        const { display, revolution, widescreen, operation, camera1, camera2, cpu, ram, memory, microcard, sim, network, pin, quickcharging, weight, thick, color } = req.body.detail_info.mobile

        const product = await Product.findById(IDProduct)
        if (!product) return res.status(404).json({ error: { message: 'Can not found product need to update' } })

        if (name) product.name = name;
        if (price) product.price = price;
        if (amount) product.amount = amount;
        if (pathseo) product.pathseo = pathseo;
        if (warrently) product.warrently = warrently;
        if (bigimage) product.bigimage = bigimage;
        if (image) product.image = image
        if (category) {
            const is_category = await Category.findById(category)
            if (!is_category) return res.status(404).json({ message: 'category is identify' })
            product.category = category
        }
        if (brand) {
            const is_brand = await Brand.findById(brand)
            if (!is_brand) return res.status(404).json({ message: 'brand is identify' })
            product.brand = brand;
        }
        if (origin) {
            const is_origin = await Origin.findById(origin)
            if (!is_origin) return res.status(404).json({ message: 'origin is identify' })
        }

        const mobile = await Mobile.findById(product.detail_info.mobile)
        if (display) {
            const is_display = await Display.findById(display)
            if (!is_display) return res.status(404).json({ message: 'display is identify' })
            mobile.display = display;
        }
        if (revolution) {
            const is_revolution = await Revolution.findById(revolution);
            if (!is_revolution) return res.status(404).json({ message: 'revolution is identify' });
            mobile.revolution = revolution
        }
        if (widescreen) {
            const is_widescreen = await Widescreen.findById(widescreen);
            if (!is_widescreen) return res.status(404).json({ message: 'widecreen is identify' });
            mobile.widescreen = widescreen;
        }
        if (operation) {
            const is_operation = await Operation.findById(operation);
            if (!is_operation) return res.status(404).json({ message: 'operation is identify' });
            mobile.operation = operation;
        }
        if (camera1) mobile.camera1 = camera1
        if (camera2) mobile.camera2 = camera2
        if (cpu) {
            const is_cpu = await CPU.findById(revolution);
            if (!is_cpu) return res.status(404).json({ message: 'cpu is identify' });
            mobile.cpu = cpu;
        }
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
            if (!is_color) return res.status(404).json({ message: 'color is identify' });
            mobile.color = color
        }

        //await unUseImage(product)
        await product.save()
            //await useImage(product)

        await mobile.save()
        return res.status(200).json({ success: 'true' })
    } catch (error) {
        return next(error)
    }
}

const deleteproduct = async(req, res, next) => {
    try {
        const { IDProduct } = req.params
        const product = await Product.findById(IDProduct)
        if (!product) return res.status(404).json({ error: { message: 'The product is not exist' } })
        await unUseImage(product)
        await Mobile.findByIdAndDelete(product.detail_info.mobile)
        await Product.findByIdAndDelete(IDProduct)
        return res.status(200).json({ message: 'success' })
    } catch (error) {
        next(error)
    }
}

const getproduct = async(req, res, next) => {
    try {
        const { IDProduct } = req.params

        const product = await Product.findById(IDProduct).populate('detail_info.mobile')

        if (!product) return res.status(404).json({ message: 'can not found any record' })

        return res.status(200).json({ product })
    } catch (error) {
        return next(error)
    }
}
const getAllMobile = async(req, res, next) => {
    try {
        const product = await Product.find().where('detail_info.mobile').ne(null)

        if (!product) return res.status(404).json({ message: 'can not found any record' })

        return res.status(200).json({ product })
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
        if (!Validator.isValidObjId(IDBrand)) return res.status(400).json({ message: 'Bad Request, check link again!' })
        const products = await Product.find({ "brand": IDBrand });

        return res.status(200).json({ message: 'success', products })
    } catch (error) {
        return next(error)
    }
}

const getAllProductByColor = async(req, res, next) => {
    try {
        const { IDColor } = req.params
        if (!Validator.isValidObjId(IDColor)) return res.status(400).json({ message: 'Bad Request, check link again!' })
        const mobile = await Mobile.find({ "color": IDColor });

        const listID = [];

        mobile.forEach(async(element) => {
            listID.push(element._id);
        });
        const products = await Product.find({ "detail_info.mobile": listID });
        return res.status(200).json({ message: 'success', products })
    } catch (error) {
        return next(error)
    }
}

const getAllProductByCategory = async(req, res, next) => {
    try {
        const { IDCategory } = req.params
        if (!Validator.isValidObjId(IDCategory)) return res.status(400).json({ message: 'Bad Request, check link again!' })
        const products = await Product.find({ "category": IDCategory });

        return res.status(200).json({ message: 'success', products })
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