// function toggleMenu() {
//   const navMenu = document.querySelector(".nav-menu");
//   navMenu.classList.toggle("active");
// }

// // FIXED: Mobile dropdown toggle
// function toggleDropdown(event) {
//   // Only prevent default on mobile
//   if (window.innerWidth <= 768) {
//     event.preventDefault();
//     const dropdown = event.target.closest(".dropdown");
//     dropdown.classList.toggle("active");
//   }
//   // On desktop, let the link work normally
// }

// // Close mobile menu when clicking outside
// document.addEventListener("click", function (event) {
//   const navMenu = document.querySelector(".nav-menu");
//   const menuToggle = document.querySelector(".menu-toggle");

//   if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
//     navMenu.classList.remove("active");
//     // Close all dropdowns
//     document.querySelectorAll(".dropdown").forEach((dropdown) => {
//       dropdown.classList.remove("active");
//     });
//   }
// });

// // Handle window resize
// window.addEventListener("resize", function () {
//   if (window.innerWidth > 768) {
//     document.querySelector(".nav-menu").classList.remove("active");
//     document.querySelectorAll(".dropdown").forEach((dropdown) => {
//       dropdown.classList.remove("active");
//     });
//   }
// });

// Toggle mobile menu
function toggleMenu() {
  const navMenu = document.querySelector(".nav-menu");
  navMenu.classList.toggle("active");
}

// FIXED: Mobile dropdown toggle - works on touch/click
function toggleDropdown(event) {
  // Only prevent default on mobile
  if (window.innerWidth <= 768) {
    event.preventDefault();
    event.stopPropagation();
    const dropdown = event.target.closest(".dropdown");

    // Close all other dropdowns first
    document.querySelectorAll(".dropdown").forEach((otherDropdown) => {
      if (otherDropdown !== dropdown) {
        otherDropdown.classList.remove("active");
      }
    });

    // Toggle current dropdown
    dropdown.classList.toggle("active");
  }
  // On desktop, let the link work normally
}

// Close mobile menu when clicking outside
document.addEventListener("click", function (event) {
  const navMenu = document.querySelector(".nav-menu");
  const menuToggle = document.querySelector(".menu-toggle");

  if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
    navMenu.classList.remove("active");
    // Close all dropdowns
    document.querySelectorAll(".dropdown").forEach((dropdown) => {
      dropdown.classList.remove("active");
    });
  }
});

// Handle touch events for mobile dropdown
document.addEventListener("touchstart", function (event) {
  if (window.innerWidth <= 768) {
    const dropdown = event.target.closest(".dropdown");
    if (!dropdown) {
      // Close all dropdowns if touching outside
      document.querySelectorAll(".dropdown").forEach((dropdown) => {
        dropdown.classList.remove("active");
      });
    }
  }
});

// Handle window resize
window.addEventListener("resize", function () {
  if (window.innerWidth > 768) {
    document.querySelector(".nav-menu").classList.remove("active");
    document.querySelectorAll(".dropdown").forEach((dropdown) => {
      dropdown.classList.remove("active");
    });
  }
});
