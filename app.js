

var http = require('http');
var port = process.env.port || 4043;
http.createServer(function(req, res) {
    
    res.write('<p>APP settings URL ' + process.env.mediavaletapp + ' </p>');

    
    res.end('<p>' + process.env.mediavaletapp + '</p>');
    
    }).listen(port); 

    

    

/*
var express = require('express');
var app = express();
app.get('/', function (req, res) {
    res.send("ok");
    res.send(process.env.mediavaletapp);

});
app.listen(3001);
console.log('lisening on 3001');
*/