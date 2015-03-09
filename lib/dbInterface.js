var MongoClient = require('mongodb').MongoClient;

function getNote(DbURI, params, f) {
  if (typeof(params.address) !== 'undefined') {
    var address = params.address;
     console.log("Connecting to db...")
    MongoClient.connect(DbURI, function(err,db){
      if (err) {
	console.log("Could not connect to db...");
	f("Db Error");
      }
      else {
	db.collection("Notes").findOne(
	  {address:address},
	  function(err,item){
	    if (err){
	      console.log("Could not find entry: %s",address);
	      f("Lookup error");
	    }
	    else if (!item){
	      console.log("No matching item for %s", address);
	      f("No item found");
	    }
	    else{
	      console.log("Returned note: %s",
			  address)
	      f(null,{Note:item})
	    }	  
	  })
      }
    })
  }
  else {
    f("No params supplied",null);
  }
}

exports.getNote = getNote;
