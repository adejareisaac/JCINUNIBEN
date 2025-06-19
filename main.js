document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const body = document.body;

  // Function to toggle the main mobile menu
  window.toggleMenu = function () {
    navMenu.classList.toggle("active");
    menuToggle.classList.toggle("active"); // Optional: Add 'active' to hamburger for animation/X-transform
    body.classList.toggle("no-scroll"); // Prevent body scroll
  };

  // --- Handling Mobile Dropdowns ---
  // If you want dropdowns to open on click on mobile, not hover
  const dropdowns = document.querySelectorAll(".nav-menu .dropdown > a");

  dropdowns.forEach((dropdownLink) => {
    dropdownLink.addEventListener("click", function (event) {
      // Only toggle on mobile (adjust breakpoint to match CSS)
      if (window.innerWidth <= 768) {
        event.preventDefault(); // Prevent default link navigation
        const parentLi = this.closest("li.dropdown");
        parentLi.classList.toggle("open"); // Toggle 'open' class on the parent <li>

        // Close other open dropdowns if multiple are possible
        document
          .querySelectorAll(".nav-menu .dropdown.open")
          .forEach((otherDropdown) => {
            if (otherDropdown !== parentLi) {
              otherDropdown.classList.remove("open");
            }
          });
      }
    });
  });

  // Optional: Close mobile menu when a link inside it is clicked
  // This is good for single-page applications or if you don't want the menu to stay open
  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 768 && !this.closest(".dropdown-content")) {
        // Only close if it's not a dropdown sub-link click
        navMenu.classList.remove("active");
        menuToggle.classList.remove("active");
        body.classList.remove("no-scroll");
        // Also close any open dropdowns if the main menu closes
        document
          .querySelectorAll(".nav-menu .dropdown.open")
          .forEach((dropdown) => {
            dropdown.classList.remove("open");
          });
      }
    });
  });

  // Optional: Close menu if user resizes window from mobile to desktop
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      navMenu.classList.remove("active");
      menuToggle.classList.remove("active");
      body.classList.remove("no-scroll");
      // Ensure desktop dropdowns work again by removing 'open' class
      document.querySelectorAll(".nav-menu .dropdown").forEach((dropdown) => {
        dropdown.classList.remove("open");
      });
    }
  });
});
