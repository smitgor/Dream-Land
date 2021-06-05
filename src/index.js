var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
app.use(cookieParser());
const path = require("path");
var bodyParser = require("body-parser");
var urlencoderParser = bodyParser.urlencoded({extended:true});
const {sent}=require("process");
app.use(express.static(path.join(__dirname, '/')));

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

app.get('/checkout',function(req,res){
    fname = req.query.firstname;
    lname = req.query.lastname;
    contact = req.query.Contact;
    email = req.query.email;
    date = req.query.date;
    child = req.query.child;
    adult = req.query.adult;
    console.log(fname);
    console.log(lname);
    console.log(contact);
    console.log(email);
    console.log(date);
    console.log(child);
    console.log(adult);
    res.sendFile(__dirname + "/"+"components"+"/" + "checkout.html");
});
var server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});