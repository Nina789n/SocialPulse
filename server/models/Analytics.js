const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema(
  {
    platformId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Platform',
      required: [true, 'Platform ID reference is required'],
      index: true
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
      index: true
    },
    followers: {
      type: Number,
      required: true,
      default: 0,
      min: 0
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
    impressions: {
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

// Compound index to ensure uniqueness per platform per day and fast querying
analyticsSchema.index({ platformId: 1, date: 1 });

module.exports = mongoose.model('Analytics', analyticsSchema);
