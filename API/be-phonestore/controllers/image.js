const Image_User = require('../models/Image_User')
const Image_Pro = require('../models/Image_Pro')
const Image_Brand = require('../models/Image_Brand');
const cloudinary = require('cloudinary')
const fs = require('fs')
const Validator = require('../validators/validator')

const getAllImg = async(req, res, next) => {
    try {
        const img = await Image_Pro.find()
        if (!img) res.status(404).json({ message: 'can not found any record' })
        return res.status(200).json({ images: { success: true, code: 200, images: img } })
    } catch (error) {
        return next(error)
    }
}
const getAllImgUser = async(res, next) => {
    try {
        const img = await Image_User.find()
        return res.status(200).json({ images: { success: true, code: 200, message: '', images: img } })
    } catch (error) {
        return next(error)
    }
}

const uploadImage = async(req, res, next) => {
    try {

        if (!req.files || Object.keys(req.files).length === 0)
            return res.status(200).json({ success: false, code: 400, message: 'No file were uploaded' })
        const image = [];
        var isValid;
        const fileimage = req.files.image;
        // if (fileimage.size > 1024 * 1024) return res.status(400).json({ message: 'Size too large' })
        if (!fileimage.length) {
            isValid = Validator.isValidFile(fileimage);
            if (isValid == false) {
                await removeTmp(fileimage.tempFilePath);
                return res.status(200).json({ success: false, code: 400, message: 'The format file is incorrect!' })
            }
            image.push(await (upload(fileimage, Image_Pro)));
        } else {
            for (var index = 0; index < fileimage.length; index++) {
                isValid = Validator.isValidFile(fileimage[index]);
                if (isValid == false) {
                    fileimage.forEach(element => {
                        removeTmp(element.tempFilePath)
                    });
                    index = fileimage.length + 1;
                }
            }
            if (isValid == false) {
                return res.status(200).json({ success: false, code: 400, message: 'The format file is incorrect!' })
            }
            for (let item of fileimage) {
                image.push(await (upload(item, Image_Pro)))
            }
        }
        return res.status(200).json({ success: true, code: 200, message: "", images: image })

    } catch (error) {
        next(error)
    }
}
const upload = async(file, Schema) => {
    try {
        const imageMain = new Schema();
        await cloudinary.v2.uploader.upload(file.tempFilePath, { folder: 'Asset' }, async(err, result) => {
            if (err) next(err)
            imageMain.id_cloud = result.public_id
            imageMain.name = file.name
            imageMain.public_url = result.url
            imageMain.save()
            await removeTmp(file.tempFilePath)

        })
        return imageMain;
    } catch (error) {}
}

const uploadImageUser = async(req, res, next) => {
    try {

        if (!req.files || Object.keys(req.files).length === 0)
            return res.status(200).json({ success: false, code: 400, message: 'No file were uploaded' })
        const fileimage = req.files.image
        if (fileimage.length > 0) {
            fileimage.forEach(element => {
                removeTmp(element)
            });
            return res.status(200).json({ success: false, code: 400, message: 'Can not upload multiple file' })
        }
        if (Validator.isValidFile(fileimage) == false) {
            await removeTmp(fileimage);
            return res.status(200).json({ success: false, code: 400, message: 'The format file is incorrect!' })
        }

        const image = await upload(fileimage, Image_User)

        return res.status(200).json({ success: true, code: 200, message: "", image: image })

    } catch (error) {
        next(error)
    }
}

const uploadImageBrand = async(req, res, next) => {
    try {

        if (!req.files || Object.keys(req.files).length === 0)
            return res.status(200).json({ success: false, code: 400, message: 'No file were uploaded' })
        const fileimage = req.files.image
        if (fileimage.length > 0) {
            fileimage.forEach(element => {
                removeTmp(element)
            });
            return res.status(200).json({ success: false, code: 400, message: 'Can not upload multiple file' })
        }
        if (Validator.isValidFile(fileimage) == false) {
            await removeTmp(fileimage);
            return res.status(200).json({ success: false, code: 400, message: 'The format file is incorrect!' })
        }

        const image = await upload(fileimage, Image_Brand)

        return res.status(200).json({ success: true, code: 200, message: "", image: image })

    } catch (error) {
        next(error)
    }
}

const getImage = async(req, res, next) => {
    try {
        const { IDImage } = req.params

        const image = await Image_Pro.findById(IDImage)

        return res.status(200).json({ success: true, code: 200, message: '', image: image })
    } catch (error) {
        return next(error)
    }
}

const getImageUser = async(req, res, next) => {
    try {
        const { IDImage } = req.params

        const image = await Image_User.findById(IDImage)

        return res.status(200).json({ success: true, code: 200, message: '', image: image })
    } catch (error) {
        return next(error)
    }
}

const getAImageBrand = async(req, res, next) => {
    try {
        const { IDImage } = req.params

        const image = await Image_Brand.findById(IDImage)

        return res.status(200).json({ success: true, code: 200, message: '', image: image })
    } catch (error) {
        return next(error)
    }
}
const getAllImageBrand = async(req, res, next) => {
    try {
        const image = await Image_Brand.find()
        return res.status(200).json({ success: true, code: 200, message: '', image: image })
    } catch (error) {
        return next(error)
    }
}

const deleteImage = async(req, res, next) => {
    try {
        const { IDImage } = req.params
        const image = await Image_Pro.findById(IDImage)
        if (!image) return res.status(200).json({ success: false, code: 200, message: 'Can not matching any Image' })
        if (image.use) return res.status(200).json({ success: false, code: 403, message: 'Image are using, can not delete' })

        const public_id = image.id_cloud
        await cloudinary.v2.uploader.destroy(public_id, async(err, result) => {
            if (err) next(err)
        })

        await Image_Pro.findByIdAndDelete(IDImage)
        return res.status(200).json({ success: true, code: 200, message: 'deleted image' })

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
    getAllImageBrand,
    uploadImage,
    uploadImageUser,
    uploadImageBrand,
    deleteImage,
    getImage,
    getImageUser,
    getAImageBrand
}