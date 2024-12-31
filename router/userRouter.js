const {user, allUser} = require('../controllers/userController')
const router = require('express').Router();

router.post('/users', user);
router.get('/users', allUser);

module.exports = router;