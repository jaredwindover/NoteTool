$(document).ready(function(){
  // Override delete action to allow for confirmation
  $("#delete").click(function(event){
    event.preventDefault();
    if (window.confirm("Are you sure you want to delete this note?")) {
      $.ajax(
	{
	  url: $("#delete").attr("href"),
	  type: 'DELETE',
	  success: function(result) {
	    window.location.href='/';
	  }
	});
    }
    else {
      return false;
    }
  });
});
