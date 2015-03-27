// For connecting to database
var MongoClient = require('mongodb').MongoClient;

function route(dbURI) {
  // Route handler is returned
  return function(req,res,next) {
    var title = req.body.title;
    var content = req.body.content;
    var tags = req.body.tags;
    if (!tags) {tags = []}
    console.log(
      "Connecting to Db...");
    MongoClient.connect(dbURI, function(err,db){
      if (err) {
	console.log(
	  "Could not connect to db");
	res.status(404).send("Db error");
      } else {
	console.log(
	  "Attempting to create note: %s", title);
	db.collection("Notes").insert(
	  {
	    Name:title,
	    Content:content,
	    address:title.replace(/ /g,''),
	    tags:tags
	  },
	  function(err, result){
	    if (err) {
	      console.dir(err);
	    } else {
	      console.log(result);
	      res.send();
	    }
	  }
	);
      }
    });
  };
};

module.exports = route;
