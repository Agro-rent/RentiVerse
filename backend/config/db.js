const mongoose = require('mongoose');
const User = require("../models/user");

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database connected');

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDB;
