$(document).ready(function(){
  $('.tag').click(function(){
    var data = '[data-tags*="'+$(this).html()+'"]' 
    $('.note' + data).parent().slideDown();
    $('.note').not(data).parent().slideUp();
  });
});
