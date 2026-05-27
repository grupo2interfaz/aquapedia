/* ============================================================
   AquaPedia – main.js
   1. Menú hamburguesa (mobile)
   2. Header scroll effect
   3. Animaciones al hacer scroll (IntersectionObserver)
   ============================================================ */

/* ── 1. MENÚ HAMBURGUESA ──────────────────────────────────── */
const hamburger = document.querySelector('.hamburger');
const mainNav   = document.querySelector('.main-nav');

if (hamburger && mainNav) {
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    mainNav.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  /* Cerrar menú al hacer click en un link */
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mainNav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ── 2. HEADER: sombra al hacer scroll ───────────────────── */
const header = document.querySelector('.site-header');

if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

/* ── 3. ANIMACIONES AL SCROLL ────────────────────────────── */

/*
  Cómo funciona:
  - Agregamos la clase CSS "reveal" a los elementos que queremos animar.
  - Cuando el elemento entra en el viewport, le agregamos "reveal--visible"
    que dispara la transición definida en el CSS inyectado abajo.
  - Distintos tipos de animación: fade-up (default), fade-left, fade-right,
    zoom. Se aplican con el atributo data-reveal="tipo".
*/

/* Estilos de animación inyectados dinámicamente */
const style = document.createElement('style');
style.textContent = `
  /* Estado inicial – oculto */
  .reveal {
    opacity: 0;
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .reveal[data-reveal="fade-up"]    { transform: translateY(40px); }
  .reveal[data-reveal="fade-left"]  { transform: translateX(-40px); }
  .reveal[data-reveal="fade-right"] { transform: translateX(40px); }
  .reveal[data-reveal="zoom"]       { transform: scale(0.92); }

  /* Estado visible – animado */
  .reveal--visible {
    opacity: 1 !important;
    transform: none !important;
  }

  /* Delays escalonados para grillas */
  .reveal--d1 { transition-delay: 0.1s; }
  .reveal--d2 { transition-delay: 0.2s; }
  .reveal--d3 { transition-delay: 0.3s; }
  .reveal--d4 { transition-delay: 0.4s; }
  .reveal--d5 { transition-delay: 0.5s; }

  /* Header scrolled */
  .site-header.scrolled {
    background: rgba(10,22,40,.97);
    box-shadow: 0 2px 20px rgba(0,0,0,.35);
  }
`;
document.head.appendChild(style);

/* ── Seleccionar y marcar elementos por página ────────────── */
function setupRevealElements() {

  /* ---- INDEX.HTML ---- */

  /* Stats cards: zoom con delay escalonado */
  document.querySelectorAll('.stat-card').forEach((el, i) => {
    el.classList.add('reveal', `reveal--d${i + 1}`);
    el.dataset.reveal = 'zoom';
  });

  /* Títulos de secciones: fade-up */
  document.querySelectorAll('.section-title, .section-sub').forEach(el => {
    el.classList.add('reveal');
    el.dataset.reveal = 'fade-up';
  });

  /* Category cards: fade-up con delay escalonado */
  document.querySelectorAll('.cat-card').forEach((el, i) => {
    el.classList.add('reveal', `reveal--d${Math.min(i + 1, 5)}`);
    el.dataset.reveal = 'fade-up';
  });

  /* CTA conservación */
  const cta = document.querySelector('.conservation-cta .cta-title');
  const ctaSub = document.querySelector('.conservation-cta .cta-sub');
  const ctaBtn = document.querySelector('.conservation-cta .btn-outline');
  [cta, ctaSub, ctaBtn].forEach((el, i) => {
    if (!el) return;
    el.classList.add('reveal', `reveal--d${i + 1}`);
    el.dataset.reveal = 'fade-up';
  });

  /* ---- SOBRE-NOSOTROS.HTML ---- */

  /* Bloques de amenazas: alternando izquierda/derecha */
  document.querySelectorAll('.amenaza-bloque').forEach((el, i) => {
    el.classList.add('reveal');
    el.dataset.reveal = i % 2 === 0 ? 'fade-left' : 'fade-right';
  });

  /* Ayudar section */
  const ayudarItems = document.querySelectorAll('.ayudar-lista li');
  ayudarItems.forEach((el, i) => {
    el.classList.add('reveal', `reveal--d${Math.min(i + 1, 5)}`);
    el.dataset.reveal = 'fade-up';
  });

  /* Dato cards */
  document.querySelectorAll('.dato-card').forEach((el, i) => {
    el.classList.add('reveal', `reveal--d${i + 1}`);
    el.dataset.reveal = 'zoom';
  });

  /* Vida cards */
  document.querySelectorAll('.vida-card').forEach((el, i) => {
    el.classList.add('reveal', `reveal--d${Math.min(i + 1, 4)}`);
    el.dataset.reveal = 'fade-up';
  });

  /* Formulario */
  const formSection = document.querySelector('.form-section .form-inner');
  if (formSection) {
    formSection.classList.add('reveal');
    formSection.dataset.reveal = 'fade-up';
  }

  /* ---- MAMIFEROS.HTML ---- */

  /* Secciones de contenido */
  document.querySelectorAll('.info-seccion').forEach((el, i) => {
    el.classList.add('reveal');
    el.dataset.reveal = 'fade-up';
  });

  /* Especie cards: escalonadas */
  document.querySelectorAll('.especie-card').forEach((el, i) => {
    el.classList.add('reveal', `reveal--d${Math.min(i + 1, 4)}`);
    el.dataset.reveal = 'fade-up';
  });

  /* Habitat cards */
  document.querySelectorAll('.habitat-card').forEach((el, i) => {
    el.classList.add('reveal', `reveal--d${i + 1}`);
    el.dataset.reveal = 'zoom';
  });

  /* Amenazas items */
  document.querySelectorAll('.amenaza-item').forEach((el, i) => {
    el.classList.add('reveal', `reveal--d${i + 1}`);
    el.dataset.reveal = 'fade-left';
  });

  /* Características grid */
  document.querySelectorAll('.caract-item').forEach((el, i) => {
    el.classList.add('reveal', `reveal--d${Math.min(i + 1, 5)}`);
    el.dataset.reveal = 'fade-up';
  });

  /* Hábito cards */
  document.querySelectorAll('.habito-card').forEach((el, i) => {
    el.classList.add('reveal', `reveal--d${i + 1}`);
    el.dataset.reveal = i === 0 ? 'fade-left' : 'fade-right';
  });

  /* Navegación categorías */
  const catPrev = document.querySelector('.cat-prev');
  const catNext = document.querySelector('.cat-next');
  if (catPrev) { catPrev.classList.add('reveal'); catPrev.dataset.reveal = 'fade-left'; }
  if (catNext) { catNext.classList.add('reveal'); catNext.dataset.reveal = 'fade-right'; }

  /* ---- EXPLORAR.HTML ---- */

  /* Hero de explorar */
  const explorarHero = document.querySelector('.explorar-hero .section-title');
  const explorarSub  = document.querySelector('.explorar-hero .section-sub');
  if (explorarHero) { explorarHero.classList.add('reveal'); explorarHero.dataset.reveal = 'fade-up'; }
  if (explorarSub)  { explorarSub.classList.add('reveal', 'reveal--d1'); explorarSub.dataset.reveal = 'fade-up'; }

  /* ---- FOOTER (todas las páginas) ---- */
  const footerBrand = document.querySelector('.footer-brand');
  const footerNav   = document.querySelector('.footer-nav');
  const footerAbout = document.querySelector('.footer-about');
  if (footerBrand) { footerBrand.classList.add('reveal'); footerBrand.dataset.reveal = 'fade-up'; }
  if (footerNav)   { footerNav.classList.add('reveal', 'reveal--d1'); footerNav.dataset.reveal = 'fade-up'; }
  if (footerAbout) { footerAbout.classList.add('reveal', 'reveal--d2'); footerAbout.dataset.reveal = 'fade-up'; }
}

/* ── IntersectionObserver ─────────────────────────────────── */
function initScrollObserver() {
  /* Respeta la preferencia de "reduce motion" del usuario */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal').forEach(el => {
      el.classList.add('reveal--visible');
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          observer.unobserve(entry.target); /* Animar solo una vez */
        }
      });
    },
    {
      threshold: 0.12,       /* 12% visible para disparar */
      rootMargin: '0px 0px -40px 0px' /* un poco antes del borde */
    }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ── INIT ─────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  setupRevealElements();
  initScrollObserver();
});
