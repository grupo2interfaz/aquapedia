document.addEventListener("DOMContentLoaded", () => {

  // ── CONTADOR ANIMADO (stats) ──
  const counters = document.querySelectorAll(".stats h2");

  const animateCounter = (counter) => {
    const finalText = counter.textContent.trim();
    const finalNumber = parseInt(finalText.replace(/\D/g, ""));
    if (isNaN(finalNumber)) return;

    let current = 0;
    const hasPlus = finalText.includes("+");

    const interval = setInterval(() => {
      current++;
      counter.textContent = hasPlus ? `+${current}` : current;
      if (current >= finalNumber) {
        clearInterval(interval);
        counter.textContent = finalText;
      }
    }, 50);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
        entry.target.classList.add("counted");
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.6 });

  counters.forEach((counter) => observer.observe(counter));


  // ── OCÉANOS EN CRISIS (desplegable) ──
  const boton = document.getElementById("boton-crisis");
  const lista = document.getElementById("lista-crisis");

  if (boton && lista) {
    boton.addEventListener("click", () => {
      lista.classList.toggle("abierto");
      boton.textContent = lista.classList.contains("abierto") ? "↑" : "↓";
    });
  }


  // ── BURBUJAS ──
  const container = document.querySelector(".bubbles");

  if (container) {
    function createBubble() {
      const bubble = document.createElement("div");
      bubble.classList.add("bubble");

      const size = Math.random() * 80 + 20;
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${Math.random() * 100}%`;
      bubble.style.background = Mat