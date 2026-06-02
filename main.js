document.addEventListener("DOMContentLoaded", () => {
  /* DESPLEGABLE OCÉANOS EN CRISIS */

  const toggle = document.querySelector(".toggle");
  const crisisList = document.querySelector(".crisis-list");
  const crisisItems = document.querySelectorAll(".crisis-item");

  if (toggle && crisisList) {
    toggle.addEventListener("click", () => {
      const isOpen = crisisList.classList.toggle("active");

      toggle.textContent = isOpen ? "↑" : "↓";

      crisisItems.forEach((item, index) => {
        item.style.transitionDelay = isOpen ? `${index * 120}ms` : "0ms";
      });
    });
  }

  /* CONTADORES */

  const counters = document.querySelectorAll(".stats h2");

  const animateCounter = (counter) => {
    const finalText = counter.textContent.trim();
    const finalNumber = parseInt(finalText.replace(/\D/g, ""));

    if (isNaN(finalNumber)) return;

    let current = 0;
    const hasPlus = finalText.includes("+");
    const speed = 30;

    const interval = setInterval(() => {
      current++;

      counter.textContent = hasPlus ? `+${current}` : current;

      if (current >= finalNumber) {
        clearInterval(interval);
        counter.textContent = finalText;
      }
    }, speed);
  };

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
          entry.target.classList.add("counted");
          animateCounter(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach((counter) => {
    counterObserver.observe(counter);
  });

  /* OLAS EN AMENAZAS */

  const waves = document.querySelectorAll(".wave-section");

  const waveObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("wave-active");
        }
      });
    },
    { threshold: 0.25 }
  );

  waves.forEach((wave) => {
    waveObserver.observe(wave);
  });

  /* PARALLAX SUAVE */

  const parallaxImages = document.querySelectorAll(
    ".home-hero > img, #categorias article img, .mamiferos-hero img"
  );

  window.addEventListener("scroll", () => {
    parallaxImages.forEach((img) => {
      const rect = img.getBoundingClientRect();

      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const movement = rect.top * -0.04;
        img.style.transform = `translateY(${movement}px)`;
      }
    });
  });

  /* SCROLL SUAVE */

  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
});