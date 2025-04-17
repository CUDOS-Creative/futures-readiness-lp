document.addEventListener("DOMContentLoaded", function () {
  const videoContainer = document.querySelector(".home-video");
  const videoIframePlaceholder = document.querySelector(
    ".video-iframe-placeholder"
  );
  const videoFacade = document.querySelector(".video-background__facade");

  // Get the Vimeo ID from the data attribute
  const vimeoId = videoContainer.getAttribute("data-vimeo-id");

  // IntersectionObserver options
  const options = {
    root: null, // Use the viewport as root
    threshold: 0.25, // Trigger when 25% of the video container is visible
  };

  // Function to inject the iframe when it enters the viewport
  const loadVideo = () => {
    const iframe = document.createElement("iframe");
    iframe.setAttribute(
      "src",
      `https://player.vimeo.com/video/${vimeoId}?autoplay=1&muted=1&loop=1&background=1`
    );
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allow", "autoplay; fullscreen");
    iframe.setAttribute("allowfullscreen", true);
    iframe.setAttribute("title", "Home page video.");

    // Append the iframe to the placeholder div
    videoIframePlaceholder.appendChild(iframe);

    // Fade out the facade once the iframe is loaded
    iframe.addEventListener("load", function () {
      videoFacade.style.opacity = "0";
      setTimeout(() => {
        videoFacade.style.display = "none";
      }, 500); // Match with the CSS transition duration
    });
  };

  // Set up the intersection observer
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadVideo();
        observer.unobserve(videoContainer); // Stop observing once the video is loaded
      }
    });
  }, options);

  // Start observing the video container
  observer.observe(videoContainer);
});
