const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

router.post('/', videoController.createVideo);
router.get('/', videoController.getVideos);

module.exports = router;