const JWT = require('jsonwebtoken')
const { JWT_SECRET, EMAIL_NAME, PASS, PORT } = require('../configs/config')


const encodedToken = (userID, times) => {
    return JWT.sign({
        iss: 'Mai Tuong',
        sub: userID
    }, JWT_SECRET, { expiresIn: times })
}

module.exports = {
    encodedToken
}