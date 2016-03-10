

var express = require("express");




var host = process.env.LISTEN_IP || "0.0.0.0";
var port = process.env.LISTEN_PORT || 6060;

var app = express();
var y = 0;
if(process.env.DEBUG) global.debug = console.log;

app.get('/',function(req, res){
  
res.send('kkk');  
})


var k = 1;
console.log('work');
/*
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(8080, 'APP_PRIVATE_IP_ADDRESS');
console.log('Server running at http://APP_PRIVATE_IP_ADDRESS:8080/');
*/
app.listen(port, host, function(){
    console.log('Starting PWeb Server on Port ' + port );
});