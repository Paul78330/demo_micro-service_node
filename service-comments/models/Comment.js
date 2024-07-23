const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  postId: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'Post',
    type: String,
    required: true,
  },
  userId: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'User',
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Comment', CommentSchema);