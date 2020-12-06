const WideScreen = require('../models/Widescreen')
const Validator = require('../validators/validator')

const createError = require('http-errors')

const getAllWideScreen = async(req, res, next) => {
    try {
        const widescreens = await WideScreen.find()

        return res.status(200).json({ success: true, code: 200, message: '', widescreens: widescreens })
    } catch (error) {
        return next(error)
    }
}
const addWideScreen = async(req, res, next) => {
    const newWideScreen = new WideScreen(req.body)
    await newWideScreen.save()
    return res.status(200).json({ success: true, code: 201, message: '', widescreen: newWideScreen })
}
const updateWideScreen = async(req, res, next) => {

    const { IDWideScreen } = req.params

    const widescreen = req.body

    const result = await WideScreen.findByIdAndUpdate(IDWideScreen, widescreen)

    if (!result) {
        return res.status(200).json({ success: false, code: 404, message: 'id widescreen is not correctly' })
    }

    return res.status(200).json({ success: true, code: 200, message: '' })
}
const deleteWidecreen = async(req, res, next) => {
    const { IDWideScreen } = req.params
    const isValid = await Validator.isValidObjId(IDWideScreen);
    if (!isValid) { return res.status(200).json({ success: false, code: 400, message: 'id widescreen is not correctly' }) } else {
        const result = await WideScreen.findByIdAndDelete(IDWideScreen);
        if (result) return res.status(200).json({ success: true, code: 200, message: '' })
    }

}

module.exports = {
    getAllWideScreen,
    addWideScreen,
    updateWideScreen,
    deleteWidecreen
}