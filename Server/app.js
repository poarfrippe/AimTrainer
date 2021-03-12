const express = require('express');
const app = express();

const ip = "localhost"
const port = 12345

app.get('/', (req, res) =>{
    res.sendFile("Client/index.html", {root: "./"})
})

app.get("/script.js", (req, res) => {
    res.sendFile("Client/script.js", {root: "./"})
})

app.get("/style.css", (req, res) => {
    res.sendFile("Client/style.css", {root: "./"})
})

app.listen(port, () => {
    console.log("Server running on: http://" + ip + ":" + port)
})