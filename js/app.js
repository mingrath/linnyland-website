(function () {
  "use strict";

  // ------------------------------------------------
  // Lenis smooth scroll
  // ------------------------------------------------
  const lenis = new Lenis();

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // ------------------------------------------------
  // ScrollTrigger fade-in animations
  // ------------------------------------------------
  const fadeElements = document.querySelectorAll(".fade,.fade09,.js-mv-anime");
  fadeElements.forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      toggleClass: { targets: el, className: "active" },
      once: true,
    });
  });

  // ------------------------------------------------
  // Hero Swiper — fade, autoplay, fraction pagination
  // ------------------------------------------------
  (function () {
    const mvswiper = new Swiper(".mv-swiper", {
      loop: true,
      effect: "fade",
      fadeEffect: { crossFade: true },
      initialSlide: 0,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      speed: 1000,
      allowTouchMove: false,
      pagination: {
        el: ".swiper-pagination",
        type: "fraction",
        formatFractionCurrent: function (number) {
          return "0" + number;
        },
        formatFractionTotal: function (number) {
          return "0" + number;
        },
        renderFraction: function (currentClass, totalClass) {
          return (
            '<span class="' + currentClass + '"></span>' +
            '<span class="border js-border"><span></span></span>' +
            '<span class="' + totalClass + '"></span>'
          );
        },
      },
      on: {
        init: function () {
          setTimeout(function () {
            var pagination = document.querySelector(".swiper-pagination");
            if (pagination) {
              pagination.classList.add("is-active");
            }
          }, 100);
        },
        slideChangeTransitionStart: function () {
          var border = document.querySelector(".js-border span");
          if (border) {
            border.style.transform = "scaleX(0)";
            border.style.transitionDuration = "0s";
          }
        },
        slideChangeTransitionEnd: function () {
          var border = document.querySelector(".js-border span");
          if (border) {
            border.style.transform = "scaleX(1)";
            border.style.transitionDuration = "5000ms";
          }
        },
      },
    });
  })();

  // ------------------------------------------------
  // Rooms Swiper
  // ------------------------------------------------
  (function () {
    new Swiper(".rooms-swiper", {
      loop: true,
      loopAdditionalSlides: 1,
      speed: 1500,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      followFinger: false,
      observeParents: true,
    });
  })();

  // ------------------------------------------------
  // Accordion
  // ------------------------------------------------
  var buttons = document.querySelectorAll(".accordion-bt");
  buttons.forEach(function (button) {
    button.addEventListener("click", function (e) {
      var body = e.currentTarget.nextElementSibling;
      var text = body.children[0];
      var textHeight = text.offsetHeight;
      var menu = e.currentTarget.parentNode;

      menu.classList.toggle("open");

      if (menu.classList.contains("open")) {
        body.style.height = textHeight + "px";
      } else {
        body.style.height = "0";
      }
    });
  });

  // ------------------------------------------------
  // Smooth scroll (jQuery)
  // ------------------------------------------------
  $(function () {
    var headerHeight = 170;
    $('a[href^="#"]').click(function () {
      var speed = 500;
      var href = $(this).attr("href");
      var target = $(href === "#" || href === "" ? "html" : href);
      var position = target.offset().top;

      if (target.attr("id") !== "enjoy" && target.attr("id") !== "activities") {
        position -= headerHeight;
      }

      $("html, body").animate({ scrollTop: position }, speed, "swing");
      return false;
    });
  });

  // ------------------------------------------------
  // Facilities parallax — main images (yPercent 35 → -35)
  // ------------------------------------------------
  gsap.utils.toArray(".js-scroll-anime-trigger-02").forEach(function (item) {
    var target = item.querySelector(".facilities-sub-img-inner");
    if (target) {
      gsap.fromTo(
        target,
        { yPercent: 35 },
        {
          yPercent: -35,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        }
      );
    }
  });

  // ------------------------------------------------
  // Image scroll parallax (yPercent 0 → -10)
  // ------------------------------------------------
  gsap.utils.toArray(".js-scroll-anime-img").forEach(function (item) {
    var img = item.querySelector("img") || item.querySelector(".placeholder-img");
    if (img) {
      gsap.fromTo(
        img,
        { yPercent: 0 },
        {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    }
  });

  // ------------------------------------------------
  // Features background parallax (y -50 → 0)
  // ------------------------------------------------
  var itemsfeatures = gsap.utils.toArray(".features-content,.map");
  var itemsToAnimate = itemsfeatures.slice(0, -1);

  itemsToAnimate.forEach(function (item) {
    var inner = item.querySelector(".features-inner") || item.querySelector(".map-content");
    if (inner) {
      gsap.fromTo(
        inner,
        { y: -50, ease: "none" },
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    }
  });

})();
