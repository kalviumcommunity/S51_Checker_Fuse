const express = require("express");
const app = express();
const port = 3000;

app.get('/ping', (req, res) => {
    res.send("Hello World")
})

app.get('', (req, res) => {
    res.send('Hello World testing')
})

app.use((req, res) => {
    res.status(404).send('404 - Not Found');
})

app.listen(port,() => {
    console.log(`Example app listening on port ${port}`)
})