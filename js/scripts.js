$(document).ready(function(){

  var contactForm = $('#homepage-contact-form');

  $('#reach-out').click(function(){
    $(contactForm).fadeToggle();
    var active = true;
  });

  $('#reach-out-dismiss').click(function(){
    $(contactForm).fadeToggle();
    var active = false;
  });

});