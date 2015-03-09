var MongoClient = require('mongodb').MongoClient; // For connecting to mongo

function getNote(dbURI, params, callback) {
  if (typeof(params.address) !== 'undefined') {
    var address = params.address;
    console.log("Connecting to db...");
    MongoClient.connect(dbURI, function(err,db){
      if (err) {
	console.log("Could not connect to db");
	callback("Db Error");
      } else {
	console.log("Connected to db")
	console.log("Looking for note: %s", address);
	db.collection("Notes").findOne(
	  {address:address},
	  function(err,item){
	    if (err){
	      console.log("Could not find entry: %s", address);
	      callback("Lookup error");
	    } else if (!item){
	      console.log("No matching item for %s", address);
	      callback("No item found");
	    } else {
	      console.log("Returned note: %s",address);
	      callback(null,{Note:item});
	    }	  
	  }
	);
      }
    });
  } else {
    callback("No params supplied",null);
  }
}

exports.getNote = getNote;
