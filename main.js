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
window.addEventListener("load", () => {
  const btn = document.createElement("button");
  btn.id = "btn-top";
  btn.innerHTML = "↑";
  document.body.appendChild(btn);

  const style = document.createElement("style");
  style.textContent = `
    #btn-top {
      position: fixed;
      bottom: 40px;
      right: 40px;
      z-index: 9999;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      border: none;
      background: #2e96ad;
      color: white;
      font-size: 20px;
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transform: translateY(20px);
      transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s, background 0.2s;
      box-shadow: 0 4px 15px rgba(46,150,173,0.4);
    }
    #btn-top.visible {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
    #btn-top:hover {
      background: #1a6eff;
    }
  `;
  document.head.appendChild(style);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
