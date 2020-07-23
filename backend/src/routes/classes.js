const express = require('express');
const router = express.Router();


const classes = require('../controllers/classes');


router.get('/api/classes', classes.getClasses);

router.post('/api/classes', classes.newClass);

module.exports = router;