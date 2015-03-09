var MongoClient = require('mongodb').MongoClient;

function route(DbURI) {
  var fret = function(req,res,next) {
    var address = req.params.address;
    console.log("Deleting: %s",address);
    MongoClient.connect(DbURI,function(err,db){
      if (err) {
	console.log("Could not connect to db...")
	res.status(404).send("Db error");
      }
      else {
	db.collection("Notes").remove(
	  {address:address},
	  function(err,result){
	    if (err) {
	      console.dir(err);
	      res.end();
	    }
	    else {
	      console.log(result);
	      res.send();
	    }
	  });
      }
    });
  };
  return fret;
};

module.exports = route;
