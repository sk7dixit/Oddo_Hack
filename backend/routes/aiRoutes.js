const express = require('express');
const router = express.Router();

router.post('/generate-trip', (req, res) => res.json({ message: 'AI generation working' }));
router.post('/optimize-budget', (req, res) => res.json({ message: 'AI budget optimization working' }));

module.exports = router;
