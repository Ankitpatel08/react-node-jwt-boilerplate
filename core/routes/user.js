const express = require('express');
const auth = require('../middleware/auth');
const { userDetails } = require('../controllers/user.controller');

const router = express.Router();

router.post('/details', auth, userDetails);

module.exports = router;