var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
app.use(cookieParser());
const path = require("path");
var bodyParser = require("body-parser");
var urlencoderParser = bodyParser.urlencoded({extended:true});
const {sent}=require("process");
app.use('/style',express.static('style'))
app.get('/', function(req, res) {
    res.sendFile(__dirname + "/" + "index.html");
});

app.get('/tickets.html', function(req, res) {
    res.sendFile(__dirname + "/" + "tickets.html");
});

app.get('/parkInfo.html', function(req, res) {
    res.sendFile(__dirname + "/" + "parkInfo.html");
});

app.get('/ridesAndSlides.html', function(req, res) {
    res.sendFile(__dirname + "/" + "ridesAndSlides.html");
});

app.get('/contact.html', function(req, res) {
    res.sendFile(__dirname + "/" + "contact.html");
});
var server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});