const mongoose = require('mongoose');

const platformSchema = new mongoose.Schema(
  {
    platformName: {
      type: String,
      required: [true, 'Platform name is required'],
      enum: ['Instagram', 'Facebook', 'YouTube', 'X'],
      unique: true,
      trim: true
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
      trim: true
    },
    followers: {
      type: Number,
      required: true,
      default: 0,
      min: 0
    },
    connectedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Platform', platformSchema);
