const express = require('express');
const router = express.Router();

const {
  getRawAnalytics,
  getOverview,
  getPlatformsAnalytics,
  getEngagementAnalytics,
  getAudienceGrowth
} = require('../controllers/analyticsController');

// Module-specific analytical endpoints
router.get('/', getRawAnalytics);
router.get('/overview', getOverview);
router.get('/platforms', getPlatformsAnalytics);
router.get('/engagement', getEngagementAnalytics);
router.get('/audience', getAudienceGrowth);

module.exports = router;
