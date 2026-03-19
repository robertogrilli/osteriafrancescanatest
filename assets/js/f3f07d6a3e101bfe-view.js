/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!************************************************!*\
  !*** ./src/t99-block-gutenberg-slider/view.js ***!
  \************************************************/
const $ = jQuery;
sliderBlock($);
function sliderBlock($) {
  $('.sliderBlock').each(function (index) {
    const $this = $(this);
    const sliderId = $this.attr('data-slides-id');
    $this.find('.wp-block-cover').addClass('swiper-slide');
    const sliderClass = `sliderBlock_${index + 1}`;
    $this.addClass(sliderClass);

    // Opzioni slider 
    let swiperOptions = {
      slidesPerView: parseInt($this.attr('data-slides-number')),
      spaceBetween: parseInt($this.attr('data-slides-spazio')),
      speed: parseInt($this.attr('data-slides-velocity')),
      loop: $this.attr('data-slides-loop') === 'true',
      rewind: $this.attr('data-slides-rewind') === 'true',
      effect: $this.attr('data-slides-fade'),
      navigation: $this.attr('data-slides-freccie') === 'true' ? {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      } : false,
      pagination: $this.attr('data-slides-paginazione') === 'true' ? {
        el: ".swiper-pagination",
        clickable: true
      } : false,
      toolbar: $this.attr('data-slides-toolbar') === 'true' ? {
        el: ".swiper-toolbar",
        draggable: true
      } : false,
      autoplay: $this.attr('data-slides-autoplay') === 'true' ? {
        delay: parseInt($this.attr('data-slides-time')),
        disableOnInteraction: $this.attr('data-slides-interaction') === 'true',
        pauseOnMouseEnter: $this.attr('data-slides-hover') === 'true'
      } : false
    };
    const customRules = $this.attr('data-extra-rules');
    if (customRules) {
      try {
        let formattedCustomRules = customRules.replace(/([a-zA-Z0-9_]+)\s*:/g, '"$1":') // Aggiunge virgolette alle chiavi
        .replace(/,\s*}/g, '}') // Rimuove le virgole prima delle parentesi chiuse "}"
        .replace(/,\s*$/, ''); // Rimuove l'ultima virgola se presente

        const parsedCustomRules = JSON.parse(`{${formattedCustomRules}}`);
        swiperOptions = {
          ...swiperOptions,
          ...parsedCustomRules
        };
      } catch (error) {
        console.error('Error parsing custom rules:', error);
      }
    }

    /**
     * Hook globale permette di gestire opzioni slider in secondo momento.
     *   
     * Esempio:
     * window.beforeSwiperInit = function(swiperOptions, $element, sliderId) {
     * if (sliderId === 'ANCORA') {swiperOptions.autoplay = {delay: 5000,};}
     * };
     * 
     */

    if (typeof window.beforeSwiperInit === 'function') {
      window.beforeSwiperInit(swiperOptions, $this, sliderId);
    }

    // INIT
    new Swiper(`.${sliderClass}`, swiperOptions);

    // Parvus Lightbox
    if ($this.attr('data-slides-lightbox') === 'true') {
      $this.find('.wp-block-cover:not(.swiper-slide-duplicate)').each(function () {
        const $cover = $(this);
        const urlImg = $cover.find('.wp-block-cover__image-background').attr('src');
        $cover.prepend(`<a href="${urlImg}" class="lightbox sliderBlock_lightbox_link" data-group="gallery_${index + 1}" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; z-index:1"></a>`);
      });
      new Parvus();
    }
  });
}
/******/ })()
;
//# sourceMappingURL=view.js.map