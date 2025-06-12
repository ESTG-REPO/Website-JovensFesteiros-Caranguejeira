  (function ($) {
    const $slider = $('.your-slick-slider');
    let currentMode = null;

    const MODES = {
      mobile: {
        min: 0,
        max: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
          lazyLoad: 'ondemand',
          speed: 300,
          adaptiveHeight: true
        }
      },
      tablet: {
        min: 768,
        max: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true,
          dots: true,
          lazyLoad: 'ondemand',
          speed: 400,
          adaptiveHeight: true
        }
      },
      desktop: {
        min: 1025,
        max: 1440,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          arrows: true,
          dots: false,
          lazyLoad: 'progressive',
          speed: 500,
          adaptiveHeight: true
        }
      },
      ultrawide: {
        min: 1441,
        max: Infinity,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
          arrows: true,
          dots: false,
          lazyLoad: 'progressive',
          speed: 600,
          adaptiveHeight: true
        }
      }
    };

    function getCurrentMode() {
      const width = window.innerWidth;
      for (const [mode, config] of Object.entries(MODES)) {
        if (width >= config.min && width <= config.max) {
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
        'transform': 'translateZ(0)' // GPU acceleration hint
      });

      $slider.slick(MODES[newMode].settings);
    }

    // ResizeObserver fallback using window resize
    let resizeTimeout;
    function onResizeSmart() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(applySlickIfNeeded, 200);
    }

    // Use ResizeObserver if available
    if ('ResizeObserver' in window) {
      const observer = new ResizeObserver(onResizeSmart);
      observer.observe(document.body);
    } else {
      $(window).on('resize orientationchange', onResizeSmart);
    }

    $(document).ready(() => {
      applySlickIfNeeded();
    });

  })(jQuery);
