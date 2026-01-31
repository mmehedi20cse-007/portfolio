// Md. Mehedi Hasan - Portfolio JavaScript

document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });

    // Close mobile menu when clicking a link
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
      });
    });
  }

  // Navbar scroll effect
  const navbar = document.getElementById("navbar");

  // Scroll progress bar
  const scrollProgress = document.getElementById("scroll-progress");
  function updateScrollProgress() {
    const winScroll =
      document.documentElement.scrollTop || document.body.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const percent = height > 0 ? (winScroll / height) * 100 : 0;
    if (scrollProgress) scrollProgress.style.width = percent + "%";
  }

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
    updateScrollProgress();
    updateActiveNavLink();
  });
  updateScrollProgress();

  // Active navigation link on scroll
  function updateActiveNavLink() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    let current = "";
    const scrollY = window.scrollY;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.08,
    rootMargin: "0px 0px -80px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // Add fade-in to sections
  document.querySelectorAll("section").forEach((section, index) => {
    section.classList.add("fade-in");
    section.style.transitionDelay = `${index * 0.05}s`;
    observer.observe(section);
  });

  // Scroll reveal for section headings (h2) and accent lines
  document.querySelectorAll("section h2").forEach((el, i) => {
    el.classList.add("scroll-reveal");
    el.style.transitionDelay = `${0.15 + i * 0.05}s`;
    observer.observe(el);
  });

  // Scroll reveal for cards and grid items with stagger
  document.querySelectorAll("section .rounded-xl").forEach((el, i) => {
    el.classList.add("scroll-reveal-scale");
    el.style.transitionDelay = `${(i % 6) * 0.08}s`;
    observer.observe(el);
  });

  // Scroll reveal for project cards (links with project-card class)
  document.querySelectorAll(".project-card").forEach((el, i) => {
    el.classList.add("scroll-reveal");
    el.style.transitionDelay = `${(i % 4) * 0.1}s`;
    observer.observe(el);
  });

  // Scroll reveal for skill cards with stagger
  document.querySelectorAll(".skill-card").forEach((el, i) => {
    el.classList.add("scroll-reveal-scale");
    el.style.transitionDelay = `${(i % 12) * 0.04}s`;
    observer.observe(el);
  });

  // Scroll reveal for skill filter buttons
  document.querySelectorAll(".skill-filter").forEach((el, i) => {
    el.classList.add("scroll-reveal");
    el.style.transitionDelay = `${i * 0.06}s`;
    observer.observe(el);
  });

  // Scroll reveal for list (experience bullets)
  document.querySelectorAll(".scroll-reveal-list").forEach((el) => {
    observer.observe(el);
  });

  // Hero text stagger on load
  setTimeout(() => {
    const heroText = document.querySelector("#hero [class*='order-2']");
    if (heroText) {
      const items = heroText.querySelectorAll("p, h1, div");
      items.forEach((el, i) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(16px)";
        el.style.transition = `opacity 0.5s ease ${
          0.2 + i * 0.07
        }s, transform 0.5s ease ${0.2 + i * 0.07}s`;
      });
      requestAnimationFrame(() => {
        items.forEach((el) => {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        });
      });
    }
  }, 100);

  // Skills filter functionality
  const skillFilters = document.querySelectorAll(".skill-filter");
  const skillCards = document.querySelectorAll(".skill-card");

  skillFilters.forEach((filter) => {
    filter.addEventListener("click", () => {
      const category = filter.getAttribute("data-filter");

      // Update active state
      skillFilters.forEach((f) => f.classList.remove("active"));
      filter.classList.add("active");

      // Filter cards
      skillCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");
        if (category === "all" || cardCategory === category) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });

  // Certificate modal
  const certModal = document.getElementById("cert-modal");
  const certModalImg = document.getElementById("cert-modal-img");
  const certModalIframe = document.getElementById("cert-modal-iframe");
  const certModalTitle = document.getElementById("cert-modal-title");
  const certModalClose = document.getElementById("cert-modal-close");

  document.querySelectorAll(".cert-view-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const url = btn.getAttribute("data-cert-url");
      const type = btn.getAttribute("data-cert-type");
      const title = btn.getAttribute("data-cert-title");

      certModalTitle.textContent = title;
      certModalImg.classList.add("hidden");
      certModalImg.src = "";
      certModalIframe.classList.add("hidden");
      certModalIframe.src = "";

      if (type === "image" || url?.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
        certModalImg.src = url;
        certModalImg.classList.remove("hidden");
        certModalImg.onerror = () => {
          certModalImg.alt =
            "Certificate image not found. Add image to certificates/ folder.";
        };
      } else if (type === "pdf" || url?.match(/\.pdf$/i)) {
        certModalIframe.src = url;
        certModalIframe.classList.remove("hidden");
      }

      certModal.classList.remove("hidden");
      certModal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  });

  function closeCertModal() {
    certModal.classList.add("hidden");
    certModal.setAttribute("aria-hidden", "true");
    certModalImg.src = "";
    certModalIframe.src = "";
    document.body.style.overflow = "";
  }

  if (certModalClose) certModalClose.addEventListener("click", closeCertModal);
  certModal?.addEventListener("click", (e) => {
    if (e.target === certModal) closeCertModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !certModal?.classList.contains("hidden"))
      closeCertModal();
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});
