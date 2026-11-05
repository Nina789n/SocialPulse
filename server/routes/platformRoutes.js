const express = require('express');
const router = express.Router();

const {
  getPlatforms,
  getPlatformById
} = require('../controllers/platformController');

router.get('/', getPlatforms);
router.get('/:id', getPlatformById);

module.exports = router;
