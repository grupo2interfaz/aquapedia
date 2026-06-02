document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     SCROLL ANIMATIONS
  ========================= */

  const animatedElements = document.querySelectorAll(
    ".stat-card, .cat-card, .wave-section, .dato-card, .animal, .crisis-card"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  animatedElements.forEach((element) => {
    element.classList.add("hidden-animation");
    observer.observe(element);
  });

  /* =========================
     OCEANOS EN CRISIS
  ========================= */
const toggle = document.querySelector(".toggle");
const crisisList = document.querySelector(".crisis-list");
const crisisItems = document.querySelectorAll(".crisis-item");

if (toggle && crisisList) {
  toggle.addEventListener("click", () => {
    crisisList.classList.toggle("active");

    const isOpen = crisisList.classList.contains("active");
    toggle.textContent = isOpen ? "↑" : "↓";

    crisisItems.forEach((item, index) => {
      item.style.transitionDelay = isOpen ? `${index * 120}ms` : "0ms";
    });
  });
}

  /* =========================
     OLAS AMENAZAS
  ========================= */

  const waves = document.querySelectorAll(".wave-section");

  const waveObserver = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("wave-visible");

        }

      });

    },
    {
      threshold: 0.25
    }
  );

  waves.forEach((wave) => {
    waveObserver.observe(wave);
  });

  /* =========================
     SCROLL SUAVE
  ========================= */

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {

    anchor.addEventListener("click", function (e) {

      const target = document.querySelector(
        this.getAttribute("href")
      );

      if (target) {

        e.preventDefault();

        target.scrollIntoView({
          behavior: "smooth"
        });

      }

    });

  });

});