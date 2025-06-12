  (function ($) {
    const $slider = $('.slick-carousel');
    let currentMode = null;

    const MODES = {
      mobile: {
        min: 0,
        max: 1024,
        settings: {
          slidesToShow: 1,
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
          slidesToShow: 3,           // Changed for desktop
          slidesToScroll: 1,
          fade: false,               // Turn off fade
          autoplay: true,
          autoplaySpeed: 3000,
          arrows: true,
          dots: false,               // Less intrusive on desktop
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

      $slider.slick(MODES[newMode].settings);
    }

    let resizeTimer;
    function onSmartResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(applySlickIfNeeded, 200);
    }

    if ('ResizeObserver' in window) {
      new ResizeObserver(onSmartResize).observe(document.body);
    } else {
      $(window).on('resize orientationchange', onSmartResize);
    }

    $(document).ready(() => {
      applySlickIfNeeded();

      // Optional: Restore your image zoom effect
      $slider.on('mouseenter', 'img', function () {
        $(this).css('transform', 'scale(1.2)');
      }).on('mouseleave', 'img', function () {
        $(this).css('transform', 'scale(1)');
      });
    });

  })(jQuery);
