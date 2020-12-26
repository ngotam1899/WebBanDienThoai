const User = require('../models/User')
const bcrypts = require('bcryptjs')
var smtpTransport = require('nodemailer-smtp-transport');

const Validator = require('../validators/validator')
const service = require('../services/service')
const os = require('os')
const nodemailer = require('nodemailer')

const JWT = require('jsonwebtoken')
const { JWT_SECRET, EMAIL_NAME, PASS } = require('../configs/config');
const { use } = require('passport');
const hashString = async(textString) => {
    const salt = await bcrypts.genSalt(15);
    return await bcrypts.hash(textString, salt)
}
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: 'gmail',
    port: 465,
    secure: false,
    ignoreTLS: false,
    auth: {
        type: 'login',
        user: EMAIL_NAME,
        pass: PASS
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    }
})

const authGoogle = async(req, res, next) => {
    const user = req.user;
    const token = 'Bearer ' + service.encodedToken(req.user._id, '6h');
    user.token = token;
    user.save();
    await user.populate('image').execPopulate();

    res.setHeader('authorization', token)
    return res.status(200).json({ success: true, code: 200, message: '', user: user });
}

const authFacebook = async(req, res, next) => {
    try {
        const user = req.user;
        const token = 'Bearer ' + service.encodedToken(user._id, '6h');
        res.setHeader('authorization', token)
        user.token = token;
        await user.save();
        await user.populate('image').execPopulate();
        return res.status(200).json({ success: true, code: 200, message: '', user: user });
    } catch (error) {
        next(error)
    }

}
const logOut = async(req, res, next) => {
    headers = req.headers
    headers.authorization = headers.authorization.replace('Bear ', '');
    JWT.verify(headers.authorization.trim(), JWT_SECRET, async(err, decodeToken) => {
        const user = await User.findById(decodeToken.sub);
        user.token = '';
        await user.save();
    })
    return res.status(200).json({ success: true, message: 'logout success', code: 200 })
}

const signIn = async(req, res, next) => {
    if (req.user.confirmed == false) {
        sendEmail(req.user._id);
        return res.status(200).json({ success: false, code: 403, message: 'An email activate have send to' + req.user.email });
    }

    const token = 'Bearer ' + service.encodedToken(req.user._id, '6h')

    const user = req.user;
    user.token = token;
    await user.save()
        /*res.setHeader('Devide_code', req.user.devide_code)*/
    res.setHeader('Authorization', token)

    return res.status(200).json({ success: true, code: 200, message: '', user: req.user })
}
const changePassword = async(req, res, next) => {
    try {
        const { password, new_password } = req.body;
        if (!password) return res.status(200).json({ success: false, code: 400, message: 'Pls insert old pwd' });
        if (!new_password) return res.status(200).json({ success: false, code: 400, message: 'Pls insert new pwd' });
        if (password == new_password) res.status(200).json({ success: false, code: 400, message: 'New pwd is incorrectly' });

        const user = await User.findById(req.user._id);
        const result = await user.isSignin(password);
        if (!result) return res.status(200).json({ success: false, code: 400, message: 'Old pwd is incorrect' });
        else {
            user.password = await hashString(new_password);
            await user.save();

            return res.status(200).json({ success: true, code: 200, message: 'Password change' });
        }
    } catch (error) {
        next(error)
    }
}
const activeAccount = async(req, res, next) => {
    try {
        const { tokenUser } = req.params
        if (tokenUser) {
            JWT.verify(tokenUser, JWT_SECRET, async(err, decodeToken) => {
                if (err) {
                    return res.status(200).json({ success: false, code: 400, message: 'Incorect or Expired link' });
                }
                const email = decodeToken.sub;
                const user = await User.findOne({ email });
                if (!user) {
                    return res.status(200).json({ success: false, code: 400, message: 'Incorect Link' });
                }
                user.confirmed = true;
                await user.save();
                return res.status(200).json({ success: true, code: 200, message: 'Activate Successfull' })
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
            return res.status(200).json({ success: false, code: 403, message: 'Email is already to use' })
        }
        const newUser = new User({ firstname, lastname, phonenumber, address, image, email, role });


        newUser.password = await hashString(password);

        sendEmail(email);
        await newUser.save();
        return res.status(200).json({ success: true, code: 200, message: '' })
    } catch (error) {
        next(error)
    }
}

const secret = async(req, res, next) => {
    return res.status(200).json({ success: true, code: 200, message: '', resources: true })
}
const sendEmail = (email) => {
    const token = service.encodedToken(email, '1h');
    const url = "http://localhost:5000/#/account/active/" + token;
    const at = {
        from: '"noreply@be-phonestore.herokuapp.com" <noreply@be-phonestore.herokuapp.com/>',
        to: email,
        subject: 'Activate Account',
        text: "Click button below to active",
        html: '<h2> Activate Account</h2><p>Click <a href="' + url + '">here</a> to active your account</p>'
    };
    transporter.sendMail(at, async(err, response) => {});

}

const getAllUser = async(req, res, next) => {
    try {
        const users = await User.find()

        return res.status(200).json({ success: true, code: 200, message: '', users: users })
    } catch (error) {
        return next(error)
    }
}

const getUser = async(req, res, next) => {
    try {
        const { userID } = req.params

        const user = await User.findById(userID)

        return res.status(200).json({ success: true, code: 200, message: '', user: user })
    } catch (error) {
        return next(error)
    }

}

const newUser = async(req, res) => {
    const newUser = new User(req.body)
    await newUser.save()
    return res.status(200).json({ success: true, code: 201, message: '', user: newUser })
}

const replaceUser = async(req, res, next) => {
    try {
        const { userID } = req.params
        const newUser = req.body

        const user = await User.findById(userID)

        if (!user) {
            return res.status(200).json({ success: false, code: 404, message: 'Can not found user need to update' })
        }

        newUser.email = user.email;
        newUser.password = user.password;

        await user.update(newUser)

        return res.status(200).json({ success: true, code: 200, message: '' })
    } catch (error) {

    }

}

const returnUserByToken = async(req, res, next) => {
    try {
        return res.status(200).json({ success: true, code: 200, message: 'success', user: req.user })
    } catch (error) {

    }
}
const deleteUser = async(req, res, next) => {
    const { userID } = req.params
    const isValid = await Validator.isValidObjId(userID);
    if (!isValid) { return res.status(200).json({ success: false, code: 400, message: 'id user is not correctly' }) } else {
        const result = await User.findByIdAndDelete(userID);
        if (result) return res.status(200).json({ success: true, code: 200, message: '' })
    }
}

const findUserByPhone = async(req, res, next) => {
    const phone = req.query.phone;
    const user = await User.findOne({ phonenumber: phone });
    return res.status(200).json({ success: true, code: 200, message: '', user: user })
}
module.exports = {
    authGoogle,
    authFacebook,
    getAllUser,
    getUser,
    newUser,
    replaceUser,
    signIn,
    signUp,
    secret,
    logOut,
    returnUserByToken,
    activeAccount,
    deleteUser,
    changePassword,
    findUserByPhone
}