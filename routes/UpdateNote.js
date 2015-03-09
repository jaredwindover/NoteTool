var MongoClient = require('mongodb').MongoClient;

function route(DbURI) {
  var fret = function(req,res,next) {
    var address = req.params.address;
    var title = req.body.title;
    var content = req.body.content;
    console.log("Connecting to Db");
    MongoClient.connect(DbURI, function(err,db){
      if (err) {
	console.log("Could not connect to db...")
	res.status(404).send("Db error");
      }
      else {
	console.log("Updating note: %s", address)
	db.collection("Notes").update(
	  {address:address},
	  {Name:title,
	   Content:content,
	   address:title.replace(/ /g,'')},
	  function(err,result) {
	    if (err) {
	      console.dir(err);
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
