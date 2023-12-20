const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const ArtistSchema = new Schema({
  artist_name: {
    type: String
  },
  contact: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = artistregistration = mongoose.model('artistregistrations', ArtistSchema)