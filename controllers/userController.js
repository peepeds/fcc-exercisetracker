const {userModel} = require('../models/user');

const user = async (req, res) => {
    const username = req.body.username;
    const checkUser = await userModel.findOne({username});
    if(!username) {
        return res.json({error: 'Username is required'});
    }
    if(checkUser) {
        return res.json({username, _id: checkUser._id});
    }
    const user = await new userModel({username}).save();
    res.json({username, _id: user._id});
};

module.exports = {user};