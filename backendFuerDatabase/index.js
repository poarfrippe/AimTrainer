const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const ip = "localhost"
const port = 18781
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
con.query("SELECT COUNT(*) AS usernameCount FROM benutzer", function (err, rows, fields){
    if(err) throw err;
    i = rows[0].usernameCount        
});


app.post("/classic", (req, res) => {
    //des no of DB
    console.log("hallo, bin im post iatz von classic")
    console.log("score wos in die datenbank zu seppln muas: " + req.body.score)
    let score = req.body.score
    let klicks = req.body.klicks 
    let anschlaegeProSekunde = klicks /30
    let accuracy = score/klicks * 100
    let username = "Azir Bot" //req.body.username
    let spielid = 1
 
    let sql = "INSERT INTO spielmodi (`anschlaege`, `anschlaegeProSekunde`, `trefferquote`, `spielid`, `zeit`, `username`) VALUES ('"+klicks+"', '"+anschlaegeProSekunde+"', '"+accuracy+"', '"+spielid+"', '00:00:10', '"+username+"' )";
    con.query(sql, function (err, result){
        if (err) throw err;
        console.log("1 record inserted")
    })
 
    res.send("hoi, hon gekreag, jo!!!")
 })

app.post("/flick", (req, res) => {
    //des no of DB
    console.log("hallo, bin im post iatz von flick")
    console.log("score wos in die datenbank zu seppln muas: " + req.body.score)
    let score = req.body.score
    let klicks = req.body.clicks
    let anschlaegeProSekunde = klicks /30
    let accuracy = score/klicks * 100
    let username = req.body.username
    let spielid = 2
 
    let sql = "INSERT INTO flick (`anschlaege`, `anschlaegeProSekunde`, `trefferquote`, `spielid`, `zeit`, `username`) VALUES ('"+klicks+"', '"+anschlaegeProSekunde+"', '"+accuracy+"', '"+spielid+"', '00:00:30', '"+username+"' )";
    con.query(sql, function (err, result){
        if (err) throw err;
        console.log("1 record inserted")
    })
 
    res.send("hoi, hon gekreag, jo!!!")
 })

app.post("/register", (req, res) => {

    console.log("jemand versucht sich zu registriern!!")

    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
  
    if (!username || !password || !email) return res.sendStatus(400);
  
    checkUsername(username, (username) => {
      if (!username) return res.redirect(302, "http://localhost:36187/");
      let sql = "INSERT INTO benutzer (`email`, `username`, `passwort`) VALUES ('" + email + "', '" + username + "', '" + password + "')";
      con.query(sql, function (err, result) {
        if (err) throw err;
        //return res.redirect(302, "http://localhost:36187/");
        console.log("jemand hat sich registriert")
        return res.status(200)
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

app.listen(port, () => {
    console.log("Server running on: http://" + ip + ":" + port)
})