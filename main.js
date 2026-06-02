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