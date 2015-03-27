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
				       address:"$address",
				       tags:"$tags"}}}},
	    {$project:{_id:0,notes:1}}
	  ],
	  function(err,notes){
	    if (err) {
	      console.log("Could not get notes")
	    }
	    else {
	      // If nothing returned
	      if (!notes[0]) {
		// Construct empty result
		notes = {notes:[],tags:[]};
		res.render('index',notes)
	      }
	      else {
		//Otherwise try to get list of tags
		notes=notes[0];
		db.collection('Notes').aggregate(
		  [
		    {$unwind:"$tags"},
		    {$group:{_id:{},
			     tags:{$addToSet:"$tags"}
		    }},
		    {$project:{_id:0,tags:1}}
		  ],
		  function(err,tags){
		    if (err)
		      console.log("Could not get tags");
		    else{
		      notes.tags=tags[0].tags;
		      console.log(tags);
		      res.render('index',notes);
		    }
		  }
		);
	      }
	    }
	  }
	);
      }
    });
  };
}

module.exports = route;
