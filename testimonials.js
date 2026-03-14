(function () {
  "use strict";

  var reviews = [
    {
      rating: 5,
      reviewer: "Priya Sharma",
      roleReviewer: "Bride",
      review: "Absolutely stunning bridal mehndi. The details were incredible and lasted beautifully throughout the wedding.",
      date: "2025-02-12"
    },
    {
      rating: 4.8,
      reviewer: "Ananya Verma",
      roleReviewer: "Engagement Client",
      review: "Very professional artist and amazing creativity. Everyone loved the mehndi design.",
      date: "2025-01-28"
    },
    {
      rating: 5,
      reviewer: "Neha Gupta",
      roleReviewer: "Baby Shower Client",
      review: "The designs were elegant and the experience was wonderful. Highly recommended!",
      date: "2025-01-20"
    },
    {
      rating: 4.9,
      reviewer: "Ritika Mehra",
      roleReviewer: "Festival Client",
      review: "The mehndi artist was punctual, patient, and created such graceful patterns for our family celebration.",
      date: "2024-12-16"
    },
    {
      rating: 5,
      reviewer: "Sana Khan",
      roleReviewer: "Guest Mehndi Client",
      review: "Beautiful finishing, rich stain, and lovely experience from start to end. I would definitely book again.",
      date: "2024-11-30"
    }
  ];

  var averageRatingElement = document.getElementById("averageRating");
  var averageStarsElement = document.getElementById("averageStars");
  var reviewsListElement = document.getElementById("reviewsList");
  var viewMoreButton = document.getElementById("viewMoreButton");

  if (!averageRatingElement || !averageStarsElement || !reviewsListElement) {
    return;
  }

  function calculateAverageRating() {
    var total = reviews.reduce(function (sum, review) {
      return sum + review.rating;
    }, 0);

    return (total / reviews.length).toFixed(1);
  }

  function createStarIcon(fillType, index, rating) {
    var gradientId = "half-star-gradient-" + index + "-" + String(rating).replace(".", "-");
    var fill = "var(--empty-star)";
    var defs = "";

    if (fillType === "full") {
      fill = "#C58A2C";
    } else if (fillType === "half") {
      fill = "url(#" + gradientId + ")";
      defs =
        '<defs><linearGradient id="' + gradientId + '" x1="0%" y1="0%" x2="100%" y2="0%">' +
        '<stop offset="50%" stop-color="#C58A2C"></stop>' +
        '<stop offset="50%" stop-color="rgba(245,230,211,0.22)"></stop>' +
        '<stop offset="100%" stop-color="rgba(245,230,211,0.22)"></stop>' +
        "</linearGradient></defs>";
    }

    return (
      '<svg class="star-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
      defs +
      '<path fill="' + fill + '" d="M12 2.8l2.82 5.72 6.32.92-4.57 4.45 1.08 6.29L12 17.2l-5.65 2.98 1.08-6.29L2.86 9.44l6.32-.92L12 2.8z"></path>' +
      "</svg>"
    );
  }

  function createStars(rating) {
    var stars = "";

    for (var i = 1; i <= 5; i += 1) {
      var fillType = "empty";

      if (rating >= i) {
        fillType = "full";
      } else if (rating > i - 1 && rating < i && rating % 1 >= 0.5) {
        fillType = "half";
      }

      stars += createStarIcon(fillType, i, rating);
    }

    return stars;
  }

  function formatMonthYear(dateString) {
    var date = new Date(dateString + "T00:00:00");

    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric"
    });
  }

  function createReviewCard(review) {
    var article = document.createElement("article");
    article.className = "review-card";
    article.setAttribute("tabindex", "0");

    article.innerHTML =
      '<div class="review-header">' +
      '<div>' +
      '<h3 class="reviewer-name">' + review.reviewer + "</h3>" +
      "</div>" +
      '<span class="rating-badge">' + review.rating.toFixed(1) + "</span>" +
      "</div>" +
      '<div class="review-stars stars" aria-label="Rating: ' + review.rating.toFixed(1) + ' out of 5 stars">' +
      createStars(review.rating) +
      "</div>" +
      '<p class="review-text">"' + review.review + '"</p>' +
      '<div class="review-footer">' +
      '<span>' + review.reviewer + ", " + review.roleReviewer + "</span>" +
      "<span>" + formatMonthYear(review.date) + "</span>" +
      "</div>";

    return article;
  }

  function renderAverage() {
    var average = calculateAverageRating();
    averageRatingElement.textContent = average;
    averageStarsElement.innerHTML = createStars(Number(average));
    averageStarsElement.setAttribute("aria-label", "Average rating: " + average + " out of 5 stars");
  }

  function renderReviews() {
    reviewsListElement.innerHTML = "";

    reviews.forEach(function (review) {
      reviewsListElement.appendChild(createReviewCard(review));
    });
  }

  if (viewMoreButton) {
    viewMoreButton.addEventListener("click", function () {
      reviewsListElement.scrollTo({
        top: reviewsListElement.scrollHeight,
        behavior: "smooth"
      });
    });
  }

  renderAverage();
  renderReviews();
})();
