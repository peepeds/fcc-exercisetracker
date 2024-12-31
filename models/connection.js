const mongoose = require('mongoose');

const connectDB = async () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: 'exercise-tracker',
    }).then(() => {
        console.log('Database connection successful');
    })
}

module.exports = connectDB;