import SimpleParallax from "simple-parallax-js/vanilla";

var images = document.querySelectorAll(".parallax");
new SimpleParallax(images, {
  customWrapper: ".section--parallax",
});
