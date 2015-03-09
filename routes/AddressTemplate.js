// For getting notes out of database
var getNote = require('../lib/dbInterface').getNote;

function route(dbURI) {
  // Route handler is returned
  return function(req, res, next) {
    var template = req.params.template;
    // Address value of note to find
    var address = req.params.address;
    // If no address, serve template empty
    if (typeof(address) == 'undefined') {
      console.log(
	"Attempting to serve %s template", template);
      try{
	res.render(template,{});
      } catch (err) {
	res.status(404).send("Could not send template");
	console.log(
	  "Error serving template %s", template);
      }
    } else { // Otherwise, find note and render
      console.log(
	"Attempting to serve %s with %s template",
	address, template);
      getNote(
	dbURI,
	{address:address},
	function(err,note){
	  if (err) {
	    res.status(404).send(err);
	  } else {
	    console.log(
	      "Rendering note: %s with template: %s",
	      address,template);
	    note.type = 0;
	    try {
	      res.render(template,note);
	    } catch (err) {
	      res.status(404).send("Could not send template");
	      console.log(
		"Error serving template %s",
		template);
	    }
	  }
	}
      );
    }
  };
}

module.exports = route;
