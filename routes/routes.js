const express = require('express')
const router = express.Router();
const FolksList = require('../model/list');



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

router.post('/post', async(req, res) => {
    try{
        const {FolkID, Lastname, DOB, Location, Age} = req.body; 
        console.log("values", FolkID, Lastname)
        const newFolk = await FolksList.create({FolkID, Lastname, DOB, Location, Age});
        res.status(200).json(newFolk);
    }catch (err){
        console.error("error from", err);
        res.status(501).json({"err": err})
        // res.status(500).json({error: 'Something went wrong in the internal server please try again later'})
    }
});

//Patch/Update a folk by ID

router.patch('/patch/:folkID', async (req, res) => {
    try{
        const { folkID } = req.params;  // Extract the ID of the folk to be updated from the URL params
        const updatedFields = req.body;   // Extract the updated fields from the request body

        // Find the folks by its ID and update it with the new fields

        const updatedFolk = await FolksList.findOneAndUpdate({ FolkID: folkID}, updatedFields, {new: true});

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
    try{
        const {folkID} = req.params;
        const deletedFolk = await FolksList.findOneAndDelete({FolkID: folkID})

        if (!deletedFolk){
            res.status(404).json({error : 'Folk Not Found' });
        }
        res.status(200).json(deletedFolk);
    }catch(err){
        console.error(err)
        res.status(500).json({ error: 'Something went wrong' });
    }
})



module.exports = router; //named export