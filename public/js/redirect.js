window.onload=function() {
  $("#form1").onsubmit=function() {
    var title = $("#title").value
    var content = $("content").value
    window.location.replace('/');
    return false;
  } 
}
