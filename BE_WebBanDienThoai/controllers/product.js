const Comment = require('../models/Comment')
const Image_Pro = require('../models/Image_Pro')

const cloudinary = require('cloudinary')

const createError = require('http-errors')
const Product = require('../models/Product')
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
        await product.save()
        console.log(product)
        return res.status(200).json({ message: 'success' })

    } catch (error) {
        next(error)
    }
}

const getAllProduct = async(req, res, next) => {
    try {
        const products = await Product.find({})
        return res.status(200).json({ products: { success: 'true', products } })
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    uploadImageMobile,
    getAllProduct
}