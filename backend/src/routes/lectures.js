const express = require('express');
const router = express.Router();


const lecture = require('../controllers/lectures');


router.get('/api/lectures', lecture.getLectures);

router.post('/api/lecture', lecture.newLecture);

module.exports = router;