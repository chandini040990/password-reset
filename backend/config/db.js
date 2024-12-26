//mongodb connection configuration
const mongoose = require('mongoose');

//create function to connect to mongodb
const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully")
    }
    catch (error) {
        console.log("MongoDB connection error")
    }
}

module.exports = connectDB;