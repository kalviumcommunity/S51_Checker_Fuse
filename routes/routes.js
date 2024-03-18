const express = require('express')
const router = express.Router();
const userSchema = require("../Schemas/validateSchema")
const FolksList = require('../model/list');

const validate = (schema) => (req, res, next) => {
    const {error} = schema.validate(req.body);
    if(error){
        res.status(400).json({error: error.details[0].message })
    } else{
        next()
    }

    router.post('/insert-peer', validate(userSchema), (req, res) => {
        res.json({message: "Peer inserted successfully!"});
    })
}

const validation = (formData) => (req, res, next) => {
    const {error} = formData.validation(req.body);
    if(error){
        res.status(400).json({ error: error.details[0].message })
    } else {
        next()
    }

    router.post('/validation', validation(formData), (req, res) => {
        res.json({ message: 'Form data is valid!' });
    })
}

// GET all folks

router.get('/get', async (req, res) => {
    try {
        const folks = await FolksList.find();
        res.status(200).json(folks);
    }
    catch (err) {
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
    }catch(err){
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


module.exports = router; //named export