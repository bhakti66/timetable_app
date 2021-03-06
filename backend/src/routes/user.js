const express = require('express');
const router = express.Router();


const user = require('../controllers/user.js');



router.get('/api/users/:id', user.getUserById);

router.get('/api/users', user.getUsers);

router.get('/api/professors', user.getProfessors);

router.post('/api/users/register', user.newUser);

router.delete('/users/:id', user.deleteUser);

router.put('/api/users', user.updateUser);

router.post('/api/users/login', user.validateUser);


module.exports = router;