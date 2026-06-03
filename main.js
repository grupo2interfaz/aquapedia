document.addEventListener("DOMContentLoaded", () => {

  const counters = document.querySelectorAll(".stats h2");

  const animateCounter = (counter) => {

    const finalText = counter.textContent.trim();
    const finalNumber = parseInt(finalText.replace(/\D/g, ""));

    if (isNaN(finalNumber)) return;

    let current = 0;
    const hasPlus = finalText.includes("+");

    const interval = setInterval(() => {

      current++;

      counter.textContent = hasPlus
        ? `+${current}`
        : current;

      if (current >= finalNumber) {
        clearInterval(interval);
        counter.textContent = finalText;
      }

    }, 50);

  };

  const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

      if (
        entry.isIntersecting &&
        !entry.target.classList.contains("counted")
      ) {

        entry.target.classList.add("counted");
        animateCounter(entry.target);

      }

    });

  }, {
    threshold: 0.6
  });

  counters.forEach((counter) => {
    observer.observe(counter);
  });

 
});
document.addEventListener("DOMContentLoaded", () => {
  const boton = document.getElementById("boton-crisis");
  const lista = document.getElementById("lista-crisis");

  if (boton && lista) {
    boton.addEventListener("click", () => {
      lista.classList.toggle("abierto");
      boton.textContent = lista.classList.contains("abierto") ? "↑" : "↓";
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {

  const container = document.querySelector(".bubbles");

  if (!container) return;

  function createBubble() {

    const bubble = document.createElement("div");

    bubble.classList.add("bubble");

    const size = Math.random() * 80 + 20;

    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;

    bubble.style.left = `${Math.random() * 100}%`;

    bubble.style.background =
      Math.random() > 0.5
        ? "rgba(191,231,240,.35)"
        : "rgba(46,150,173,.25)";

    const duration = Math.random() * 8 + 8;

    bubble.style.animationDuration = `${duration}s`;

    container.appendChild(bubble);

    setTimeout(() => {
      bubble.remove();
    }, duration * 1000);
  }

  setInterval(createBubble, 1200);
});

