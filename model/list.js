const mongoose = require('mongoose');

const { Schema } = mongoose; // Destructure Schema from mongoose

// Define schema
const listOfFolksSchema = new Schema({
    FolkID: { type: String },
    Lastname: { type: String },
    DOB: { type: String },
    Location: { type: String },
    Age: { type: Number },
});

// Create and export model
module.exports = mongoose.model("FolksList", listOfFolksSchema);
