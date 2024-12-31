const {exercise, exerciseLog} = require('../controllers/exerciseController');
const router = require('express').Router();


router.post('/users/:_id/exercises/', exercise);
router.get('/users/:_id/logs/', exerciseLog);

module.exports = router;