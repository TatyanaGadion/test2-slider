import SwipeCarousel from "./swipe-carousel.js";

const carousel = new SwipeCarousel({
  containerID: '.carousel',
  slideID: '.slide',
  interval: 1000,
  // isPlaying: true
});

carousel.init();