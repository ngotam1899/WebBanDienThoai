const WideScreen = require('../models/Widescreen')

const createError = require('http-errors')

const getAllWideScreen = async(req, res, next) => {
    try {
        const widescreens = await WideScreen.find()

        return res.status(200).json({ widescreens: { success: 'true', widescreens } })
    } catch (error) {
        return next(error)
    }
}
const addWideScreen = async(req, res, next) => {
    const newWideScreen = new WideScreen(req.body)
    await newWideScreen.save()
    return res.status(201).json({ widescreen: newWideScreen })
}
const updateWideScreen = async(req, res, next) => {

    const { IDWideScreen } = req.params

    const widescreen = req.body

    const result = await WideScreen.findByIdAndUpdate(IDWideScreen, widescreen)

    if (!result) {
        return res.status(404).json({ message: 'id widescreen is not correctly' })
    }

    return res.status(200).json({ success: 'true' })
}

module.exports = {
    getAllWideScreen,
    addWideScreen,
    updateWideScreen
}