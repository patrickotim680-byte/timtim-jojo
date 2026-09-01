/* =========================================================
   TIMTIM JOJO — MAIN JAVASCRIPT
   Premium Motion System v2
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* -------------------------------------------------------
     SCROLL REVEAL
     ------------------------------------------------------- */

  const revealElements = document.querySelectorAll(
    ".section, .card, .contact-box, .about-preview"
  );

  revealElements.forEach((element) => {
    element.classList.add("reveal");
  });


  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) {
            return;
          }

          const element = entry.target;

          /* Stagger cards slightly */
          if (element.classList.contains("card")) {

            const cards = Array.from(
              document.querySelectorAll(".card")
            );

            const index = cards.indexOf(element);

            element.style.transitionDelay =
              `${index * 120}ms`;
          }

          element.classList.add("visible");

          observer.unobserve(element);

        });

      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px"
      }
    );


    revealElements.forEach((element) => {
      observer.observe(element);
    });

  } else {

    revealElements.forEach((element) => {
      element.classList.add("visible");
    });

  }


  /* -------------------------------------------------------
     NAVBAR SCROLL STATE
     ------------------------------------------------------- */

  const navbar = document.querySelector(".navbar");

  const updateNavbar = () => {

    if (!navbar) {
      return;
    }

    if (window.scrollY > 20) {

      navbar.style.boxShadow =
        "0 12px 35px rgba(0, 0, 0, 0.28)";

      navbar.style.borderBottomColor =
        "#333333";

    } else {

      navbar.style.boxShadow = "none";

      navbar.style.borderBottomColor =
        "#242424";

    }

  };

  updateNavbar();

  window.addEventListener(
    "scroll",
    updateNavbar,
    { passive: true }
  );


  /* -------------------------------------------------------
     SMOOTH INTERNAL LINKS
     ------------------------------------------------------- */

  const internalLinks = document.querySelectorAll(
    'a[href^="#"]'
  );

  internalLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId =
        link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target =
        document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


  /* -------------------------------------------------------
     PAGE TRANSITIONS
     ------------------------------------------------------- */

  const pageLinks = document.querySelectorAll(
    'a[href$=".html"]'
  );

  pageLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

      const href =
        link.getAttribute("href");

      if (
        !href ||
        href.startsWith("#") ||
        link.target === "_blank" ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      event.preventDefault();

      document.body.style.transition =
        "opacity 0.25s ease";

      document.body.style.opacity = "0";

      setTimeout(() => {
        window.location.href = href;
      }, 250);

    });

  });


  /* -------------------------------------------------------
     PREVENT FLASH AFTER BACK/FORWARD NAVIGATION
     ------------------------------------------------------- */

  window.addEventListener("pageshow", () => {
    document.body.style.opacity = "1";
  });

});
