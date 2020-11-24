const Image_User = require('../models/Image_User')
const Image_Pro = require('../models/Image_Pro')
const cloudinary = require('cloudinary')
const fs = require('fs')

const getAllImg = async(req, res, next) => {
    try {
        const img = await Image_Pro.find()
        if (!img) res.status(404).json({ message: 'can not found any record' })
        return res.status(200).json({ images: { success: 'true', img } })
    } catch (error) {
        console.log(error)
        return next(error)
    }
}
const getAllImgUser = async(res, next) => {
    try {
        const img = await Image_User.find()
        if (!img) res.status(404).json({ message: 'can not found any record' })
        return res.status(200).json({ images: { success: 'true', img } })
    } catch (error) {
        return next(error)
    }
}

const uploadImage = async(req, res, next) => {
    try {

        if (!req.files || Object.keys(req.files).length === 0)
            return res.status(400).json({ message: 'No file were uploaded' })
        const fileimage = req.files.image
            // if (fileimage.size > 1024 * 1024) return res.status(400).json({ message: 'Size too large' })
        if (fileimage.mimetype !== 'image/png' && fileimage.mimetype !== 'image/jpeg' && fileimage.mimetype !== 'image/jpg') {
            removeTmp(fileimage.tempFilePath)
            return res.status(400).json({ message: 'The format file is incorrect' })
        }


        const imageMain = new Image_Pro()
        await cloudinary.v2.uploader.upload(fileimage.tempFilePath, { folder: 'Asset' }, async(err, result) => {
            if (err) next(err)
            imageMain.id_cloud = result.public_id
            imageMain.name = fileimage.name
            imageMain.public_url = result.url
            imageMain.save()
            removeTmp(fileimage.tempFilePath)

        })

        return res.status(200).json({ message: 'success', image: imageMain })

    } catch (error) {
        next(error)
    }
}

const uploadImageUser = async(req, res, next) => {
    try {

        if (!req.files || Object.keys(req.files).length === 0)
            return res.status(400).json({ message: 'No file were uploaded' })
        const fileimage = req.files.image
            // if (fileimage.size > 1024 * 1024) return res.status(400).json({ message: 'Size too large' })
        if (fileimage.mimetype !== 'image/png' && fileimage.mimetype !== 'image/jpeg' && fileimage.mimetype !== 'image/jpg') {
            removeTmp(fileimage.tempFilePath)
            return res.status(400).json({ message: 'The format file is incorrect' })
        }


        const imageMain = new Image_User()
        await cloudinary.v2.uploader.upload(fileimage.tempFilePath, { folder: 'Asset' }, async(err, result) => {
            if (err) next(err)
            imageMain.id_cloud = result.public_id
            imageMain.name = fileimage.name
            imageMain.public_url = result.url
            imageMain.save()
            removeTmp(fileimage.tempFilePath)

        })

        return res.status(200).json({ message: 'success', image: imageMain })

    } catch (error) {
        next(error)
    }
}

const getImage = async(req, res, next) => {
    try {
        const { IDImage } = req.params

        const image = await Image_Pro.findById(IDImage)

        if (!image) return res.status(404).json({ message: 'Can not found any image' })

        return res.status(200).json({ image })
    } catch (error) {
        return next(error)
    }
}

const getImageUser = async(req, res, next) => {
    try {
        const { IDImage } = req.params

        const image = await Image_User.findById(IDImage)

        if (!image) return res.status(404).json({ message: 'Can not found any image' })

        return res.status(200).json({ image })
    } catch (error) {
        return next(error)
    }
}

const deleteImage = async(req, res, next) => {
    try {
        const { IDImage } = req.params
        const image = await Image_Pro.findById(IDImage)
        if (!image) return res.status(404).json({ message: 'Can not matching any Image' })
        if (image.use) return res.status(403).json({ message: 'Image are using, can not delete' })

        const public_id = image.id_cloud
        await cloudinary.v2.uploader.destroy(public_id, async(err, result) => {
            if (err) next(err)
        })

        await Image_Pro.findByIdAndDelete(IDImage)
        return res.status(200).json({ message: 'deleted image' })

    } catch (error) {

    }
}

const removeTmp = async(path) => {
    try {
        fs.unlink(path, err => { if (err) throw err })
    } catch (error) {

    }
}
module.exports = {
    getAllImg,
    getAllImgUser,
    uploadImage,
    uploadImageUser,
    deleteImage,
    getImage,
    getImageUser
}