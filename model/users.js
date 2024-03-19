const mongoose = require('mongoose');

const { Schema } = mongoose; // Destructure Schema from mongoose

// Define schema
const users = new Schema({
    users: { type: String },
    Password: { type: String },
});

// Create and export model
module.exports = mongoose.model("users", users);