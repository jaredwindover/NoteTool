var express = require('express');
var jade = require('jade');
var fs = require('fs');
var bodyParser = require('body-parser');

var StaticServe = require('./routes/StaticServe');
var Index = require('./routes/Index');
var Template = require('./routes/Template');
var AddressTemplate = require('./routes/AddressTemplate');
var UpdateNote = require('./routes/UpdateNote');
var DeleteNote = require('./routes/DeleteNote');
var MakeNote = require('./routes/MakeNote');

var DbURI = "mongodb://localhost:27017/NoteTool"

var app = express()
.set('views', __dirname + '/public/')
.set('view engine', 'jade')
.use(bodyParser.json())
.use(bodyParser.urlencoded({extended:true}))
.get('/:type(css|js)/:name', StaticServe(__dirname + '/public/'))
.get('/',Index(DbURI))
.get('/:template(Notes|NewNote|Edit)/:address?', AddressTemplate(DbURI))
.post('/MakeNote', MakeNote(DbURI))
.post('/UpdateNote/:address', UpdateNote(DbURI))
.delete('/Delete/:address',DeleteNote(DbURI))

var server = app.listen(8080, function() {
  var host = server.address().address;
  var port = server.address().port  
  console.log("App running at https://%s:%s",host,port);
});
