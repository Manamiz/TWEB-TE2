/*
var gzippo = require('gzippo');
  var express = require('express');
  var app = express();
 
  app.use(express.logger('dev'));
  app.use(gzippo.staticGzip("" + __dirname + "/dist"));
  app.listen(process.env.PORT || 3000); 
*/


var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(__dirname + '/app'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/app/index.html'));
});

app.listen(process.env.PORT || 3000);
