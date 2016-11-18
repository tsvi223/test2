var express = require('express')
var app = express()
console.log(process.env.NODE_ENV);

app.use(require('./route'))
app.get('/', function (req, res) {
  res.send(process.env.PORT);
})
app.listen(3000)
