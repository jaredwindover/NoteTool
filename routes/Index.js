var MongoClient = require('mongodb').MongoClient;

function route(DbURI) {
  var fret = function(req,res,next) {
      MongoClient.connect(DbURI, function(err,db){
	if (err){
	  console.log("Error connecting to db")
	}
	else{
	  db.collection('Notes').aggregate([
	    {$group:{_id:{},
		     notes:{$addToSet:{name:"$Name",
				       address:"$address"}}}},
	    {$project:{_id:0,notes:1}}
	  ],function(err,result){
	    if (err) {
	      console.log("Could not get notes")
	    }
	    else {
	      if (!result[0]) {result = [{notes:[]}];}
	      res.render('index',result[0]);
	    }
	  });
	}
      });
  };
  return fret;
};

module.exports = route;
