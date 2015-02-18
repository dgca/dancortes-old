$(document).ready(function(){
  // CONTACT FORM
  var contactForm = $('#homepage-contact-form');

  $('#reach-out').click(function(){
    $(contactForm).fadeToggle();
    var active = true;
  });

  $('#reach-out-dismiss').click(function(){
    $(contactForm).fadeToggle();
    var active = false;
  });
  
  // HAMMY MENU
  $('.hammy').click(function(){
  	$('.site-header').fadeToggle(200);
    $('.ham-line').toggleClass('active');
  });

  if ( $('div.homepage').length ) {
    $('.ham-box').addClass('ham-home');
    $('.page-content').addClass('homepage-content');
  }

});