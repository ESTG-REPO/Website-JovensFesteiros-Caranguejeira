(function ($) {
  $(document).ready(() => {
    const $slider = $('.slick-carousel');
    let currentMode = null;

    const MODES = {
      mobile: {
        min: 0,
        max: 1024,
        settings: {
          slidesToScroll: 1,
          fade: true,
          autoplay: true,
          autoplaySpeed: 3000,
          arrows: true,
          dots: true,
          pauseOnHover: true,
          adaptiveHeight: true
        }
      },
      desktop: {
        min: 1025,
        max: Infinity,
        settings: {
          slidesToScroll: 1,
          fade: false,
          autoplay: true,
          autoplaySpeed: 3000,
          arrows: true,
          dots: false,
          pauseOnHover: true,
          adaptiveHeight: true
        }
      }
    };

    function getCurrentMode() {
      const width = window.innerWidth;
      for (const [mode, conf] of Object.entries(MODES)) {
        if (width >= conf.min && width <= conf.max) {
          return mode;
        }
      }
      return 'desktop';
    }

    function applySlickIfNeeded() {
      const newMode = getCurrentMode();
      if (newMode === currentMode) return;
      currentMode = newMode;

      if ($slider.hasClass('slick-initialized')) {
        $slider.slick('unslick');
      }

      $slider.css({
        'will-change': 'transform',
        'backface-visibility': 'hidden',
        'transform': 'translateZ(0)'
      });

      const slideCount = $slider.children().length;
      const modeSettings = { ...MODES[newMode].settings };

      // ✅ Always define slidesToShow based on real count
      modeSettings.slidesToShow = Math.min(slideCount, newMode === 'desktop' ? 3 : 1);

      console.log(`Applying slick in ${newMode} mode with ${slideCount} slides`);
      $slider.slick(modeSettings);
    }

    let resizeTimer;
    function onSmartResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(applySlickIfNeeded, 200);
    }

    if ('ResizeObserver' in window) {
      new ResizeObserver(() => onSmartResize()).observe(document.body);
    } else {
      $(window).on('resize orientationchange', onSmartResize);
    }

    applySlickIfNeeded();

    $slider.on('mouseenter', 'img', function () {
      $(this).css('transform', 'scale(1.2)');
    }).on('mouseleave', 'img', function () {
      $(this).css('transform', 'scale(1)');
    });
  });
})(jQuery);