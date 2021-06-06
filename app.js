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
var url="mongodb+srv://dbsmit:<password>@cluster0.ff23x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";



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
    MongoClient.connect(url , function(err, db) {  
        if (err) throw err;  
        var dbo = db.db("dreamLand");
        dbo.collection("tickets").insertOne(info, function(err, res) {  
            if (err) throw err;  
                console.log("1 record inserted in teckites collection");  
            db.close();  
        });  
    });  
});

app.get('/feedback',function(req,res){
    res.sendFile(__dirname + "/"+"components"+"/" + "contact.html");
    var info = {
        fname : req.query.firstname,
        lname : req.query.lastname,
        country : req.query.Country,
        subject : req.query.subject
    };
    MongoClient.connect(url , function(err, db) {  
        if (err) throw err;  
        var dbo = db.db("dreamLand");
        dbo.collection("feedback").insertOne(info, function(err, res) {  
            if (err) throw err;  
                console.log("1 record inserted in feedback collection");  
            db.close();  
        });  
    });
});

app.get("/owner", (req, res) => {
    var html=`<!DOCTYPE html>
    <html>
    
    <head>
        <title></title>
        <link rel="stylesheet" href="../style/owner.css">
        
    </head>
    
    <body>
        <div class="navigation">
            <ul>
                <li><a href="./index.html">Home</a></li>
                <li><a href="./tickets.html">Tickets</a></li>
                <li><a href="./ridesAndSlides.html">Rides & Slides</a></li>
                <li><a href="./contact.html">Contact Us</a></li>
                <li id=login><a href="">log in</a></li>
            </ul>
        </div>
        <div class="box">
            <div class="heading">
                <h1 style="text-align: center;">Dream Land Theme Park</h1>
            </div>
            <div class="ticket-data">
                <table>
                    <tr>
                        <th colspan="8"><h1>Boocked Tickets</h1></th>
                    </tr>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Contact No.</th>
                        <th>Email</th>
                        <th>Date</th>
                        <th>No. of Child</th>
                        <th>No. of Adult</th>
                        <th>Total</th>
                    </tr>

    `;
    MongoClient.connect("mongodb://localhost:27017/" , function(err, db) {  
        if (err) throw err;  
        var dbo = db.db("dreamLand");
        dbo.collection("tickets").find().toArray(function(err,result){
            if(err) throw err;
            result.forEach(data=>{
                html+=` <tr>
                        <td> ${data.fname} </td>
                        <td> ${data.lname} </td>
                        <td> ${data.contact} </td>
                        <td> ${data.email} </td>
                        <td> ${data.date} </td>
                        <td> ${data.child} </td>
                        <td> ${data.adult} </td>
                        <td> ${data.child*600+data.adult*1000} </td>
                    `
            });
            html += `</table>
                    </div>`;
            html += `<div class="feedback-data">
                    <table>
                        <tr>
                            <th colspan="4"><h1>Feedbacks</h1></th>
                        </tr>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Country</th>
                            <th>Feedback</th>
                        </tr>
                    `;
            dbo.collection("feedback").find().toArray(function(err,result){
                if(err) throw err;
                result.forEach(data=>{
                    html+=` <tr>
                            <td> ${data.fname} </td>
                            <td> ${data.lname} </td>
                            <td> ${data.country} </td>
                            <td> ${data.subject} </td>`
                });
            html += `</table>
                    </div>
                    </div>
                    </body>
                    </html>
            `;
            res.send(html);
            });
        });
    });
});
var server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});