// ── Scroll reveal ─────────────────────────────────────────
document.body.classList.add('js-loaded');

const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--accent)' : '';
  });
});

// ── Tradução PT / EN ───────────────────────────────────────
let currentLang = 'pt';

function applyLang(lang) {
  currentLang = lang;

  document.querySelectorAll('[data-pt][data-en]').forEach(el => {
    const text = lang === 'en' ? el.dataset.en : el.dataset.pt;
    el.innerHTML = text;
  });

  document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR';
  document.title = lang === 'en'
    ? 'Adanlyn Silva — Fullstack Developer'
    : 'Adanlyn Silva — Fullstack Developer';

  document.getElementById('langPT').classList.toggle('active', lang === 'pt');
  document.getElementById('langEN').classList.toggle('active', lang === 'en');

  // Salva preferência
  localStorage.setItem('lang', lang);
}

document.getElementById('langToggle').addEventListener('click', () => {
  applyLang(currentLang === 'pt' ? 'en' : 'pt');
});

const saved = localStorage.getItem('lang');
const browserLang = navigator.language?.startsWith('pt') ? 'pt' : 'en';
applyLang(saved || browserLang);