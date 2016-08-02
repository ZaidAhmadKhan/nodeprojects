var express = require('express');
var app = express();

app.get('/GetBaseUrl', function (req, res) {
    try{
        if (process.env.mediavaletbaseurl != undefined) {
            res.end(process.env.mediavaletbaseurl)
        } else {
            res.end('Sorry base url not found')
        }
    } catch (e) {
        res.end(e)
    }
});

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})