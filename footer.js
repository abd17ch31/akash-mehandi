(function () {
  "use strict";

  var footer = document.getElementById("royalFooter");
  if (!footer) {
    return;
  }

  var fadeTarget = footer.querySelector(".footer-fade-target");
  if (fadeTarget && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            fadeTarget.classList.add("is-visible");
            observer.disconnect();
          }
        });
      },
      {
        root: null,
        threshold: 0.2,
        rootMargin: "0px 0px -12% 0px"
      }
    );

    observer.observe(footer);
  } else if (fadeTarget) {
    fadeTarget.classList.add("is-visible");
  }

  var socialLinks = footer.querySelectorAll(".footer-social-link");
  socialLinks.forEach(function (link) {
    link.addEventListener("mouseenter", function () {
      link.classList.add("is-active");
    });

    link.addEventListener("mouseleave", function () {
      link.classList.remove("is-active");
    });

    link.addEventListener("focus", function () {
      link.classList.add("is-active");
    });

    link.addEventListener("blur", function () {
      link.classList.remove("is-active");
    });
  });
})();
