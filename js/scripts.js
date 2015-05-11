$(document).ready(function(){
  // FUNCTIONS
  /* convert a range to another range */
  function convertRange(oldValue, oldMin, oldMax, newMin, newMax){
    var value = (((oldValue - oldMin) * (newMax - newMin)) / (oldMax - oldMin)) + newMin;
    return value;
  }

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
  	$('.site-nav').fadeToggle(200);
    $('.ham-line').toggleClass('active');
  });

  if ( $('div.homepage').length ){
    $('.ham-box').addClass('ham-home');
    $('.page-content').addClass('homepage-content');
  }

  // PARALLAX HEROES
  if ( $('.herollax').length ){
    $(window).scroll(function(){
      var fromTop = $(this).scrollTop();
      var headerHeight = $('.herollax').height();

      if ( fromTop < headerHeight ){
        // fade out the header text
        var textFade = convertRange(fromTop, 0, headerHeight, 1, 0);
        $('.headerwrap').css('opacity', textFade);

        // parallax the header text
        var textParallax = convertRange(fromTop, 0, headerHeight, -25, 75);
        $('.headerwrap').css('transform', 'translate3d(0px, ' + textParallax + '%, 0px)');

        // parallax the background image
        var bgParallax = convertRange(fromTop, 0, headerHeight, 0, 75);
        $('.herollax').css('background-position', '50% ' + bgParallax + 'px')
      }
    });
  }
});
