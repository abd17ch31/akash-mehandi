const images = [
  {
    title: "Bridal",
    url: "images/home/home-bridal.jpeg",
    alt: "Bridal mehndi hands on an Indian bride",
    galleryTitle: "Bridal Mehndi",
    popupSubtitle: "Six signature bridal mehndi designs from Akash Bridal Mehndi.",
    gallery: [
      "images/gallery/bridal mehandi akash/bm-1.jpg",
      "images/gallery/bridal mehandi akash/bm-2.jpg",
      "images/gallery/bridal mehandi akash/bm-3.jpg",
      "images/gallery/bridal mehandi akash/bm-4.jpg",
      "images/gallery/bridal mehandi akash/bm-5.jpeg",
      "images/gallery/bridal mehandi akash/bm-6.webp"
    ]
  },
  {
    title: "Portrait",
    url: "images/home/home-portrait.png",
    alt: "Close-up portrait of intricate mehndi hands",
    galleryTitle: "Portrait Mehndi",
    popupSubtitle: "Six portrait-style mehndi designs shown in this popup gallery.",
    gallery: [
      "images/gallery/Traditional mehandi akash/10c014a96a17b8ecabea9fd78b076e2e.jpg",
      "images/gallery/Traditional mehandi akash/23ab1e9d30f14d346aee74207340614f.jpg",
      "images/gallery/Traditional mehandi akash/IMG_20260314_152337.jpg",
      "images/gallery/Traditional mehandi akash/IMG_20260314_152401.jpg",
      "images/gallery/Traditional mehandi akash/IMG_20260314_152441.jpg",
      "images/gallery/Traditional mehandi akash/IMG_20260314_152522.jpg"
    ]
  },
  {
    title: "Cultural",
    url: "images/home/home-traditional.jpeg",
    alt: "Traditional cultural mehndi ceremony",
    galleryTitle: "Cultural Mehndi",
    popupSubtitle: "Six cultural mehndi designs curated for this category.",
    gallery: [
      "images/gallery/Cultural mehandi akash/cm-1.jpg",
      "images/gallery/Cultural mehandi akash/cm-2.jpg",
      "images/gallery/Cultural mehandi akash/cm-3.jpg",
      "images/gallery/Cultural mehandi akash/cm-4.jpg",
      "images/gallery/Cultural mehandi akash/cm-5.jpg",
      "images/gallery/Cultural mehandi akash/cm-6.jpg"
    ]
  },
  {
    title: "Baby Shower",
    url: "images/home/home-baby-shower.jpeg",
    alt: "Baby shower mehndi celebration",
    galleryTitle: "Baby Shower Mehndi",
    popupSubtitle: "Six baby shower mehndi designs for celebration styling.",
    gallery: [
      "images/gallery/baby shower mehandi akash/bs-1.jpg",
      "images/gallery/baby shower mehandi akash/bs-2.jpg",
      "images/gallery/baby shower mehandi akash/bs-3.jpg",
      "images/gallery/baby shower mehandi akash/bs-4.jpg",
      "images/gallery/baby shower mehandi akash/bs-5.jpg",
      "images/gallery/baby shower mehandi akash/bs-6.jpg"
    ]
  },
  {
    title: "Engagement",
    url: "images/home/home-engagement.jpeg",
    alt: "Engagement mehndi for a special celebration",
    galleryTitle: "Engagement Mehndi",
    popupSubtitle: "Six engagement mehndi looks selected for this popup gallery.",
    gallery: [
      "images/gallery/engagement mehandi akash/em-1.jpg",
      "images/gallery/engagement mehandi akash/em-2.jpg",
      "images/gallery/engagement mehandi akash/em-3.jpg",
      "images/gallery/engagement mehandi akash/em-4.jpg",
      "images/gallery/engagement mehandi akash/em-5.jpg",
      "images/gallery/engagement mehandi akash/em-6.jpg"
    ]
  },
  {
    title: "Guest",
    url: "images/home/home-guest.jpeg",
    alt: "Guest mehndi design close-up",
    galleryTitle: "Guest Mehndi",
    popupSubtitle: "Six guest mehndi designs for wedding and event visitors.",
    gallery: [
      "images/gallery/guest mehandi akash/gm-1.jpg",
      "images/gallery/guest mehandi akash/gm-2.jpg",
      "images/gallery/guest mehandi akash/gm-3.jpg",
      "images/gallery/guest mehandi akash/gm-4.jpg",
      "images/gallery/guest mehandi akash/gm-5.jpg",
      "images/gallery/guest mehandi akash/gm-6.jpg"
    ]
  }
];

const flipDuration = 750;
const halfDuration = flipDuration / 2;

const topHalf = document.getElementById("topHalf");
const bottomHalf = document.getElementById("bottomHalf");
const overlayTop = document.getElementById("overlayTop");
const overlayBottom = document.getElementById("overlayBottom");
const titleElement = document.getElementById("galleryTitle");
const nextButton = document.getElementById("nextButton");
const prevButton = document.getElementById("prevButton");
const cardLink = document.getElementById("galleryCardLink");
const flipGallery = document.getElementById("flipGallery");
const flipCard = document.getElementById("flipCard");
const galleryModal = document.getElementById("galleryModal");
const galleryModalBackdrop = document.getElementById("galleryModalBackdrop");
const galleryModalClose = document.getElementById("galleryModalClose");
const galleryModalTitle = document.getElementById("galleryModalTitle");
const galleryModalSubtitle = document.getElementById("galleryModalSubtitle");
const galleryModalFeaturedImage = document.getElementById("galleryModalFeaturedImage");
const galleryModalGrid = document.getElementById("galleryModalGrid");

let currentIndex = 0;
let isAnimating = false;
let touchStartX = 0;
let touchCurrentX = 0;
let modalActiveIndex = 0;

function setHalfBackground(element, imageUrl, position) {
  element.style.backgroundImage = `url("${imageUrl}")`;
  element.style.backgroundPosition = position;
}

function renderStaticHalves(index) {
  const item = images[index];
  setHalfBackground(topHalf, item.url, "center top");
  setHalfBackground(bottomHalf, item.url, "center bottom");
  cardLink.setAttribute("aria-label", `Open ${item.title} mehndi gallery`);
  cardLink.setAttribute("data-title", item.title);
  flipCard.setAttribute("aria-label", item.alt);
}

function animateTitle(nextTitle) {
  titleElement.style.setProperty("--title-y", "14px");
  titleElement.style.setProperty("--title-opacity", "0");

  window.setTimeout(() => {
    titleElement.textContent = nextTitle;
    requestAnimationFrame(() => {
      titleElement.style.setProperty("--title-y", "0px");
      titleElement.style.setProperty("--title-opacity", "1");
    });
  }, 220);
}

function resetOverlayState() {
  overlayTop.className = "overlay overlay-top";
  overlayBottom.className = "overlay overlay-bottom";
}

function applyNextFlip(nextIndex) {
  const currentItem = images[currentIndex];
  const nextItem = images[nextIndex];

  setHalfBackground(overlayTop, currentItem.url, "center top");
  setHalfBackground(overlayBottom, nextItem.url, "center bottom");

  overlayTop.classList.add("is-visible", "flip-next");
  overlayBottom.classList.add("is-visible", "flip-next");

  window.setTimeout(() => {
    renderStaticHalves(nextIndex);
  }, halfDuration);
}

function applyPrevFlip(nextIndex) {
  const currentItem = images[currentIndex];
  const nextItem = images[nextIndex];

  setHalfBackground(overlayBottom, currentItem.url, "center bottom");
  setHalfBackground(overlayTop, nextItem.url, "center top");

  overlayBottom.classList.add("is-visible", "flip-prev");
  overlayTop.classList.add("is-visible", "flip-prev");

  window.setTimeout(() => {
    renderStaticHalves(nextIndex);
  }, halfDuration);
}

function goToIndex(nextIndex, direction) {
  if (isAnimating || nextIndex === currentIndex) {
    return;
  }

  isAnimating = true;
  resetOverlayState();
  animateTitle(images[nextIndex].title);

  requestAnimationFrame(() => {
    if (direction === "next") {
      applyNextFlip(nextIndex);
    } else {
      applyPrevFlip(nextIndex);
    }
  });

  window.setTimeout(() => {
    resetOverlayState();
    currentIndex = nextIndex;
    isAnimating = false;
  }, flipDuration);
}

function showNext() {
  const nextIndex = (currentIndex + 1) % images.length;
  goToIndex(nextIndex, "next");
}

function showPrevious() {
  const nextIndex = (currentIndex - 1 + images.length) % images.length;
  goToIndex(nextIndex, "prev");
}

function handleCardClick(event) {
  event.preventDefault();
  openModal(currentIndex);
}

function setFeaturedImage(item, imageIndex) {
  const imageUrl = item.gallery[imageIndex];
  galleryModalFeaturedImage.src = imageUrl;
  galleryModalFeaturedImage.alt = `${item.galleryTitle} image ${imageIndex + 1}`;
}

function renderModalGrid(item) {
  galleryModalGrid.innerHTML = "";

  item.gallery.forEach((imageUrl, imageIndex) => {
    const thumbButton = document.createElement("button");
    thumbButton.type = "button";
    thumbButton.className = "gallery-modal__thumb";
    thumbButton.setAttribute("aria-label", `Show ${item.galleryTitle} image ${imageIndex + 1}`);

    if (imageIndex === modalActiveIndex) {
      thumbButton.classList.add("is-active");
    }

    const thumbImage = document.createElement("img");
    thumbImage.src = imageUrl;
    thumbImage.alt = `${item.galleryTitle} thumbnail ${imageIndex + 1}`;
    thumbImage.loading = "lazy";

    thumbButton.appendChild(thumbImage);
    thumbButton.addEventListener("click", () => {
      modalActiveIndex = imageIndex;
      setFeaturedImage(item, modalActiveIndex);
      renderModalGrid(item);
    });

    galleryModalGrid.appendChild(thumbButton);
  });
}

function openModal(index) {
  const item = images[index];

  modalActiveIndex = 0;
  galleryModalTitle.textContent = item.galleryTitle;
  galleryModalSubtitle.textContent = item.popupSubtitle;
  setFeaturedImage(item, modalActiveIndex);
  renderModalGrid(item);

  galleryModal.hidden = false;
  document.body.classList.add("modal-open");
  galleryModalClose.focus();
}

function closeModal() {
  if (galleryModal.hidden) {
    return;
  }

  galleryModal.hidden = true;
  document.body.classList.remove("modal-open");
  cardLink.focus();
}

function handleModalKeydown(event) {
  if (event.key === "Escape") {
    closeModal();
    return;
  }

  if (galleryModal.hidden) {
    return;
  }

  if (event.key === "ArrowRight") {
    const item = images[currentIndex];
    modalActiveIndex = (modalActiveIndex + 1) % item.gallery.length;
    setFeaturedImage(item, modalActiveIndex);
    renderModalGrid(item);
  }

  if (event.key === "ArrowLeft") {
    const item = images[currentIndex];
    modalActiveIndex = (modalActiveIndex - 1 + item.gallery.length) % item.gallery.length;
    setFeaturedImage(item, modalActiveIndex);
    renderModalGrid(item);
  }
}

function handleTouchStart(event) {
  if (!event.touches.length) {
    return;
  }

  touchStartX = event.touches[0].clientX;
  touchCurrentX = touchStartX;
}

function handleTouchMove(event) {
  if (!event.touches.length) {
    return;
  }

  touchCurrentX = event.touches[0].clientX;
}

function handleTouchEnd() {
  const deltaX = touchCurrentX - touchStartX;

  if (Math.abs(deltaX) < 36 || isAnimating) {
    return;
  }

  if (deltaX < 0) {
    showNext();
  } else {
    showPrevious();
  }
}

function setupReveal() {
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });

    revealItems.forEach((item) => {
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }
}

function syncResponsiveState() {
  const currentItem = images[currentIndex];
  cardLink.href = "#";
  cardLink.title = currentItem.alt;
}

function init() {
  renderStaticHalves(currentIndex);
  titleElement.textContent = images[currentIndex].title;
  titleElement.style.setProperty("--title-y", "0px");
  titleElement.style.setProperty("--title-opacity", "1");
  syncResponsiveState();
  setupReveal();

  nextButton.addEventListener("click", showNext);
  prevButton.addEventListener("click", showPrevious);
  cardLink.addEventListener("click", handleCardClick);
  galleryModalClose.addEventListener("click", closeModal);
  galleryModalBackdrop.addEventListener("click", closeModal);

  flipGallery.addEventListener("touchstart", handleTouchStart, { passive: true });
  flipGallery.addEventListener("touchmove", handleTouchMove, { passive: true });
  flipGallery.addEventListener("touchend", handleTouchEnd);

  window.addEventListener("resize", syncResponsiveState);
  document.addEventListener("keydown", handleModalKeydown);
}

init();
