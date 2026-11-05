const Platform = require('../models/Platform');

// @desc    Get all connected platforms
// @route   GET /api/platforms
// @access  Public
const getPlatforms = async (req, res, next) => {
  try {
    const platforms = await Platform.find({}).sort({ platformName: 1 });
    res.status(200).json({
      success: true,
      count: platforms.length,
      data: platforms
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single platform by ID or Name
// @route   GET /api/platforms/:id
// @access  Public
const getPlatformById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let platform;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      platform = await Platform.findById(id);
    } else {
      platform = await Platform.findOne({
        platformName: { $regex: new RegExp(`^${id}$`, 'i') }
      });
    }

    if (!platform) {
      res.status(404);
      throw new Error(`Platform '${id}' not found`);
    }

    res.status(200).json({
      success: true,
      data: platform
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPlatforms,
  getPlatformById
};
