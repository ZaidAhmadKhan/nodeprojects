var http = require('http');
var port = process.env.port || 4043;
http.createServer(function(req, res) {
    
    res.write('<p>Hello from ' + process.env.mediavaletapp + ' </p>');
    res.write('<ul>');
    res.write('<li><label>Azure App Setting Name </label>' + process.env.mediavaletapp + ' </li>');
    
    res.write('</ul>');
    
    res.write('<p>Happy Clouding!</p>');
    
    res.end('<p>' + process.env.mediavaletapp + '</p>');
    
    }).listen(port); 