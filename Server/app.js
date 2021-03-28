const express = require('express');
const app = express();

const ip = "185.127.212.195"
const port = 36187

app.get('/', (req, res) =>{
    res.sendFile("Client/index.html", {root: "./"})
})

app.get("/script.js", (req, res) => {
    res.sendFile("Client/script.js", {root: "./"})
})

app.get("/style.css", (req, res) => {
    res.sendFile("Client/style.css", {root: "./"})
})

app.get("/classic", (req, res) => {
    res.sendFile("Client/classicaimt.html", {root: "./"})
    //res.sendFile("Client/testen.html", {root: "./"})
})

app.get("/classic/classicstyle.css", (req, res) => {
    res.sendFile("Client/classicstyle.css", {root: "./"})
})

app.get("/classic/main.js", (req, res) => {
    res.sendFile("dist/main.js", {root: "./"})
})

app.get("/classic/joni.png", (req, res) => {
    res.sendFile("Client/textures/joni.png", {root: "./"})
})

/*
app.get("/classic/theo.png", (req, res) => {
    res.sendFile("Client/textures/theo.png", {root: "./"})
})
*/

app.get("/classic/Tiles084_1K_Normal.jpg", (req, res) => {
    res.sendFile("Client/textures/Tiles084/Tiles084_1K_Normal.jpg", {root: "./"})
})

app.get("/classic/Tiles084_1K_AmbientOcclusion.jpg", (req, res) => {
    res.sendFile("Client/textures/Tiles084/Tiles084_1K_AmbientOcclusion.jpg", {root: "./"})
})

app.get("/classic/Tiles084_1K_Color.jpg", (req, res) => {
    res.sendFile("Client/textures/Tiles084/Tiles084_1K_Color.jpg", {root: "./"})
})

app.get("/classic/Helvetica.json", (req, res) => {
    res.sendFile("Client/fonts/Helvetica.json", {root: "./"})
})

app.listen(port, () => {
    console.log("Server running on: http://" + ip + ":" + port)
})