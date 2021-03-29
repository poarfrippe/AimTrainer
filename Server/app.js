const express = require('express');
const app = express();

const ip = "localhost"
const port = 36187

//home
app.get('/', (req, res) =>{
    res.sendFile("Client/home/index.html", {root: "./"})
})
app.get("/script.js", (req, res) => {
    res.sendFile("Client/home/script.js", {root: "./"})
})
app.get("/homestyle.css", (req, res) => {
    res.sendFile("Client/home/homestyle.css", {root: "./"})
})
app.get("/background.jpg", (req, res) => {
    res.sendFile("Client/images/background.jpg", {root: "./"})
})
app.get("/login.jpg", (req, res) => {
    res.sendFile("Client/images/login.jpg", {root: "./"})
})


//login
app.get("/login", (req, res) => {
    res.sendFile("Client/loginRegister/login.html", {root: "./"})
})
app.get("/login/loginregister.css", (req, res) => {
    res.sendFile("Client/loginRegister/loginregister.css", {root: "./"})
})

//registere
app.get("/register", (req, res) => {
    res.sendFile("Client/loginRegister/Register.html", {root: "./"})
})
app.get("/register/loginregister.css", (req, res) => {
    res.sendFile("Client/loginRegister/loginregister.css", {root: "./"})
})


//classic
app.get("/classic", (req, res) => {
    res.sendFile("Client/classic/classicaimt.html", {root: "./"})
})
app.get("/classic/classicstyle.css", (req, res) => {
    res.sendFile("Client/classic/classicstyle.css", {root: "./"})
})
app.get("/classic/main.js", (req, res) => {
    res.sendFile("dist/main.js", {root: "./"})
})
app.get("/classic/joni.png", (req, res) => {
    res.sendFile("Client/textures/joni.png", {root: "./"})
})
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
app.post("/classic", (req, res) => {
    //schau sparber do schick i dir iatz nor epes!!!!
    console.log("hallo, bin im post iatz")
    console.log(req.body)
    res.send("hoi, hon gekreag, jo!!!")
    //geat ober net...
})


app.listen(port, () => {
    console.log("Server running on: http://" + ip + ":" + port)
})