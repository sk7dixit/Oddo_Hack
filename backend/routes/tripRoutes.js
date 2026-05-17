const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.json({ message: 'Trip routes working' }));
router.post('/create', (req, res) => res.json({ message: 'Trip created (mock)' }));

module.exports = router;
