/*
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
app.get('/', function(req, res){
 res.sendFile(__dirname + '/index.html');
});
io.on('connection', function(socket){
 socket.on('chat message', function(msg){
 io.emit('chat message', );
 });
});
http.listen(port, function(){
 console.log('listening on ' + port);
});
*/


//process.env.mediavaletbaseurl

var http = require('http');
var port = process.env.port || 4043;

http.createServer(function(req, res) {

res.write('<p>Hello from ' + process.env.mediavaletbaseurl +' </p>');
res.write('<ul>');
res.write('<li><label>Service Bus Namespace:</label>'+ process.env.mediavaletbaseurl +' </li>');
res.write('<li><label>Storage Connection String:</label>'+ process.env.mediavaletbaseurl +' </li>');
res.write('</ul>');

res.write('<p>Happy Clouding!</p>');

res.end('<p>'+ process.env.mediavaletbaseurl +'</p>');

}).listen(port);