// For serving static files from a directory
// Has logging

function route(directory) {
  // Route handler is returned
  return function(req, res, next){
    // Type of file to send (css,js)
    var type = req.params.type;
    var name = req.params.name;
    var options = {root: './public'};
    console.log(
      "Attempting to serve %s file: %s",
      type, name);
    res.sendFile(req.url,options,function(err){
      if (err) {
	if (err.code == 'ECONNABORT' &&
	    res.statusCode == 304) {
	      console.log(
		"304 cache hit for %s file: %s",
		type,name);
	} else {
	  console.log(
	    "Error sending %s file: %s",
	    type, name);
	  res.status(404).send();
	}
      } else {
	console.log(
	  "%s file: %s sent successfully",
	  type, name);
      }
    });
  };
};

module.exports = route;
