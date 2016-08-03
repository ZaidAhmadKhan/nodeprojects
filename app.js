var http = require("http");

http.createServer(function (request, response) {
    // Send the response body as "Hello World"
    response.end(process.env.mediavaletbaseurl);
}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');