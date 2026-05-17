const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.json({ message: 'Expense routes working' }));
router.post('/add', (req, res) => res.json({ message: 'Expense added' }));

module.exports = router;
