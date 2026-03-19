document.addEventListener("DOMContentLoaded", function () {
  jQuery(document).ready(function ($) {


/* -------------------------------------------------------------------------------- */
/* ! MENU */
/* -------------------------------------------------------------------------------- */


/* ////-------------- Menu overlay - apertura e chiusura cliccando fuori */

$(document).click(function(event) {
  var menuOverlay = $('.menu-principale-overlay');
  
  // Verifica se l'elemento cliccato non è un elemento del menu o del menu overlay
  if (menuOverlay.length && !menuOverlay.is(event.target) && menuOverlay.has(event.target).length === 0) {
    // Rimuove la classe "menu-open" dal body
    $('body').removeClass('menu-open');
  }
});

// Gestisci il click sul pulsante del menu
$(".btn-menu").on("click", function (event) {
  event.stopPropagation(); // Impedisci la propagazione del click al documento
  $("body").toggleClass("menu-open");
});



// $(".btn-menu").on("click", function () {
//   if (!$("body").hasClass("menu-open-prenotazione pulsante-menu-open")) {
//     $("body").toggleClass("menu-open");
// }
// });

$(".pulsante-prenotazione").on("click", function (e) {
    /* # Toggle classe e logo */
    e.preventDefault();
    $("body").addClass("menu-open-prenotazione pulsante-menu-open");
    // $(".btn-menu").toggleClass("pulsante-prenotazione-1");
});

$(".pulsante-prenotazione-1").on("click", function (e) {
  /* # Toggle classe e logo */
  $("body").removeClass("menu-open-prenotazione pulsante-menu-open");
});




/* -------------------------------------------------------------------------------- */
/* ! Animazione sub menu */
/* -------------------------------------------------------------------------------- */
/* icona per sub menu */
$('.overlay-menu-widget .menu-item-has-children > a').append('<i class="freccia-submenu fa fa-angle-down" aria-hidden="true"></i>');
// $('.lingua-menu-widget .menu-item-has-children > a').append('<i class="freccia-submenu fa fa-angle-down" aria-hidden="true"></i>');

$(".overlay-menu-widget .sub-menu li").hide();


$(".overlay-menu-widget .menu-item-has-children > a").on("click", function(e) {
  e.preventDefault();
  
  // Riferimento all'elemento corrente su cui hai cliccato
  var $currentMenuItem = $(this).parent();

  // Trova il sottomenù dell'elemento corrente e esegui l'azione desiderata
  $currentMenuItem.find(".sub-menu > li").slideToggle();
});


/**************** icona sub menu click */





/* icona sub menu */
$('#menu-menu-principale .menu-item-has-children').prepend('<div class="icona-sub-menu"><span>></span></div>');

$('#menu-menu-principale .menu-item-has-children > a').on('click', function(e){
  e.preventDefault();
  
  // Riferimento all'elemento corrente su cui hai cliccato
  var $currentMenuItem = $(this).parent();

  // Trova l'elemento .icona-sub-menu nell'elemento corrente e applica la classe 'ruotata'
  $currentMenuItem.find('.icona-sub-menu').toggleClass('ruotata');
});



/********************************* ! MENU classe aggiuntiva pulsante */
$('.overlay-pulsante-book > a').addClass('wp-block-button__link wp-element-button');


/******************************** menu lingue wrap */
//wrap
$('#menu-menu-info .wpml-ls-item, #menu-menu-info-ita .wpml-ls-item').wrapAll('<div class="menu-overlay-lingue-wrap"></div>');
//separatore
$('#menu-menu-info .wpml-ls-item:nth-child(1), #menu-menu-info-ita .wpml-ls-item:nth-child(1)').after('<div class="menu-info-separatore-lingue"> | </div>');



/* -------------------------------------------------------------------------------- */
/* ! VIDEO LIGHTBOX */
/* -------------------------------------------------------------------------------- */

// $('.lightboxjs-link').each(function(){
//   $(this).on('click', function(){
//     $('iframe').find('.media-document').css('height', '400px !important');
//   });
  
// });

var iframe = $('#myIframe');
var iframeDocument = iframe.contents();

var elementoDentroIframe = iframeDocument.find('.media-document');
elementoDentroIframe.removeClass('audio', 'mac');









/* Icona Hamburger */
// var pulsanteMenu = document.getElementsByClassName("pulsante_menu");
// for (var i = 0; i < pulsanteMenu.length; i++) {
//   pulsanteMenu[i].addEventListener("click", function () {
//     document.body.classList.toggle("menu-open");
//   });
// }

/* Pulsante Booking Dates */
var pulsanteBookingDates = document.getElementsByClassName(
  "pulsante_booking_dates"
);
for (var i = 0; i < pulsanteBookingDates.length; i++) {
  pulsanteBookingDates[i].addEventListener("click", function () {
    document.body.classList.toggle("date-menu-open");
  });
}


/* ==========================================================================
   GSAP
============================================================================= */
/*BEGIN AFTER DOM LOAD*/
  gsap.registerPlugin(ScrollTrigger);

  //animazione menu overlay
  jQuery(document).ready(function ($) {
    $(".pulsante_menu").on("click", function () {
      if ($("body").hasClass("menu-open")) {
        gsap.from(".main-menu", {
          y: 100,
          duration: 2,
        });
        gsap.from(".main-menu li:not(.wp-block-navigation__submenu-container *)", {
          opacity: 0,
          yPercent: 50,
          ease: "power4",
          stagger: 0.15,
          duration: 0.5,
          delay: 0.3,
        });
      }
    });
  });

  //animazione paragrafi
  var paragrafi = document.querySelectorAll(
    "p:not(.pulsante_menu_icona):not(.no-animation):not(.popup-aperture-overlay-testo p), .wp-block-button:not(.no-animation), .bottura-accordion-container, .bottura-logo-prenotazione-container, .wp-block-separator:not(footer .wp-block-separator), .bottura-menu-riga"
  );
  for (var i = 0; i < paragrafi.length; i++) {
    var paragrafo = paragrafi[i];

    gsap.set(paragrafo, { y: 0, opacity: 1,});
    gsap.from(paragrafo, {
      duration: 1.5,
      stagger: 0.1,
      opacity: 0,
      y: 100,
      ease: "power4",
      scrollTrigger: {
        trigger: paragrafo,
      },
    });
  }

  //animazione titoli
  var titoli = document.querySelectorAll(
    "h1, h2, h3, h4, h5, h6, .has-titolo-big-font-size"
  );
  for (var i = 0; i < titoli.length; i++) {
    var titolo = titoli[i];
    const childSplit = new SplitText(titolo, {
      type: "lines",
      linesClass: "split-child",
    });
    const parentSplit = new SplitText(titolo, {
      type: "lines",
      linesClass: "split-parent",
    });
    gsap.from(childSplit.lines, {
      scrollTrigger: {
        trigger: titolo,
      },
      duration: 2.5,
      yPercent: 100,
      ease: "power4",
      stagger: 0.1,
      onComplete: () => {
        childSplit.revert();
        parentSplit.revert();
      },
    });
  }

  //animazione immagini
  var immagini_gsap = document.querySelectorAll(".slider-bottura");
  for (var i = 0; i < immagini_gsap.length; i++) {
    var immagine = immagini_gsap[i];

    gsap.to(immagine, {
      opacity: 1,
      ease: "power4",
      duration: 2,
      delay: 0.5,
    });
  }


/*  -----------------------------------------------------------------------------------------------
  SLIDER
--------------------------------------------------------------------------------------------------- */
const elements = document.querySelectorAll('.wp-block-column .carousel-slider-testo');
elements.forEach((elem) => {
  const flkty = new Flickity(elem, {
    draggable: true,
    autoPlay: 5000,
    prevNextButtons: false,
    pauseAutoPlayOnHover: false
  });

  flkty.on('dragStart', () => {
    flkty.slider.childNodes.forEach((slide) => {
      slide.style.pointerEvents = 'none';
    });
  });

  flkty.on('dragEnd', () => {
    flkty.slider.childNodes.forEach((slide) => {
      slide.style.pointerEvents = 'all';
    });
  });
});




/*  -----------------------------------------------------------------------------------------------
  BUTTON FORM FORMIDABLE
--------------------------------------------------------------------------------------------------- */
$('.frm_button_submit').addClass('wp-block-button__link');



/* -------------------------------------------------------------------------------- */
/* ! lightbox */
/* -------------------------------------------------------------------------------- */

/* freccie */
$(document).ready(function() {
  $('.lb-nav').insertBefore('.lb-dataContainer');
});

/* data attribute slider - previene lo slide di tutte le immagini in un unico lightbox */
let $contatore_slider = 0;
$('.blocco-slider-testo-container').each(function(){
  let $data_attr = $(this).find('.blocco-slider-testo-lightbox').attr('data-lightbox');
  // console.log($data_attr);
  $(this).find('.blocco-slider-testo-lightbox').attr('data-lightbox', $data_attr + '-' + $contatore_slider);
  $contatore_slider++;
});


/* -------------------------------------------------------------------------------- */
/* //! OVERLAY APERTURE */
/* -------------------------------------------------------------------------------- */
// apertura 
$('.popup-aperture-wrap').on('click', function(){
  $('body').addClass('overlay-aperture-open');
});
// chiusura
$('.popup-aperture-overlay-close-icon').on('click', function(){
  $('body').removeClass('overlay-aperture-open');
});






//*-----------------------------------------------------------------------------------------------
////  LANDING PRENOTAZIONE
//*-----------------------------------------------------------------------------------------------
$('.pulsanti-cross-selling a').click(function(e) {
  e.preventDefault();
  var target = $(this).attr('href');
  $('html, body').animate({
      scrollTop: $(target).offset().top
  }, 500); // La durata dello scrolling in millisecondi (500ms = 0.5s)
});




//* -------------------------------------------------------------------------------- */
//// CLASSE SCROLL
//* -------------------------------------------------------------------------------- */
var scroll_iniziale = $(document).scrollTop();
if(scroll_iniziale > 99){
  // $('.t99-header-container').addClass('has-custom-due-background-color');
  $('body').addClass('scrollato');
}
var scroll_pos = 0;
$(document).scroll(function() {
  scroll_pos = $(this).scrollTop();
  if(scroll_pos > 100) {
    // $('.t99-header-container').addClass('has-custom-due-background-color');
    $('body').addClass('scrollato');
  } else {
    // $('.t99-header-container').removeClass( 'has-custom-due-background-color' );
    $('body').removeClass('scrollato');
  }
}); // end

//*-----------------------------------------------------------------------------------------------
////  SCROLL TOP BUTTON
//*-----------------------------------------------------------------------------------------------
$(".scroll-top-button").click(function(){
  $("html, body").animate({ scrollTop: 0 }, "slow");
  return false;
});







// console.log('JS ok');


  }); // END jquery load


    /* -------------------------------------------------------------------------------- */
    /* ! PRELOADER */
    /* -------------------------------------------------------------------------------- */

    window.addEventListener("load", function () {
      jQuery("body").toggleClass("body-load");
    });

}); // END addEventListener