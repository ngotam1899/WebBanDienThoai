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
    //const slp = require('sleep')

const addproduct = async(req, res, next) => {
    try {
        const { name, price, amount, pathseo, warrently, createdate, category, brand, origin } = req.body
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



        //slp.sleep(2)

        const newMobile = new Mobile({ display, revolution, widescreen, operation, camera1, camera2, cpu, ram, memory, microcard, sim, network, pin, quickcharging, weight, thick, color })
        await newMobile.save()

        const newProduct = new Product({ name, price, amount, pathseo, warrently, createdate, category, brand, origin })
        newProduct.detail_info.mobile = newMobile._id
        await newProduct.save()

        newMobile.generalinfo = newProduct._id
        await newMobile.save()

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

        const { name, price, amount, pathseo, warrently, createdate, category, brand, origin } = req.body
        const { display, revolution, widescreen, operation, camera1, camera2, cpu, ram, memory, microcard, sim, network, pin, quickcharging, weight, thick, color } = req.body.detail_info.mobile

        const product = await Product.findById(IDProduct)
        if (!product) return res.status(404).json({ error: { message: 'Can not found product need to update' } })

        product.name = name
        product.price = price
        product.amount = amount
        product.pathseo = pathseo
        product.warrently = warrently
        product.category = category
        product.brand = brand
        product.origin = origin
        product.createdate = createdate
        await product.save()

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
        const { IDProduct } = req.params
        const product = await Product.findById(IDProduct)
        if (!product) return res.status(404).json({ error: { message: 'The product is not exist' } })

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

const validatorMobile = async(req, res, next) => {

}

module.exports = {
    getproduct,
    addproduct,
    updateproduct,
    deleteproduct,
    getAllMobile
}