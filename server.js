const express = require("express");
const app = express();
const { startDatabase, stopDatabase, isConnected } = require('./db')
require('dotenv').config()


app.get('/ping', (req, res) => {
    res.send("Hello World")
})

app.get('', (req, res) => {
    res.send('Hello World testing' `${isConnected() ? 'connected' : 'Disconnected'}`)
})

app.use((req, res) => {
    res.status(404).send('404 - Not Found');
})

app.listen(port,() => {
    console.log(`Example app listening on port ${port} `)
})