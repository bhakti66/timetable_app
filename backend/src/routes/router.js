const router = require('express').Router();


// Users routes

router.use(require('./user'));
router.use(require('./subject'));
router.use(require('./classes'));
router.use(require('./lectures'));

module.exports = router;