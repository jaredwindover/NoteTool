//For connecting to database
var MongoClient = require('mongodb').MongoClient;

function route(dbURI) {
  //Route handler is returned
  return function(req,res,next) {
    var address = req.params.address;
    console.log("Deleting: %s",address);
    MongoClient.connect(dbURI,function(err,db){
      if (err) {
	console.log("Could not connect to db...")
	res.status(404).send("Db error");
      } else {
	db.collection("Notes").remove(
	  {address:address},
	  function(err,result){
	    if (err) {
	      console.dir(err);
	      res.end();
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
