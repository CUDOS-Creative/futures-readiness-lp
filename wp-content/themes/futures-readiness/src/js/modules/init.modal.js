import MicroModal from "micromodal"; // es6 module

MicroModal.init({
  openTrigger: "data-micromodal-trigger", // Attribute to open modal
  closeTrigger: "data-micromodal-close", // Attribute to close modal
  disableScroll: true, // Optionally disable page scrolling while modal is open
  awaitOpenAnimation: true, // Enable open animation
  awaitCloseAnimation: true, // Enable close animation
});
