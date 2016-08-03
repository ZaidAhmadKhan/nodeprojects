

var http = require('http');
var port = process.env.port || 4043;
http.createServer(function(req, res) {
    try{
        if(process.env.mediavaletapp!=undefined){
            res.write(process.env.mediavaletapp);
        }else{
            res.write('value not found');
        }
    } catch (e) {
        res.write('Some Error  ' + e );
    }
   
    
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