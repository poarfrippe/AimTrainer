const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const ip = "localhost"
const port = 36187
i = 0;

//databse connection
var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "aimtrainer"
})
if(con){
    console.log('Connection Success');
} else {
    console.log('Cant connect to db, Check ur db connection');
}

//sparber des honi lei auskommentiert weil sünst wenn man die datenbank net hot direkt dor server obstürzt un man net probieren konn... wosche woll
/*
con.query("SELECT COUNT(*) AS usernameCount FROM benutzer", function (err, rows, fields){
    if(err) throw err;
    i = rows[0].usernameCount        
});
*/

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
app.post("/login", (req, res) => {
    //sparber schau, des geat oanfoch so und des iatz oanfoch of die datenbank... Blessed!!
    var username = req.body.username
    var password = req.body.pswdli

    con.query("SELECT `username`, `passwort` FROM benutzer", function (err, result, fields) {
        if(err) throw err;
        while(i<10){
            if(typeof(result[i]) == 'undefined'){
                break;
            }
            if(result[i].username !== username && result[i].password !== password){
                console.log("hot nit gehittet")
                ++i;
            } else {
                console.log("Anmeldung erfolgreich")
                return;                
            }
        }    
    })    
    console.log(req.body.username)
    console.log(req.body.pswdli)
    res.redirect(302, "http://localhost:36187/")
})

//registere
app.get("/register", (req, res) => {
    res.sendFile("Client/loginRegister/Register.html", {root: "./"})
})
app.get("/register/loginregister.css", (req, res) => {
    res.sendFile("Client/loginRegister/loginregister.css", {root: "./"})
})
/* app.post("/register", (req, res) =>{
    let username = req.body.username
    let password = req.body.pswdli
    let email = req.body.email

    con.query("SELECT `username`, `email` FROM benutzer", function (err, result, fields) {
        if(err) throw err;
        while(i>=0){
            console.log(i)
            if(typeof(result[i]) == 'undefined'){
                break;
            }
            if(result[i].username !== username && result[i].email !== email){
                console.log(result[i].username)
                console.log("hot nit gehittet")
                --i; 
            } else {
                console.log("Nomegalul")
                return;
                           
            }
        }    
        
        let sql = "INSERT INTO benutzer (`email`, `username`, `passwort`) VALUES ('"+email+"', '"+username+"', '"+password+"')";
        con.query(sql, function (err, result){
            if (err) throw err;
            console.log("1 record inserted");
        })    
    });

    console.log(req.body.username)
    console.log(req.body.pswdli)
    console.log(req.body.email)
    res.redirect(302, "http://localhost:36187/")
})

*/
app.post("/register", (req, res) => {
  let username = req.body.username;
  let password = req.body.pswdli;
  let email = req.body.email;

  if (!username || !password || !email) return res.sendStatus(400);

  checkUsername(username, (username) => {
    if (!username) return res.redirect(302, "http://localhost:36187/");
    let sql = "INSERT INTO benutzer (`email`, `username`, `passwort`) VALUES ('" + email + "', '" + username + "', '" + password + "')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      return res.redirect(302, "http://localhost:36187/");
    });
  });
});

const checkUsername = (username, createUser) => {
  con.query("SELECT `username` FROM benutzer WHERE `username` = ?", [username], function (err, result, fields) {
    if (err) throw err;
    if (result?.length > 0) return createUser(undefined);
    createUser(username);
  });
};


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
app.get("/classic/Arial_Regular.json", (req, res) => {
    res.sendFile("Client/fonts/Arial_Regular.json", {root: "./"})
})
app.post("/classic", (req, res) => {
    //des no of DB
    console.log("hallo, bin im post iatz")
    console.log("score wos in die datenbank zu seppln muas: " + req.body.score)
    let score = req.body.score
    let anschlaegeProSekunde = score /10
    let username = "Azir Bot" //req.body.username
    let spielid = 1

    let sql = "INSERT INTO spielmodi (`anschlaege`, `anschlaegeProSekunde`, `trefferquote`, `spielid`, `zeit`, `username`) VALUES ('"+score+"', '"+anschlaegeProSekunde+"', '100', '"+spielid+"', '00:00:10', '"+username+"' )";
    con.query(sql, function (err, result){
        if (err) throw err;
        console.log("1 record inserted")
    })

    res.send("hoi, hon gekreag, jo!!!")
})


app.listen(port, () => {
    console.log("Server running on: http://" + ip + ":" + port)
})