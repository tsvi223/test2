var express = require("express");
//var host = process.env.LISTEN_IP || "0.0.0.0";
var port =  process.env.PORT;// || '0.0.0.0';//process.env.PORT //|| 8080
var host = process.env.IP; //|| "0.0.0.0"
  //var port = process.env.OPENSHIFT_PORT || 8080
  //var host = process.env.OPENSHIFT_IP || '127.0.0.1'

var app = express();

var swig = require('swig');


if(process.env.DEBUG) global.debug = console.log;




app.set('trust proxy', true);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', swig.renderFile);
var path = require('path');
var bodyParser      = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/pub/",express.static(path.join(__dirname, 'public'),{ maxAge: 86400000 }));
app.use(express.static(path.join(__dirname, 'public'),{ maxAge: 86400000 }));


require('./route_api_articles.js')(app);
app.listen(port, host, function(){
    console.log('Starting Web Server on Port   ' + port );
});

/*
// create a server
http.createServer(function(req, res) {
    // on every request, we'll output 'Hello world'
    res.end("Hello world from Cloud9!");
}).listen(process.env.PORT, process.env.IP);

*/