const {user} = require('../controllers/userController')
const router = require('express').Router();

router.post('/users', user);

module.exports = router;