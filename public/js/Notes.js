$(document).ready(function(){
  MathJax.Hub.Queue(
    function(){
      $("#container").css("visibility","visible")
      $("#placeholder").css("visibility","hidden").css("position","absolute");
    }
  );
});
