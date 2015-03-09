function route(directory) {
  var fret = function(req, res, next){
    type = req.params.type;
    name = req.params.name;
    console.log("Attempting to serve %s file: %s",
		type, name);
    var options = {root: './public'};
    res.sendFile(req.url,options,function(err){
      if (err) {
	if (err.code == 'ECONNABORT' && res.statusCode == 304) {
	  console.log("304 cache hit for %s file: %s",
	  type,name);
	}
	else {
	  console.log("Error sending %s file: %s",
		      type, name);
	  res.status(404).send();
	}
      }
      else {
	console.log("%s file: %s sent successfully",
		    type, name);
      }
    });
  };
  return fret;
};

module.exports = route;
