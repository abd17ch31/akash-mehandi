(function () {
  "use strict";

  var revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });

    revealItems.forEach(function (item) {
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  }

  var statsSection = document.getElementById("stats");
  var statNumbers = document.querySelectorAll(".stat-number");
  var hasCounted = false;

  function animateCount(el, target, suffix) {
    var duration = 1600;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var current = Math.floor(progress * target);
      el.textContent = current + suffix;

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
      }
    }

    window.requestAnimationFrame(step);
  }

  function runCounters() {
    if (hasCounted) return;
    hasCounted = true;

    statNumbers.forEach(function (item) {
      var target = parseInt(item.getAttribute("data-target"), 10) || 0;
      var suffix = item.getAttribute("data-suffix") || "";
      animateCount(item, target, suffix);
    });
  }

  if (statsSection && "IntersectionObserver" in window) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          runCounters();
          counterObserver.disconnect();
        }
      });
    }, { threshold: 0.3 });

    counterObserver.observe(statsSection);
  } else {
    runCounters();
  }
})();
