const Post = require('../models/Post');
const Platform = require('../models/Platform');

// @desc    Get all posts with optional platform and query filters
// @route   GET /api/posts
// @access  Public
const getPosts = async (req, res, next) => {
  try {
    const { platform, search, sort = '-postDate', limit = 20, page = 1 } = req.query;

    const query = {};

    // Filter by platform name or ID
    if (platform && platform !== 'All' && platform !== 'all') {
      let targetPlatform;
      if (platform.match(/^[0-9a-fA-F]{24}$/)) {
        targetPlatform = await Platform.findById(platform);
      } else {
        targetPlatform = await Platform.findOne({
          platformName: { $regex: new RegExp(`^${platform}$`, 'i') }
        });
      }

      if (targetPlatform) {
        query.platformId = targetPlatform._id;
      }
    }

    // Search by title
    if (search) {
      query.postTitle = { $regex: search, $options: 'i' };
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 20;
    const skip = (pageNum - 1) * limitNum;

    const totalPosts = await Post.countDocuments(query);
    const posts = await Post.find(query)
      .populate('platformId', 'platformName username')
      .sort(sort)
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      count: posts.length,
      total: totalPosts,
      page: pageNum,
      totalPages: Math.ceil(totalPosts / limitNum),
      data: posts
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPosts
};
