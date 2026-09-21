// ==========================================================
// PORTFOLIO JAVASCRIPT - SAI SATYA PRASANTH CHAMUTURI
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation Toggle
  const menuIcon = document.querySelector("#menu-icon");
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll("header nav a");

  if (menuIcon && navbar) {
    menuIcon.addEventListener("click", () => {
      menuIcon.classList.toggle("fa-xmark");
      navbar.classList.toggle("active");
    });

    // Close menu when clicking on any navigation link
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        menuIcon.classList.remove("fa-xmark");
        navbar.classList.remove("active");
      });
    });
  }

  // Scroll section active link and sticky navbar
  const sections = document.querySelectorAll("section");
  const header = document.querySelector("header");

  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;

    sections.forEach((sec) => {
      const top = scrollPosition;
      const offset = sec.offsetTop - 180;
      const height = sec.offsetHeight;
      const id = sec.getAttribute("id");

      if (top >= offset && top < offset + height) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          const activeNav = document.querySelector("header nav a[href*=" + id + "]");
          if (activeNav && !activeNav.classList.contains("btn-nav")) {
            activeNav.classList.add("active");
          }
        });
      }
    });

    // Sticky navbar toggle
    if (header) {
      header.classList.toggle("sticky", scrollPosition > 80);
    }
  });

  // Dynamic Current Year in Footer
  const currentYearElem = document.getElementById("current-year");
  if (currentYearElem) {
    currentYearElem.textContent = new Date().getFullYear();
  }

  // Typed JS initialization
  if (document.querySelector(".multiple-text") && typeof Typed !== "undefined") {
    new Typed(".multiple-text", {
      strings: [
        "Software Developer",
        "Full Stack Developer",
        "Python & Frappe Developer",
        "ERPNext & Next.js Specialist",
        "Backend & Integration Engineer"
      ],
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 1500,
      loop: true,
    });
  }

  // ScrollReveal Animations
  if (typeof ScrollReveal !== "undefined") {
    const sr = ScrollReveal({
      distance: "50px",
      duration: 1600,
      delay: 150,
      reset: false,
    });

    sr.reveal(".badge-status, .heading, .section-subtitle", { origin: "top" });
    sr.reveal(".home-content h1, .home-content h3, .home-content p, .btn-group, .social-media", {
      origin: "left",
      interval: 100,
    });
    sr.reveal(".home-img, .about-img", { origin: "right" });
    sr.reveal(".about-content", { origin: "left" });
    sr.reveal(".experience-card", { origin: "bottom", delay: 200 });
    sr.reveal(".skill-category", { origin: "bottom", interval: 150 });
    sr.reveal(".education-box", { origin: "bottom", interval: 150 });
    sr.reveal(".projects-card", { origin: "bottom", interval: 150 });
    sr.reveal(".contact-card", { origin: "left", interval: 100 });
    sr.reveal(".contact-form", { origin: "right", delay: 200 });
  }

  // Contact Form Submission Handler
  const contactForm = document.getElementById("contact-form");
  const submitBtn = document.getElementById("submit-btn");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone") ? document.getElementById("phone").value.trim() : "";
      const subject = document.getElementById("subject") ? document.getElementById("subject").value.trim() : "Portfolio Contact";
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        alert("Please fill in all required fields.");
        return;
      }

      const originalBtnText = submitBtn ? submitBtn.innerHTML : "Send Message";
      if (submitBtn) {
        submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending...`;
        submitBtn.disabled = true;
      }

      fetch("https://portfolio-backend-tddf.onrender.com/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone, subject, message }),
      })
        .then((response) => response.text())
        .then(() => {
          alert("Thank you! Your message has been sent successfully.");
          contactForm.reset();
        })
        .catch((error) => {
          console.error("Form error:", error);
          alert("Thank you! If there is any network issue sending directly, you can also reach me directly at cssprasanth99@gmail.com.");
        })
        .finally(() => {
          if (submitBtn) {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
          }
        });
    });
  }
});
