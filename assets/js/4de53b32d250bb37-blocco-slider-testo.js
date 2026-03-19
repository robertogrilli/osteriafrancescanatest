jQuery(document).ready(function ($) {

  setTimeout(function(){
    $('.carousel-slider-testo').flickity({
      // options
      // cellAlign: 'left',
      // contain: true
    });
  }, 1000);

  // se ha solo una foto nasconde i dots
  $('.carousel-slider-testo').each(function() {
    var $carousel = $(this);
    var hasMultipleCells = $carousel.find('.flickity-page-dots li').length;
    // console.log(hasMultipleCells);
    
    // Inizializza Flickity se ci sono più celle
    if (hasMultipleCells <= 1) {
      $carousel.find('.flickity-page-dots li').hide();
    }
  });

});



    /*BEGIN AFTER DOM LOAD*/
    document.addEventListener('DOMContentLoaded', function() {

      lightbox.option({
          'resizeDuration': 300,
          'wrapAround': true,
          'disableScrolling': true,
          'fadeDuration':300,
          'imageFadeDuration':300,
          'positionFromTop':100,
          'resizeDuration':300,
          'showImageNumberLabel':false,
          'alwaysShowNavOnTouchDevices':true,
          'wrapAround':false
        });
    
    /*END BEGIN AFTER DOM LOAD*/ 
    });









//END