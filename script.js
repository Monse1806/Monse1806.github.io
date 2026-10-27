// Menú adaptable a celulares
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  menuToggle.innerHTML = isOpen
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

// Cerrar el menú al elegir una sección
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});

// Texto animado de la portada
const phrases = [
  "Aprendiendo desarrollo de software",
  "Practicando Java y JavaScript",
  "Explorando bases de datos",
  "Creando proyectos paso a paso"
];
const typingText = document.getElementById("typingText");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reducedMotion) {
  typingText.textContent = phrases[0];
} else {
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeEffect() {
    const phrase = phrases[phraseIndex];
    typingText.textContent = phrase.substring(0, charIndex);

    if (!deleting && charIndex < phrase.length) {
      charIndex++;
      setTimeout(typeEffect, 65);
    } else if (!deleting) {
      deleting = true;
      setTimeout(typeEffect, 1500);
    } else if (charIndex > 0) {
      charIndex--;
      setTimeout(typeEffect, 30);
    } else {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typeEffect, 300);
    }
  }
  typeEffect();
}

// Aparición progresiva de elementos
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && !reducedMotion) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(element => observer.observe(element));
} else {
  revealElements.forEach(element => element.classList.add("visible"));
}

// Resaltar el enlace de la sección visible
const sections = document.querySelectorAll("main section[id]");
const navItems = navLinks.querySelectorAll("a");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navItems.forEach(link => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + entry.target.id
          );
        });
      }
    });
  }, { rootMargin: "-30% 0px -60% 0px" });

  sections.forEach(section => sectionObserver.observe(section));
}

// Año automático
document.getElementById("year").textContent = new Date().getFullYear();
