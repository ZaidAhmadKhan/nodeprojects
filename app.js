var http = require('http');
var port = process.env.port || 1337;

http.createServer(function (req, res) {

    res.write('<p>Hello from ' + process.env.mediavaletbaseurl + ' </p>');
    res.write('<ul>');
    res.write('<li><label>Service Bus Namespace:</label>' + process.env.mediavaletbaseurl + ' </li>');
    res.write('<li><label>Storage Connection String:</label>' + process.env.mediavaletbaseurl + ' </li>');
    res.write('</ul>');

    res.write('<p>Happy Clouding!</p>');

    res.end('<p>' + process.env.mediavaletbaseurl + '</p>');

}).listen(port);