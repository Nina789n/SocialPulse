const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    platformId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Platform',
      required: [true, 'Platform ID reference is required'],
      index: true
    },
    postTitle: {
      type: String,
      required: [true, 'Post title is required'],
      trim: true
    },
    postDate: {
      type: Date,
      required: [true, 'Post date is required'],
      index: true
    },
    likes: {
      type: Number,
      required: true,
      default: 0,
      min: 0
    },
    comments: {
      type: Number,
      required: true,
      default: 0,
      min: 0
    },
    shares: {
      type: Number,
      required: true,
      default: 0,
      min: 0
    },
    reach: {
      type: Number,
      required: true,
      default: 0,
      min: 0
    },
    engagementRate: {
      type: Number,
      required: true,
      default: 0,
      min: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Post', postSchema);
