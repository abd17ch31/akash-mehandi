(function () {
  "use strict";

  var revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );

    revealItems.forEach(function (item) {
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  }

  var tiltCards = document.querySelectorAll("[data-tilt]");
  tiltCards.forEach(function (card) {
    card.addEventListener("mouseenter", function () {
      card.classList.add("is-hovering");
    });

    card.addEventListener("mouseleave", function () {
      card.classList.remove("is-hovering");
      card.style.transform = "";
    });

    card.addEventListener("mousemove", function (event) {
      var rect = card.getBoundingClientRect();
      var offsetX = ((event.clientX - rect.left) / rect.width - 0.5) * 5;
      var offsetY = ((event.clientY - rect.top) / rect.height - 0.5) * -5;
      card.style.transform = "translateY(-8px) rotateX(" + offsetY.toFixed(2) + "deg) rotateY(" + offsetX.toFixed(2) + "deg)";
    });
  });

  var images = document.querySelectorAll("img[data-fallback]");
  images.forEach(function (img) {
    img.addEventListener("error", function () {
      var fallbackSrc = img.getAttribute("data-fallback");
      if (fallbackSrc && img.src !== fallbackSrc) {
        img.src = fallbackSrc;
      }
    });
  });
})();
