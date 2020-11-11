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
const { Schema } = require('mongoose')

const addproduct = async(req, res, next) => {
    try {
        const { name, price, amount, pathseo, warrently, createdate, bigimage, image, category, brand, origin } = req.body
        const { display, revolution, widescreen, operation, camera1, camera2, cpu, ram, memory, microcard, sim, network, pin, quickcharging, weight, thick, color } = req.body.detail_info

        const is_category = await Category.findById(category)
        if (!is_category) return res.status(404).json({ error: { message: 'Can not matching any Category' } })

        const is_brand = await Brand.findById(brand)
        if (!is_brand) return res.status(404).json({ error: { message: 'Can not matching any Brand' } })

        const is_display = await Display.findById(display)
        if (!is_display) return res.status(404).json({ error: { message: 'Can not matching any Display' } })

        const is_revolution = await Revolution.findById(revolution)
        if (!is_revolution) return res.status(404).json({ error: { message: 'Can not matching any Revolution' } })

        const is_widescreen = await Widescreen.findById(widescreen)
        if (!is_widescreen) return res.status(404).json({ error: { message: 'Can not matching any WideCreen' } })

        const is_operation = await Operation.findById(operation)
        if (!is_operation) return res.status(404).json({ error: { message: 'Can not matching any Operation' } })

        const is_cpu = await CPU.findById(cpu)
        if (!is_cpu) return res.status(404).json({ error: { message: 'Can not matching any CPU' } })

        const is_color = await Color.findById(color)
        if (!is_color) return res.status(404).json({ error: { message: 'Can not matching any Color' } })

        const newMobile = new Mobile({ display, revolution, widescreen, operation, camera1, camera2, cpu, ram, memory, microcard, sim, network, pin, quickcharging, weight, thick, color })
        await newMobile.save()

        const newProduct = new Product({ name, price, amount, pathseo, warrently, createdate, bigimage, image, category, brand, origin })
        newProduct.detail_info.mobile = newMobile._id
        await newProduct.save()

        newMobile.generalinfo = newProduct._id
        await newMobile.save()

        await useImage(newProduct)
            /* if (image) {
                 for (const id_image of image) {
                     const image = await Image_Pro.findById(id_image)
                     image.use.push(newProduct._id)
                     await image.save()
                 }
             }
             if (bigimage) {
                 const bigImage = await Image_Pro.findById(bigimage)
                 bigImage.use.push(newProduct._id)
                 await bigImage.save()
             }*/

        const returnProduct = await Product.findById(newProduct._id).populate('detail_info.mobile')
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

        const { name, price, amount, pathseo, warrently, createdate, bigimage, image, category, brand, origin } = req.body
        const { display, revolution, widescreen, operation, camera1, camera2, cpu, ram, memory, microcard, sim, network, pin, quickcharging, weight, thick, color } = req.body.detail_info.mobile

        const product = await Product.findById(IDProduct)
        if (!product) return res.status(404).json({ error: { message: 'Can not found product need to update' } })

        await unUseImage(product)
            /* if (product.bigimage) {
                 const bigImage = await Image_Pro.findById(product.bigimage)
                 var index = bigImage.use.indexOf(product._id)
                 if (index) {
                     await bigImage.use.splice(index, 1)
                 }
             }
             if (product.image) {
                 for (const id_image of product.image) {
                     const imageObject = await Image_Pro.findById(id_image)
                     if (imageObject) {
                         var index = imageObject.use.indexOf(product._id)
                         if (index) {
                             imageObject.use.splice(index, 1)
                             await imageObject.save()
                         }
                     }
                 }
             }*/
        product.name = name
        product.price = price
        product.amount = amount
        product.pathseo = pathseo
        product.warrently = warrently
        product.category = category
        product.brand = brand
        product.origin = origin
        product.createdate = createdate
        product.bigimage = bigimage
        product.image = image
        await product.save()

        await useImage(product)

        const mobile = await Mobile.findById(product.detail_info.mobile)
        mobile.display = display
        mobile.revolution = revolution
        mobile.widescreen = widescreen
        mobile.operation = operation
        mobile.camera1 = camera1
        mobile.camera2 = camera2
        mobile.cpu = cpu
        mobile.ram = ram
        mobile.memory = memory
        mobile.microcard = microcard
        mobile.sim = sim
        mobile.pin = pin
        mobile.network = network
        mobile.quickcharging = quickcharging
        mobile.weight = weight
        mobile.thick = thick
        mobile.color = color
        await mobile.save()
        return res.status(200).json({ success: 'true' })
    } catch (error) {
        return next(error)
    }
}

const deleteproduct = async(req, res, next) => {
    try {
        console.log("Ok1")
        const { IDProduct } = req.params
        console.log("Ok2")
        const product = await Product.findById(IDProduct)
        console.log("Ok3")
        if (!product) return res.status(404).json({ error: { message: 'The product is not exist' } })
        console.log("Ok4")
        await unUseImage(product)
        console.log("Ok5")
        await Mobile.findByIdAndDelete(product.detail_info.mobile)
        console.log("Ok6")
        await Product.findByIdAndDelete(IDProduct)
        console.log("Ok7")
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

module.exports = {
    getproduct,
    addproduct,
    updateproduct,
    deleteproduct,
    getAllMobile
}