const {exerciseModel} = require('../models/exercise');
const {userModel} = require('../models/user');

const exercise = async (req, res) => {
    const { description, duration, date} = req.body;
    const userId = req.params._id;

    const checkDuration = parseInt(duration); 
    if(!checkDuration){
        return res.status(400).json({error: 'Duration must be a number'});
    }

    if(userId.length !== 24 ){
        return res.status(400).json({error: 'Invalid userId'});
    }

    const checkUser = await userModel.findById(userId);
    if(!checkUser){
        return res.status(404).json({error: 'User not found'});
    }
    
    const username = checkUser.username;

    let newDate;
    (!date) ? newDate = new Date().toDateString() : newDate = new Date(date).toDateString();

    const newExercise = await new exerciseModel({
        userId,
        username,
        description,
        duration,
        date : newDate
    }).save();

    res.json({
        _id: userId,
        username,
        date: newDate,
        duration: parseInt(duration),
        description
    });
};

const exerciseLog = async (req, res) => {
    const userId = req.params._id;
    let {from, to, limit} = req.query;

    if(!from) from = new Date(0);
    if(!to) to = new Date();

    const checkUser = await userModel.find({_id: userId});
    console.log({checkUser});

    if(checkUser.length === 0){
        return res.send(404).json({error: 'User not found'});
    };

    const _id = checkUser[0]._id;
    const username = checkUser[0].username;

    const checExercise = await exerciseModel.find({
        userId,
        date: {
            $gte: new Date(from),
            $lte: new Date(to)
        }
    }).limit(parseInt(limit));

    const count = checExercise.length;

    const log = checExercise.map((item) => {
        return {
            description: item.description,
            duration: item.duration,
            date: item.date.toDateString()
        }
    });
   
    return res.json({
        _id,
        username,
        count,
        log
    })
};

module.exports = {exercise, exerciseLog};