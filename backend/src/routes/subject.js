const express = require('express');
const router = express.Router();


const subject = require('../controllers/subject');


router.get('/api/subjects', subject.getSubjects);

router.post('/api/subjects', subject.newSubject);

module.exports = router;