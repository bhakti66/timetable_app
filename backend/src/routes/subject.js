const express = require('express');
const router = express.Router();


const subject = require('../controllers/subject');


router.get('/api/subject', subject.getSubjects);

router.post('/api/subject', subject.newSubject);

module.exports = router;