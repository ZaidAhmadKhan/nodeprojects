

var http = require('http');
var port = process.env.port || 4043;
http.createServer(function(req, res) {
    
    res.write('<p>APP settings URL ' + process.env.mediavaletapp + ' </p>');

    
    res.end('<p>' + process.env.mediavaletapp + '</p>');
    
    }).listen(port); 

    