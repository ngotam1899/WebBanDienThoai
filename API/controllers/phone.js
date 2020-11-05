const Mobile = require('../models/Mobile')
const Product = require('../models/Product')
const Category = require('../models/Category')
const Brand = require('../models/Brand')
const Display = require('../models/Display')
const Revolution = require('../models/Revolution')
const Widescreen = require('../models/Widescreen')
const Operation = require('../models/Operation')
const CPU = require('../models/CPU')
const Color = require('../models/Color')
const slp = require('sleep')
const { addWideScreen } = require('./widescreen')

const addMobile = async(req, res, next) => {
    try {
        const { name, price, amount, pathseo, warrently, createdate, bigimage, image, category, brand, origin } = req.body.generalinfo
        const { display, revolution, widescreen, operation, camera1, camera2, cpu, ram, memory, microcard, sim, network, pin, quickcharging, weight, thick, color } = req.body

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

        const newProduct = new Product({ name, price, amount, pathseo, warrently, createdate, bigimage, image, category, brand, origin })
        await newProduct.save()

        slp.sleep(2)

        const newMobile = new Mobile({ display, revolution, widescreen, operation, camera1, camera2, cpu, ram, memory, microcard, sim, network, pin, quickcharging, weight, thick, color })
        newMobile.generalinfo = newProduct._id
        newMobile.save()


        newMobile.generalinfo = newProduct

        return res.status(201).json({ product: newMobile })

    } catch (error) {
        return next(error)
    }
}

const getAllMobile = async(req, res, next) => {
    try {
        const products = await Mobile.find()
            .populate({ path: 'display', select: 'name' })
            .populate({ path: 'revolution', select: 'revolution' })
            .populate({ path: 'widescreen', select: 'widescreen' })
            .populate({ path: 'operation', select: 'operation' })
            .populate({ path: 'cpu', select: 'cpu' })
            .populate({ path: 'color', select: 'color' })
            .populate({ path: 'generalinfo', populate: { path: 'category', select: 'name' } })
            .populate({ path: 'generalinfo', populate: { path: 'brand', select: 'name' } })
        return res.status(200).json({ products: { success: 'true', products } })
    } catch (error) {
        return next(error)
    }
}

const updateMobile = async(req, res, next) => {
    try {
        const { IDMobile } = req.params

        const mobile = await Mobile.findById(IDMobile)
        if (!mobile) return res.status(404).json({ error: { message: 'Can not found product need to update' } })

        const { name, price, amount, pathseo, warrently, createdate, bigimage, image, category, brand, origin } = req.body.generalinfo
        const { display, revolution, widescreen, operation, camera1, camera2, cpu, ram, memory, microcard, sim, network, pin, quickcharging, weight, thick, color } = req.body

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
        mobile.save()

        const product = await Product.findById(mobile.generalinfo)
        product.name = name
        product.price = price
        product.amount = amount
        product.pathseo = pathseo
        product.warrently = warrently
        product.category = category
        product.brand = brand
        product.origin = origin
        product.save()

        return res.status(200).json({ success: 'true' })
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    getAllMobile,
    addMobile,
    updateMobile
}