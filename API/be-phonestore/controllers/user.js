const User = require('../models/User')
const createError = require('http-errors')
const bcrypts = require('bcryptjs')
var smtpTransport = require('nodemailer-smtp-transport');

const os = require('os')
const nodemailer = require('nodemailer')

const JWT = require('jsonwebtoken')
const { JWT_SECRET, EMAIL_NAME, PASS, PORT } = require('../configs/config')
const hashString = async(textString) => {
    const salt = await bcrypts.genSalt(15);
    return await bcrypts.hash(textString, salt)
}
const encodedToken = (userID) => {
    return 'Bearer ' + JWT.sign({
        iss: 'Mai Tuong',
        sub: userID
    }, JWT_SECRET, { expiresIn: '6h' })
}
const encodedTokenSignUp = (userID) => {
    return JWT.sign({
        iss: 'Mai Tuong',
        sub: userID
    }, JWT_SECRET, { expiresIn: '1h' })
}

const transporter = nodemailer.createTransport(smtpTransport({
    host: 'smtp.gmail.com',
    service: 'gmail',
    port: 8000,
    secure: false,
    auth: {
        type: "login",
        user: EMAIL_NAME,
        pass: PASS
    }
}))

const logOut = async(req, res, next) => {
    headers = req.headers
    return status(200).json({ message: 'success' })
}

const signIn = async(req, res, next) => {
    const token = encodedToken(req.user._id)
        /*res.setHeader('Devide_code', req.user.devide_code)*/
    res.setHeader('Authorization', token)

    return res.status(200).json({ success: 'true', user: req.user })
}

const activeAccount = async(req, res, next) => {
    try {
        const { tokenUser } = req.params
        if (tokenUser) {
            JWT.verify(tokenUser, JWT_SECRET, async(err, decodeToken) => {
                if (err) {
                    return res.status(400).json({ error: { message: 'Incorect or Expired link' } })
                }
                const user = await User.findById(decodeToken.sub)
                console.log(user)
                if (!user) {
                    res.status(400).json({ error: { message: 'Incorect Link' } })
                } else {
                    user.confirmed = true;
                    user.save();
                }
                return res.status(200).json("Activate Successfull")
            })
        }
    } catch (error) {

    }
}
const signUp = async(req, res, next) => {
    try {
        const { firstname, lastname, phonenumber, address, image, email, password, role } = req.body

        const foundUser = await User.findOne({ email })
        if (foundUser) {
            return next(createError(403, 'Email is already in use'))
        }
        const newUser = new User({ firstname, lastname, phonenumber, address, image, email, role });


        newUser.password = await hashString(password);

        const token = encodedTokenSignUp(newUser._id)
        const url = "http://" + os.hostname() + "/users/authentication/activate/" + token;
        const at = {
            from: '"noreply@yourdomain.com" <noreply@yourdomain.com>',
            to: email,
            subject: 'Activate Account',
            text: "Click button below to active",
            html: '<h2> Activate Account</h2><p>Click <a href="' + url + '">here</a> to active your account</p>'
        };
        transporter.sendMail(at,
            async(err, response) => {
                if (err) {
                    return res.status(500).json({ error: { message: 'Please check email and try again!' } })
                } else {
                    console.log(response)
                    await newUser.save()
                }
            })

        return res.status(201).json({ success: true })
    } catch (error) {
        next(error)
    }
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

const returnUserByToken = async(req, res, next) => {
    try {
        return res.status(200).json({ message: 'success', user: req.user })
    } catch (error) {

    }
}

module.exports = {
    getAllUser,
    getUser,
    newUser,
    replaceUser,
    signIn,
    signUp,
    secret,
    logOut,
    returnUserByToken,
    activeAccount
}