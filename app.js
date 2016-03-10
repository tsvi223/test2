/*/var express = require("express");
var host = process.env.LISTEN_IP || "0.0.0.0";
var port = process.env.LISTEN_PORT || 6060;

var app = express();
//var y = 0;
if(process.env.DEBUG) global.debug = console.log;

app.get('/',function(req, res){
  
res.send('kkk');  
})


var k = 1;
console.log('work');


app.listen(port, host, function(){
    console.log('Starting PWeb Server on Port   ' + port );
});
*/
var http = require("http");
var express = require("express");
var app = express();
app.get('/',function(req, res){
  
res.send('kkk');  
})
/*
// create a server
http.createServer(function(req, res) {
    // on every request, we'll output 'Hello world'
    res.end("Hello world from Cloud9!");
}).listen(process.env.PORT, process.env.IP);*/