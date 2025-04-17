import Isotope from "isotope-layout";
import imagesLoaded from "imagesloaded";

// Check if the grid element exists
var gridElem = document.querySelector(".creations");
var filtersElem = document.querySelector(".filters");

if (gridElem && filtersElem) {
  // Initialize Isotope after all images have loaded
  imagesLoaded(gridElem, function () {
    // Initialize Isotope
    var iso = new Isotope(gridElem, {
      itemSelector: ".creations-item",
      layoutMode: "fitRows", // Choose the layout you need
    });

    // Get all filter buttons
    var filterButtons = filtersElem.querySelectorAll("button");

    // Add click event listener to the filter buttons
    filtersElem.addEventListener("click", function (event) {
      if (!event.target.matches("button")) {
        return;
      }
      // Remove active class from all buttons
      filterButtons.forEach(function (button) {
        button.classList.remove("active");
      });

      // Add active class to the clicked button
      event.target.classList.add("active");

      // Get the filter from the button's data-filter attribute
      var filterValue = event.target.getAttribute("data-filter");

      // If filterValue is '*', show all items, otherwise filter by the class name
      filterValue = filterValue === "*" ? "*" : ".filter-" + filterValue;

      // Apply the filter
      iso.arrange({ filter: filterValue });
    });
  });
}
