var MongoClient = require('mongodb').MongoClient;

function route(DbURI) {
  var fret = function(req,res,next) {
    var template = req.params.template;
    var address = req.params.address;
    console.log("Attempting to serve %s with %s template",
		address,template);
    console.log("Connecting to db...")
    MongoClient.connect(DbURI, function(err,db){
      if (err) {
	console.log("Could not connect to db...");
	res.status(404).send("Db error");
      }
      else {
	db.collection("Notes").findOne(
	  {address:address},
	  function(err,item){
	    if (err){
	      console.log("Could not find entry: %s",address);
	      res.status(404).send("Lookup error");
	    }
	    else if (!item){
	      console.log("No matching item for %s", address);
	      res.status(404).send("No item found");
	    }
	    else{
	      console.log("Returned note: %s in template: %s",
			  address,template)
	      res.render(template,{Note:item})
	    }	  
	  })
      }
    })
  };
  return fret;
};

module.exports = route;
