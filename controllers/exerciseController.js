const {exerciseModel} = require('../models/exercise');
const {userModel} = require('../models/user');

const exercise = async (req, res) => {
    const { description, duration, date} = req.body;
    const userId = req.params._id;

    const checkUser = await userModel.findById(userId);
    if(!checkUser){
        return res.json({error: 'User not found'});
    }

    const username = checkUser.username;

    let newDate;
    if(!date){
        newDate = new Date().toDateString();
        console.log({newDate});
    } else {
        newDate = new Date(date).toDateString();
    }

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
        duration,
        description
    });
};

const exerciseLog = async (req, res) => {
    const userId = req.params._id;
    let {from, to, limit} = req.query;
    if(!from) from = new Date(0);
    
    if(!to) to = new Date();

    const checkUser = await exerciseModel.find({
        userId  : userId,
        date: {
            $gte: new Date(from),
            $lte: new Date(to)
        }
    }).limit(parseInt(limit));

    const count = checkUser.length;

    const log = checkUser.map((item) => {
        return {
            description: item.description,
            duration: item.duration,
            date: item.date.toDateString()
        }
    });
   
    return res.json({
        "_id": userId,
        "username": checkUser[0].username,
        count,
        log
    })
};


module.exports = {exercise, exerciseLog};