const mongoose = require("mongoose");
require('dotenv').config();

const startDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
};

const stopDatabase = async () => {
    try {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (err) {
        console.error('Error disconnecting from MongoDB:', err.message);
    }
};

const isConnected = () => {
    return mongoose.connection.readyState === 1;
};

module.exports = { startDatabase, stopDatabase, isConnected };
