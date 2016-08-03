
/*
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
app.get('/', function (req, res) {
    if (process.env.mediavaletapp != undefined) {
        res.write(process.env.mediavaletapp);
        res.wrtie(process.env.mediavaletapp);
    } else {
        res.write("Null ");
        res.wrtie("Null");
    }
    
});
/*io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
        io.emit('chat message', msg);
    });
});*/
/*http.listen(port, function () {
    console.log('listening on ' + port);
});

*/
var express = require('express');
var app = express();
app.get('/', function (req, res) {
    if (process.env.mediavaletapp != undefined) {
        res.send(process.env.mediavaletapp);
        res.send(process.env.mediavaletapp);
    } else {
        res.send('Value is null');
    }
});
app.listen(8081, function () {
    console.log('Example app listening on port 3000!');
});