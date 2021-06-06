var express = require('express');
let alert = require('alert');  
var app = express();
var cookieParser = require('cookie-parser');
app.use(cookieParser());
const path = require("path");
var bodyParser = require("body-parser");
var urlencoderParser = bodyParser.urlencoded({extended:true});
const {sent}=require("process");

var MongoClient = require('mongodb').MongoClient;  




app.use(express.static(path.join(__dirname, '/')));

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/"+"components"+"/"+ "index.html");
});
app.get('/index.html', function(req, res) {
    res.sendFile(__dirname + "/"+"components"+"/"+ "index.html");
});

app.get('/tickets.html', function(req, res) {
    res.sendFile(__dirname + "/"+"components"+"/"+"tickets.html");
});

app.get('/ridesAndSlides.html', function(req, res) {
    res.sendFile(__dirname + "/"+"components"+"/" + "ridesAndSlides.html");
});

app.get('/contact.html', function(req, res) {
    res.sendFile(__dirname + "/"+"components"+"/" + "contact.html");
});
app.set('views','./views');
app.set('view engine','ejs');

app.get('/checkout',function(req,res){
    res.render(__dirname + "/"+"components"+"/" + "checkout.ejs",{
        fname : req.query.firstname,
        lname : req.query.lastname,
        contact : req.query.Contact,
        email : req.query.email,
        date : req.query.date,
        child : req.query.child,
        adult : req.query.adult
    });
    var info = {
        fname : req.query.firstname,
        lname : req.query.lastname,
        contact : req.query.Contact,
        email : req.query.email,
        date : req.query.date,
        child : req.query.child,
        adult : req.query.adult
    };
    MongoClient.connect("mongodb://localhost:27017/" , function(err, db) {  
        if (err) throw err;  
        var dbo = db.db("dreamLand");
        dbo.collection("tickets").insertOne(info, function(err, res) {  
            if (err) throw err;  
                console.log("1 record inserted");  
            db.close();  
        });  
    });  
});


var server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});