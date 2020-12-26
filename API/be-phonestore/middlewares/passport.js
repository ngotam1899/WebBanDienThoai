const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const LocalStrategy = require('passport-local').Strategy
const GoogleTokenStrategy = require('passport-google-token').Strategy
const FacebookTokenStrategy = require('passport-facebook-token')
const { JWT_SECRET, GoogleID, GoogleSecret, FacebookID, FacebookSecret } = require('../configs/config')

const User = require('../models/User')
const Image_User = require('../models/Image_User')

//Vertify token with jwt
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
    secretOrKey: JWT_SECRET
}, async(payload, done) => {
    try {
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

//If passed, return confirm user
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

//passport Facebook
passport.use(new FacebookTokenStrategy({
    clientID: FacebookID,
    clientSecret: FacebookSecret
}, async(accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({
            auth_facebook_id: profile.id,
            auth_type: 'facebook'
        });
        if (user) {
            done(null, user);
        } else if (profile.emails[0].value != "") {
            let user = await User.findOne({ email: profile.emails[0].value });
            if (user) {
                user.auth_facebook_id = profile.id;
                user.auth_type = 'facebook';
                await user.save()
                done(null, user);
            }
        } else {
            const image = new Image_User({
                name: profile.displayName,
                public_url: profile.photos[0].value
            })

            await image.save();
            const newUser = new User({
                firstname: profile.name.middleName + " " + profile.name.givenName,
                lastname: profile.name.familyName,
                image: image._id,
                email: profile.emails[0].value,
                auth_facebook_id: profile.id,
                auth_type: 'facebook',
                confirmed: true,
                role: '1'
            });
            await newUser.save();
            done(null, newUser);
        }
    } catch (error) {
        done(error, false)
    }
}))

//passport Google
passport.use(new GoogleTokenStrategy({
        clientID: GoogleID,
        clientSecret: GoogleSecret
    },
    async(accessToken, refreshToken, profile, done) => {
        try {
            const user = await User.findOne({
                auth_google_id: profile.id,
                auth_type: 'google'
            });
            if (user) {
                done(null, user);
            } else {
                const user = await User.findOne({ email: profile.emails[0].value });
                if (user) {
                    user.auth_google_id = profile.id;
                    user.auth_type = 'google'
                    await user.save();
                    done(null, user);
                } else {
                    const image = new Image_User({
                        name: profile.displayName,
                        public_url: profile._json.picture
                    })

                    await image.save();

                    const newUser = new User({
                        firstname: profile.name.givenName,
                        lastname: profile.name.familyName,
                        image: image._id,
                        email: profile.emails[0].value,
                        auth_google_id: profile.id,
                        auth_type: 'google',
                        confirmed: true,
                        role: '1'
                    });
                    await newUser.save();
                    done(null, newUser);
                }
            }
        } catch (error) {
            done(error, false)
        }
    }
));