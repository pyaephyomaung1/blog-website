const express = require('express');
const router = express.Router();
const monkController = require('../controllers/monkController');

router.post('/', monkController.createMonk);
router.get('/', monkController.getMonks);

module.exports = router;