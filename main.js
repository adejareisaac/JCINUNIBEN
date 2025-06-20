function toggleMenu() {
  const navMenu = document.querySelector(".nav-menu");
  navMenu.classList.toggle("active");
}

// Mobile dropdown solution - First click shows About page, second click shows dropdown
function toggleDropdown(event) {
  // Only handle special behavior on mobile
  if (window.innerWidth <= 768) {
    event.preventDefault();
    event.stopPropagation();

    const dropdown = event.target.closest(".dropdown");
    const dropdownContent = dropdown.querySelector(".dropdown-content");

    // Check if dropdown is currently visible
    const isDropdownVisible = dropdownContent.style.display === "block";

    if (!isDropdownVisible) {
      // First click: Check if user has seen About page
      const hasVisitedAbout = sessionStorage.getItem("aboutVisited");

      if (!hasVisitedAbout) {
        // First time clicking - go to About page
        sessionStorage.setItem("aboutVisited", "true");
        window.location.href = "about.html";
        return;
      } else {
        // User has seen About page - show dropdown
        // Close all other dropdowns first
        document.querySelectorAll(".dropdown-content").forEach((content) => {
          content.style.display = "none";
        });

        // Show current dropdown
        dropdownContent.style.display = "block";
      }
    } else {
      // Dropdown is visible - hide it
      dropdownContent.style.display = "none";
    }
  }
  // On desktop, let the link work normally (no preventDefault)
}

// Reset About visited state when page loads (so behavior resets each session)
window.addEventListener("load", function () {
  // Only reset if we're not on the about page
  if (!window.location.pathname.includes("about.html")) {
    sessionStorage.removeItem("aboutVisited");
  }
});

// When returning from About page, allow dropdown to work
window.addEventListener("pageshow", function (event) {
  if (event.persisted || performance.navigation.type === 2) {
    // Page was loaded from cache (back button) - keep aboutVisited state
  }
});

// Close mobile menu and dropdowns when clicking outside
document.addEventListener("click", function (event) {
  const navMenu = document.querySelector(".nav-menu");
  const menuToggle = document.querySelector(".menu-toggle");

  if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
    navMenu.classList.remove("active");

    // Close all dropdowns
    document.querySelectorAll(".dropdown-content").forEach((content) => {
      content.style.display = "none";
    });
  }
});

// Handle touch events for mobile dropdown
document.addEventListener("touchstart", function (event) {
  if (window.innerWidth <= 768) {
    const dropdown = event.target.closest(".dropdown");
    if (!dropdown) {
      // Close all dropdowns if touching outside
      document.querySelectorAll(".dropdown-content").forEach((content) => {
        content.style.display = "none";
      });
    }
  }
});

// Handle window resize
window.addEventListener("resize", function () {
  if (window.innerWidth > 768) {
    document.querySelector(".nav-menu").classList.remove("active");
    // Close all dropdowns
    document.querySelectorAll(".dropdown-content").forEach((content) => {
      content.style.display = "none";
    });
  }
});
