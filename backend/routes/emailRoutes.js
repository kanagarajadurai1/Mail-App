const express = require('express');
const router = express.Router();
const { sendEmail, getHistory } = require('../controllers/emailController');
const auth = require('../middleware/auth');

router.post('/send', auth, sendEmail);
router.get('/history', auth, getHistory);

module.exports = router;