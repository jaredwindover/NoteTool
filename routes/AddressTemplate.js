var MongoClient = require('mongodb').MongoClient;
var getNote = require('../dbInterface').getNote;

function route(DbURI) {
  var fret = function(req,res,next) {
    var template = req.params.template;
    var address = req.params.address;
    if (typeof(address) == 'undefined') {
      console.log("Attempting to serve %s template",
		  template);
      try{
	res.render(template,{});
      }
      catch (err) {
	res.status(404).send("Could not send template");
	console.log("Error serving template %s",
		    template);
      }
    }
    else {
      console.log("Attempting to serve %s with %s template",
		  address,template);
      getNote(DbURI,{address:address},function(err,note){
	if (err) {
	  res.status(404).send(err);
	}
	else {
	  console.log("Rendering note: %s with template: %s",
		      address,template);
	  note.type = 0;
	  try{
	    res.render(template,note);
	  }
	  catch (err) {
	    res.status(404).send("Could not send template");
	    console.log("Error serving template %s",
			template);
	  }
	}
      });
    }
  };
  return fret;
};

module.exports = route;
