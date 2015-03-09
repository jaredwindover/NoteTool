$(document).ready(function() {
  //Override submit action to redirect after
  $("#form1").submit(function() {
    var title = $("#title").val();
    var content = $("#content").val();
    // Use form's action as url
    $.post($(this).attr("action"),
	   {
	     title:title,
	     content:content
	   },
	   function(){
	     window.location.href='/Notes/'+title.replace(/ /g,'');
	   });
    return false;
  });
  //On content change, update mathjax
  $("#content")
      .bind('input propertychange',function(){
	$("#Preview").html($(this).val());
	MathJax.Hub.Queue(["Typeset",MathJax.Hub,"Preview"]);
      });

  //Set up preview on load
  $("#Preview").html($("#content").val());
  MathJax.Hub.Queue(["Typeset",MathJax.Hub,"Preview"]);
});
