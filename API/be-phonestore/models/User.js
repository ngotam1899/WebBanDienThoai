const bcrypts = require('bcryptjs')

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    phonenumber: {
        type: Number
    },
    address: {
        type: String
    },
    image: {
        type: Schema.Types.ObjectId,
        ref: "Image_User"
    },
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: {
        type: String
    },
    auth_google_id: {
        type: String
    },
    auth_facebook_id: {
        type: String
    },
    auth_type: {
        type: String,
        enum: ['local', 'google', 'facebook'],
        default: 'local'
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    role: {
        type: String
    },
    token: {
        type: String
    }
}, {
    timestamps: true
})

UserSchema.pre('findByIdAndUpdate', async function(next) {
    try {
        const salt = await bcrypts.genSalt(15)
        const passwordHash = await bcrypts.hash(this.password, salt)
        this.password = passwordHash

        next()
    } catch (error) {
        next(error)
    }
})

UserSchema.methods.isSignin = async function(newPassword) {
    try {
        return await bcrypts.compare(newPassword, this.password)
    } catch (error) {
        throw new Error(error)
    }
}
const User = mongoose.model('User', UserSchema)

module.exports = User