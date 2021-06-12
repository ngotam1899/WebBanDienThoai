const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AdSchema = new Schema({
  name: {
    type: String,
  },
  content: {
    type: String,
  },
  image: {
    type: Schema.Types.ObjectId,
    ref: 'Image'
  },
  link: {
    type: String,
  },
  active: {
    type: Boolean,
    default: false
  },
  startedAt: {
    type: Date,
  },
  endedAt: {
    type: Date,
  }
})

const Ad = mongoose.model('Ad', AdSchema)

module.exports = Ad