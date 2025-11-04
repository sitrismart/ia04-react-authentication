const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/user', authenticateToken, (req, res) => {
  // req.user set by middleware
  res.json({ user: req.user });
});

module.exports = router;
