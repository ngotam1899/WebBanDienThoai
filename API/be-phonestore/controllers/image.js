const Image = require('../models/Image');
const cloudinary = require('cloudinary');
const fs = require('fs');
const Validator = require('../validators/validator');

const uploadImage = async (req, res, next) => {
	try {
		if (!req.files || Object.keys(req.files).length === 0)
			return res.status(200).json({ success: false, code: 400, message: 'No file were uploaded' });
		const image = [];
		var isValid;
		const fileimage = req.files.image;
		if (!fileimage.length) {
			isValid = Validator.isValidFile(fileimage);
			if (isValid == false) {
				await removeTmp(fileimage.tempFilePath);
				return res.status(200).json({ success: false, code: 400, message: 'The format file is incorrect!' });
			}
			image.push(await upload(fileimage, Image));
		} else {
			for (var index = 0; index < fileimage.length; index++) {
				isValid = Validator.isValidFile(fileimage[index]);
				if (isValid == false) {
					fileimage.forEach((element) => {
						removeTmp(element.tempFilePath);
					});
					index = fileimage.length + 1;
				}
			}
			if (isValid == false) {
				return res.status(200).json({ success: false, code: 400, message: 'The format file is incorrect!' });
			}
			for (let item of fileimage) {
				image.push(await upload(item, Image));
			}
		}
		return res.status(200).json({ success: true, code: 200, message: '', images: image });
	} catch (error) {
		next(error);
	}
};
const upload = async (file, Schema) => {
	try {
		const imageMain = new Schema();
		await cloudinary.v2.uploader.upload(file.tempFilePath, { folder: 'Asset' }, async (err, result) => {
			if (err) next(err);
			imageMain.public_url = result.url;
			imageMain.save();
			await removeTmp(file.tempFilePath);
		});
		return imageMain;
	} catch (error) {}
};

const removeTmp = async (path) => {
	try {
		fs.unlink(path, (err) => {
			if (err) throw err;
		});
	} catch (error) {
		next(error);
	}
};
module.exports = {
	uploadImage,
	upload
};
