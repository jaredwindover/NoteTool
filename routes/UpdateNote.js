// For connecting to db
var MongoClient = require('mongodb').MongoClient;

function route(DbURI) {
  // Route handler is returned
  return function(req,res,next) {
    // Address value of note to update
    var address = req.params.address;
    var title = req.body.title;
    var content = req.body.content;
    var tags = req.body.tags;
    if (!tags) {tags = []}
    console.log("Connecting to db...");
    MongoClient.connect(DbURI, function(err,db){
      if (err) {
	console.log("Could not connect to db");
	res.status(404).send("Db error");
      } else {
	console.log(
	  "Updating note: %s",
	  address);
	db.collection("Notes").update(
	  { // Note to find
	    address:address
	  },
	  { // Note to replace it with
	    Name:title,
	    Content:content,
	    address:title.replace(/ /g,''),
	    tags:tags
	  },
	  function(err,result) {
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
}

module.exports = route;
