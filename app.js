var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
app.get('/', function(req, res){
	res.write('<p>Hello from ' + process.env.CloudProvider +' </p>');
res.write('<ul>');
res.write('<li><label>Service Bus Namespace:</label>'+ process.env.ServiceBusConnectionString +' </li>');
res.write('<li><label>Storage Connection String:</label>'+ process.env.StorageConnectionString +' </li></ul></p>')
 res.sendFile(__dirname + '/index.html');
});
io.on('connection', function(socket){
 socket.on('chat message', function(msg){
 io.emit('chat message', msg);
 });
});
http.listen(port, function(){
 console.log('listening on ' + port);
});