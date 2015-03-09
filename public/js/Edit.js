$(document).ready(function() {
  form = $("#form1");
  form.submit(function() {
    var title = $("#title").val();
    var content = $("#content").val();
    $.post(form.attr("action"),
	   {
	     title:title,
	     content:content
	   },
	   function(){
	     window.location.href='/Notes/'+title.replace(/ /g,'');
	   });
    return false;
  }) 
})
