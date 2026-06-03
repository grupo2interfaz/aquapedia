(function() {
  var doc = window.document;

  doc.addEventListener("DOMContentLoaded", function() {

    // ── CONTADOR ANIMADO (stats) ──
    var counters = doc.querySelectorAll(".stats h2");

    function animateCounter(counter) {
      var finalText = counter.textContent.trim();
      var finalNumber = parseInt(finalText.replace(/\D/g, ""));
      if (isNaN(finalNumber)) return;

      var current = 0;
      var hasPlus = finalText.includes("+");

      var interval = setInterval(function() {
        current++;
        counter.textContent = hasPlus ? "+" + current : current;
        if (current >= finalNumber) {
          clearInterval(interval);
          counter.textContent = finalText;
        }
      }, 50);
    }

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
          entry.target.classList.add("counted");
          animateCounter(entry.target);
        }
      });
    }, { threshold: 0.6 });

    counters.forEach(function(counter) {
      observer.observe(counter);
    });


    // ── OCÉANOS EN CRISIS (desplegable) ──
    var boton = doc.getElementById("boton-crisis");
    var lista = doc.getElementById("lista-crisis");

    if (boton && lista) {
      boton.addEventListener("click", function() {
        lista.classList.toggle("abierto");
        boton.textContent = lista.classList.contains("abierto") ? "↑" : "↓";
      });
    }


    // ── BURBUJAS ──
    var container = doc.querySelector(".bubbles");

    if (container) {
      function createBubble() {
        var bubble = doc.createElement("div");
        bubble.classList.add("bubble");

        var size = Math.random() * 80 + 20;
        bubble.style.width = size + "px";
        bubble.style.height = size + "px";
        bubble.style.left = (Math.random() * 100) + "%";
        bubble.style.background = Math.random() > 0.5
          ? "rgba(191,231,240,.35)"
          : "rgba(46,150,173,.25)";

        var duration = Math.random() * 8 + 8;
        bubble.style.animationDuration = duration + "s";

        container.appendChild(bubble);
        setTimeout(function() { bubble.remove(); }, duration * 1000);
      }

      setInterval(createBubble, 1200);
    }

  });

})();