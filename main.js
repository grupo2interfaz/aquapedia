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
document.addEventListener("DOMContentLoaded", () => {
  const textNodes = [];

  function getTextNodes(element) {
    for (const node of element.childNodes) {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        textNodes.push(node);
      } else if (
        node.nodeType === Node.ELEMENT_NODE &&
        !["SCRIPT", "STYLE", "NOSCRIPT"].includes(node.tagName)
      ) {
        getTextNodes(node);
      }
    }
  }

  getTextNodes(document.body);

  textNodes.forEach((node) => {
    const words = node.textContent.split(/(\s+)/);
    const fragment = document.createDocumentFragment();

    words.forEach((part) => {
      if (part.trim() === "") {
        fragment.appendChild(document.createTextNode(part));
      } else {
        const span = document.createElement("span");
        span.textContent = part;
        span.addEventListener("mouseenter", () => {
          span.style.color = "#1a6eff";
          span.style.transition = "color 0.2s ease";
        });
        span.addEventListener("mouseleave", () => {
          span.style.color = "";
        });
        fragment.appendChild(span);
      }
    });

    node.parentNode.replaceChild(fragment, node);
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.createElement("div");
  cursor.id = "custom-cursor";
  cursor.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 50" width="80" height="50">
      <!-- Cola -->
      <polygon points="0,10 18,25 0,40" fill="#2e96ad" opacity="0.9"/>
      <!-- Cuerpo -->
      <ellipse cx="42" cy="25" rx="28" ry="18" fill="#2e96ad"/>
      <!-- Panza -->
      <ellipse cx="44" cy="28" rx="18" ry="10" fill="#bfe7f0" opacity="0.6"/>
      <!-- Ojo -->
      <circle cx="62" cy="20" r="5" fill="white"/>
      <circle cx="63" cy="20" r="2.5" fill="#0a2e38"/>
      <circle cx="64" cy="19" r="1" fill="white"/>
      <!-- Aleta superior -->
      <path d="M38,7 Q48,2 54,10" stroke="#1a6eff" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <!-- Boca -->
      <path d="M70,24 Q74,27 70,30" stroke="#0a2e38" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      <!-- Escamas -->
      <path d="M50,18 Q54,14 58,18" stroke="#bfe7f0" stroke-width="1.2" fill="none" opacity="0.7"/>
      <path d="M40,20 Q44,16 48,20" stroke="#bfe7f0" stroke-width="1.2" fill="none" opacity="0.7"/>
    </svg>
  `;
  document.body.appendChild(cursor);

  const style = document.createElement("style");
  style.textContent = `
    * { cursor: none !important; }

    #custom-cursor {
      position: fixed;
      pointer-events: none;
      z-index: 99999;
      transform: translate(-50%, -50%);
      transition: transform 0.08s ease;
      filter: drop-shadow(0 2px 6px rgba(46,150,173,0.4));
    }

    #custom-cursor.clicking {
      transform: translate(-50%, -50%) scale(0.85);
    }

    #custom-cursor.flipped {
      transform: translate(-50%, -50%) scaleX(-1);
    }

    #custom-cursor.flipped.clicking {
      transform: translate(-50%, -50%) scaleX(-1) scale(0.85);
    }
  `;
  document.head.appendChild(style);

  let posX = 0, posY = 0;
  let lastX = 0;

  document.addEventListener("mousemove", (e) => {
    posX = e.clientX;
    posY = e.clientY;

    cursor.style.left = `${posX}px`;
    cursor.style.top  = `${posY}px`;

    // Flip según dirección del movimiento
    if (posX < lastX) {
      cursor.classList.add("flipped");
    } else if (pos
