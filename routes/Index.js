// For connecting to database
var MongoClient = require('mongodb').MongoClient;

function route(dbURI) {
  // Route handler is returned
  return function(req,res,next) {
    MongoClient.connect(dbURI, function(err,db){
      if (err){
	console.log("Error connecting to db")
      }
      else{
	db.collection('Notes').aggregate(
	  [
	    {$group:{_id:{},
		     notes:{$addToSet:{name:"$Name",
				       address:"$address"}}}},
	    {$project:{_id:0,notes:1}}
	  ],
	  function(err,result){
	    if (err) {
	      console.log("Could not get notes")
	    }
	    else {
	      // If nothing returned
	      if (!result[0]) {
		// Construct empty result
		result = [{notes:[]}];
	      }
	      res.render('index',result[0]);
	    }
	  }
	);
      }
    });
  };
}

module.exports = route;
