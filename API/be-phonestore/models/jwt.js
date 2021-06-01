const mongoose = require('mongoose')
const Schema = mongoose.Schema

const JWTSSchema = new Schema({
  token: {
    type: String
  },
})

const JWTS = mongoose.model('JWTS', JWTSSchema)

module.exports = JWTS