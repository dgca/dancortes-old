$(document).ready(function(){
  // CONTACT FORM
  var contactForm = $('#homepage-contact-form');

  $('#reach-out').click(function(){
    $(contactForm).fadeToggle();
    $('body').toggleClass('scroll-lock');
  });

  $('#reach-out-dismiss').click(function(){
    $(contactForm).fadeToggle();
    $('body').toggleClass('scroll-lock');
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