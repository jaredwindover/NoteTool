function route() {
  var fret = function(req,res,next){
    var template = req.params.template;
    try { 
      res.render(template,{});
    }
    catch (err) {
      console.log(err);
      res.status(404).send("File not found");
    }
  }
  return fret;
};

module.exports = route;
