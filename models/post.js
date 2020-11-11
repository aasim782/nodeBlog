const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  date_posted: {
    type: Date,
    required: true,
    default: Date()
  },
  published: {
    type: Boolean,
    default: false
  },
  meta_desc: String,
  slug: {
    type: String,
    required: true,
    unique: true
  }
})


const Post = mongoose.model('Post', postSchema)

module.exports = Post;