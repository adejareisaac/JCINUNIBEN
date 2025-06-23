// function toggleMenu() {
//   const navMenu = document.querySelector(".nav-menu");
//   navMenu.classList.toggle("active");
// }

// // Mobile dropdown solution - First click shows About page, second click shows dropdown
// function toggleDropdown(event) {
//   // Only handle special behavior on mobile
//   if (window.innerWidth <= 768) {
//     event.preventDefault();
//     event.stopPropagation();

//     const dropdown = event.target.closest(".dropdown");
//     const dropdownContent = dropdown.querySelector(".dropdown-content");

//     // Check if dropdown is currently visible
//     const isDropdownVisible = dropdownContent.style.display === "block";

//     if (!isDropdownVisible) {
//       // First click: Check if user has seen About page
//       const hasVisitedAbout = sessionStorage.getItem("aboutVisited");

//       if (!hasVisitedAbout) {
//         // First time clicking - go to About page
//         sessionStorage.setItem("aboutVisited", "true");
//         window.location.href = "about.html";
//         return;
//       } else {
//         // User has seen About page - show dropdown
//         // Close all other dropdowns first
//         document.querySelectorAll(".dropdown-content").forEach((content) => {
//           content.style.display = "none";
//         });

//         // Show current dropdown
//         dropdownContent.style.display = "block";
//       }
//     } else {
//       // Dropdown is visible - hide it
//       dropdownContent.style.display = "none";
//     }
//   }
//   // On desktop, let the link work normally (no preventDefault)
// }

// // Reset About visited state when page loads (so behavior resets each session)
// window.addEventListener("load", function () {
//   // Only reset if we're not on the about page
//   if (!window.location.pathname.includes("about.html")) {
//     sessionStorage.removeItem("aboutVisited");
//   }
// });

// // When returning from About page, allow dropdown to work
// window.addEventListener("pageshow", function (event) {
//   if (event.persisted || performance.navigation.type === 2) {
//     // Page was loaded from cache (back button) - keep aboutVisited state
//   }
// });

// // Close mobile menu and dropdowns when clicking outside
// document.addEventListener("click", function (event) {
//   const navMenu = document.querySelector(".nav-menu");
//   const menuToggle = document.querySelector(".menu-toggle");

//   if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
//     navMenu.classList.remove("active");

//     // Close all dropdowns
//     document.querySelectorAll(".dropdown-content").forEach((content) => {
//       content.style.display = "none";
//     });
//   }
// });

// // Handle touch events for mobile dropdown
// document.addEventListener("touchstart", function (event) {
//   if (window.innerWidth <= 768) {
//     const dropdown = event.target.closest(".dropdown");
//     if (!dropdown) {
//       // Close all dropdowns if touching outside
//       document.querySelectorAll(".dropdown-content").forEach((content) => {
//         content.style.display = "none";
//       });
//     }
//   }
// });

// // Handle window resize
// window.addEventListener("resize", function () {
//   if (window.innerWidth > 768) {
//     document.querySelector(".nav-menu").classList.remove("active");
//     // Close all dropdowns
//     document.querySelectorAll(".dropdown-content").forEach((content) => {
//       content.style.display = "none";
//     });
//   }

document.addEventListener("DOMContentLoaded", () => {
  // Show loading spinner on page load
  const loadingSpinner = document.getElementById("loading-spinner");
  if (loadingSpinner) {
    loadingSpinner.classList.add("hidden"); // Hide after content loads
  }

  // --- Header Scroll Effect ---
  const header = document.querySelector(".header");
  const heroSlideshow = document.querySelector(".hero-slideshow"); // Assuming hero is the first main section

  function handleScroll() {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Show/hide back to top button
    const backToTopButton = document.getElementById("backToTop");
    if (window.scrollY > 300) {
      backToTopButton.classList.add("show");
    } else {
      backToTopButton.classList.remove("show");
    }
  }

  window.addEventListener("scroll", handleScroll);
  // Initial check in case page loads with scroll position
  handleScroll();

  // --- Mobile Menu Toggle ---
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  window.toggleMenu = function () {
    navMenu.classList.toggle("active");
    menuToggle.classList.toggle("active");
    // Toggle aria-expanded for accessibility
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", !isExpanded);
  };

  // Close mobile menu when a nav link is clicked
  navMenu.querySelectorAll("a:not(.dropdown-toggle)").forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu.classList.contains("active")) {
        toggleMenu(); // Close the menu if open
      }
    });
  });

  // --- Dropdown Toggle ---
  window.toggleDropdown = function (event) {
    const dropdown = event.currentTarget.closest(".dropdown");
    dropdown.classList.toggle("active");
    // Toggle aria-expanded for accessibility
    const isExpanded =
      event.currentTarget.getAttribute("aria-expanded") === "true";
    event.currentTarget.setAttribute("aria-expanded", !isExpanded);

    // Close other open dropdowns
    document.querySelectorAll(".dropdown.active").forEach((openDropdown) => {
      if (openDropdown !== dropdown) {
        openDropdown.classList.remove("active");
        openDropdown
          .querySelector(".dropdown-toggle")
          .setAttribute("aria-expanded", "false");
      }
    });

    event.stopPropagation(); // Prevent click from bubbling to document
  };

  // Close dropdowns when clicking outside
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".dropdown")) {
      document.querySelectorAll(".dropdown.active").forEach((dropdown) => {
        dropdown.classList.remove("active");
        dropdown
          .querySelector(".dropdown-toggle")
          .setAttribute("aria-expanded", "false");
      });
    }
  });

  // --- Hero Slideshow ---
  let slideIndex = 0;
  let slideshowTimer;
  const slides = document.querySelectorAll(".slide");
  const indicators = document.querySelectorAll(".indicator");

  function showSlides(n) {
    if (slides.length === 0) return; // Prevent errors if no slides are found

    // Wrap around
    if (n >= slides.length) {
      slideIndex = 0;
    }
    if (n < 0) {
      slideIndex = slides.length - 1;
    }

    // Hide all slides and remove active class
    slides.forEach((slide) => {
      slide.classList.remove("active");
    });
    indicators.forEach((indicator) => {
      indicator.classList.remove("active");
    });

    // Show current slide and add active class
    slides[slideIndex].classList.add("active");
    indicators[slideIndex].classList.add("active");
  }

  function plusSlides(n) {
    showSlides((slideIndex += n));
    resetSlideshowTimer();
  }

  function currentSlide(n) {
    showSlides((slideIndex = n - 1)); // Adjust for 0-based index
    resetSlideshowTimer();
  }

  function autoPlaySlides() {
    plusSlides(1); // Move to the next slide
  }

  function resetSlideshowTimer() {
    clearTimeout(slideshowTimer);
    slideshowTimer = setTimeout(autoPlaySlides, 5000); // Change image every 5 seconds
  }

  // Assign functions to global scope for onclick attributes
  window.changeSlide = plusSlides;
  window.currentSlide = currentSlide;

  // Initialize slideshow
  showSlides(slideIndex);
  resetSlideshowTimer(); // Start autoplay

  // --- Back to Top Button Functionality ---
  window.scrollToTop = function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // --- Newsletter Subscription (Placeholder) ---
  window.subscribeNewsletter = function (event) {
    event.preventDefault(); // Prevent default form submission
    const emailInput = event.target.querySelector('input[type="email"]');
    const email = emailInput.value;

    if (email) {
      // In a real application, you would send this email to a server
      console.log(`Subscribed with email: ${email}`);
      alert(
        `Thank you for subscribing, ${email}! You'll receive our latest updates.`
      );
      emailInput.value = ""; // Clear the input field
    } else {
      alert("Please enter a valid email address.");
    }
  };

  // --- Smooth scroll for skip link ---
  document.querySelectorAll("a.skip-link").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      document.querySelector(targetId).scrollIntoView({
        behavior: "smooth",
      });
      // After scrolling, move focus to the target for accessibility
      document.querySelector(targetId).setAttribute("tabindex", "-1");
      document.querySelector(targetId).focus();
    });
  });

  // --- Add event listeners for offer cards to be clickable ---
  document.querySelectorAll(".offer-card").forEach((card) => {
    card.addEventListener("click", function () {
      const link = this.querySelector(".offer-link");
      if (link) {
        window.location.href = link.href;
      }
    });
  });
});

// Hide loading spinner once everything is truly loaded (including images)
window.addEventListener("load", () => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (loadingSpinner) {
    loadingSpinner.classList.add("hidden");
  }
});
