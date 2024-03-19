const express = require('express')
const router = express.Router();
const userSchema = require("../Schemas/validateSchema")
const FolksList = require('../model/list');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Import jsonwebtoken

// Define middleware to validate request body
const validate = (schema) => (req, res, next) => {
    const {error} = schema.validate(req.body);
    if(error){
        res.status(400).json({error: error.details[0].message })
    } else{
        next()
    }
}

// POST route to insert peer with validation middleware
router.post('/insert-peer', validate(userSchema), (req, res) => {
    res.json({message: "Peer inserted successfully!"});
});

// GET all folks
router.get('/get', async (req, res) => {
    try {
        const folks = await FolksList.find();
        res.status(200).json(folks);
    } catch (err) {
        console.error(err);
        res.status(500).json({error : 'Something went wrong' })
    }
});

//Posting a new folk
router.post('/post', async (req, res) => {
    try {
        const { name, Location, Age } = req.body;
        console.log("values", name, Location, Age); // Corrected variable name to "name"
        const newFolk = await FolksList.create({ name, Location, Age });
        res.status(200).json(newFolk);
    } catch (err) {
        console.error("error from", err);
        res.status(500).json({ error: 'Something went wrong in the internal server please try again later' }); // Changed status code to 500
    }
});

//Patch/Update a folk by ID
router.patch('/patch/:folkID', async (req, res) => {
    try{
        const { folkID } = req.params;  // Extract the ID of the folk to be updated from the URL params
        const updatedFields = req.body;   // Extract the updated fields from the request body
        
        // Find the folks by its ID and update it with the new fields
        
        const updatedFolk = await FolksList.findOneAndUpdate({ ID: folkID}, updatedFields, {new: true});
        
        if(!updatedFolk) {
            return res.status(404).json({error: 'Folk Not Found in the server'});
        }
        
        res.status(200).json(updatedFolk);
    } catch(err){
        console.error(err);
        res.status(500).json({error: 'Something went wrong'})
    }
});

//Delete a folk by ID
router.delete('/delete/:folkID', async (req, res) => {
    try {
        const { folkID } = req.params;
        const deletedFolk = await FolksList.findOneAndDelete({ ID: folkID });
        
        if (!deletedFolk) {
            return res.status(404).json({ error: 'Folk Not Found' });
        }
        
        res.status(200).json(deletedFolk);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// Dummy user data for demonstration
const users = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: '$2b$10$3TniR460v2msrt8NwWOpSu2BCROMvUd2MGtU3iI1/Hfv3EvBzlUoe' }
];

// Login endpoint
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password)
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(401).send('Invalid username fuck or password');
    }
    try {
        console.log(user.password)
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid fjjfj username or password' });
        }

        // Generate JWT
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' }); // Use your secret key
        // Set JWT in cookie
        res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 }); // 1 hour expiration
        res.send({
            "jwt": token
        });
    } catch (error) {   
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
