const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    userId : {
        type: String,
        required: true,
    },
    username : {
        type: String,
        required: true,
    },
    description : {
        type: String,
        required: true,
    },
    duration : {
        type: Number,
        required: true,
    },
    date : {
        type: Date,
        required: true,
        default: Date.now,
    }
});

const exerciseModel = mongoose.model('Exercise', exerciseSchema);

module.exports = {
    exerciseModel,
    exerciseSchema
}
