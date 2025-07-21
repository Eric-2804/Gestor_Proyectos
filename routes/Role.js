const express = require('express');
const router = express.Router();
const { createRole, getRoles, deactivateRole } = require('../controllers/roles');

router.post('/create', createRole);
router.get('/', getRoles);
router.patch('/deactivate/:id', deactivateRole);

module.exports = router;
