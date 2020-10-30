const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const LocalStrategy = require('passport-local').Strategy
const { JWT_SECRET } = require('../configs/config')

const User = require('../models/User')

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
    secretOrKey: JWT_SECRET
}, async(payload, done) => {
    try {
        console.log('payload ', payload)
        const user = await User.findById(payload.sub)

        if (!user) {
            console.log("Can't found user")
            return done(null, false)
        }

        done(null, user)

    } catch (error) {
        done(error, false)
    }
}))

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async(email, password, done) => {
    try {
        const user = await User.findOne({ email })

        if (!user) return done(null, false)

        const isCorrectPassword = await user.isSignin(password)

        if (!isCorrectPassword) return done(null, false)

        done(null, user)
    } catch (error) {
        done(error, false)
    }

}))