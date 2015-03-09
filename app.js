var express    = require('express');     // For routing
var jade       = require('jade');	 // For templates
var bodyParser = require('body-parser'); // For getting post params


// Routes 
var StaticServe     = require('./routes/StaticServe');
var Index           = require('./routes/Index');
var AddressTemplate = require('./routes/AddressTemplate');
var UpdateNote      = require('./routes/UpdateNote');
var DeleteNote      = require('./routes/DeleteNote');
var MakeNote        = require('./routes/MakeNote');

// Address of database
var dbURI = "mongodb://localhost:27017/NoteTool"
// Folder where public files are
var publicDir = __dirname + '/public/';

var app = express();

// Set up template engine
app.set('views', publicDir)
   .set('view engine', 'jade');

// Set up post parameters
app.use(bodyParser.json())
   .use(bodyParser.urlencoded({extended:true}));

// Routes for GET requests
app.get('/:type(css|js)/:name',
	StaticServe(publicDir))
   .get('/',
	Index(dbURI))
   .get('/:template(Notes|NewNote|Edit)/:address?',
	AddressTemplate(dbURI));

// Routes for POST requests
app.post('/MakeNote',
	 MakeNote(dbURI))
   .post('/UpdateNote/:address',
	 UpdateNote(dbURI));

// Routes for DELETE requests
app.delete('/Delete/:address',
	   DeleteNote(dbURI));

// Start server
var server = app.listen(8080, function() {
  var host = server.address().address;
  var port = server.address().port  
  console.log("App running at https://%s:%s",host,port);
});
