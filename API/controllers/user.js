const User = require('../models/User')
const createError = require('http-errors')
const bcrypts = require('bcryptjs')

const JWT = require('jsonwebtoken')
const { JWT_SECRET } = require('../configs/config')

const encodedToken = (userID) => {
    return 'Bearer ' + JWT.sign({
        iss: 'Mai Tuong',
        sub: userID,
        iat: new Date().getTime(),
        exp: new Date().setHours(6)
    }, JWT_SECRET)
}

const logOut = async(req, res, next) => {
    headers = req.headers
}

const signIn = async(req, res, next) => {
    const salt = await bcrypts.genSalt(15)
    req.user.devide_code = await bcrypts.hash(req.user.email, salt)
    req.user.save()

    const token = encodedToken(req.user._id)
    res.setHeader('Devide_code', req.user.devide_code)
    res.setHeader('Authorization', token)

    return res.status(200).json({ success: 'true' })
}

const signUp = async(req, res, next) => {
    const { firstname, lastname, phonenumber, address, image, email, password, role } = req.body

    const foundUser = await User.findOne({ email })
    if (foundUser) {
        return next(createError(403, 'Email is already in use'))
    }
    const newUser = new User({ firstname, lastname, phonenumber, address, image, email, password, role })

    await newUser.save()

    const token = encodedToken(newUser._id)

    res.setHeader("Authorization", token)

    return res.status(201).json({ success: true })
}

const secret = async(req, res, next) => {
    return res.status(200).json({ resources: true })
}

const getAllUser = async(req, res, next) => {
    try {
        const users = await User.find()

        return res.status(200).json({ users: { success: 'true', users } })
    } catch (error) {
        return next(error)
    }
}

const getUser = async(req, res, next) => {
    try {
        const { userID } = req.params

        const user = await User.findById(userID)

        return res.status(200).json({ user })
    } catch (error) {
        return next(error)
    }

}

const newUser = async(req, res) => {
    const newUser = new User(req.body)
    await newUser.save()
    return res.status(201).json({ user: newUser })
}

const replaceUser = async(req, res) => {
    const { userID } = req.params
    const newUser = req.body

    const user = await User.findById(userID)

    if (!user) {
        return res.status(404).json({ error: { message: 'Can not found user need to update' } })
    }

    newUser.email = user.email;
    newUser.password = user.password;

    await user.update(newUser)

    return res.status(200).json({ success: 'true' })
}

module.exports = {
    getAllUser,
    getUser,
    newUser,
    replaceUser,
    signIn,
    signUp,
    secret,
    logOut
}