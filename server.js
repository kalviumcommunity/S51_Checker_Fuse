const express = require("express");
const app = express();
const { startDatabase, stopDatabase, isConnected } = require('./config/DB.js');
const router = require("./routes/routes");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require("cors")


app.use(cors())
require('dotenv').config();

const port = process.env.PORT || 3000;

// Start the database connection

// Middleware
app.use(bodyParser.json());
app.use('/', router);

// Ping route
app.get('/ping', (req, res) => {
    res.send("Hello World");
});

// Root route
app.get('/', (req, res) => {
    const status = isConnected() ? 'connected' : 'Disconnected';
    res.send(`Hello World testing. Database Connection Status: ${status}`);
});

// Default route handler for 404
// app.use((req, res) => {
//     res.status(404).send('404 - Not Found');
// });

startDatabase().then(() => {
    // console.log("Connected to MongoDB");

    // Start the server
    if (require.main === module) {
        app.listen(port, () => {
            console.log(`Server running on port: ${port}`);
        });
    } else {
        console.log('error');
    }
}).catch(err => {
    console.error('Error starting database:', err);
});
