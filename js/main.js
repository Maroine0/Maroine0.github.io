/* ============================================================
   MAIN — interactions du portfolio
   (header au scroll, rotation des rôles, marquee,
    divider Pac-Man, révélation des sections)
   ============================================================ */

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---- Thème clair / sombre ----
   Le thème initial est appliqué par le script inline du <head> (anti-flash). */
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  localStorage.setItem('theme', next);
});
/* Suit le thème système tant que l'utilisateur n'a pas choisi manuellement */
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if (!localStorage.getItem('theme')) {
    document.documentElement.dataset.theme = e.matches ? 'dark' : 'light';
  }
});

/* ---- Nav : fond au scroll ---- */
const headerEl = document.getElementById('site-header');
const onScrollHeader = () => headerEl.classList.toggle('scrolled', window.scrollY > 24);
window.addEventListener('scroll', onScrollHeader, {passive:true});
onScrollHeader();

/* ---- Menu mobile (burger) ---- */
const burger = document.getElementById('navBurger');
function setNavOpen(open){
  document.body.classList.toggle('nav-open', open);
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
}
burger.addEventListener('click', () => setNavOpen(!document.body.classList.contains('nav-open')));
/* Fermeture au clic sur un lien, à l'Échap, ou si on repasse en desktop */
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => setNavOpen(false)));
window.addEventListener('keydown', e => { if (e.key === 'Escape') setNavOpen(false); });
window.matchMedia('(min-width: 721px)').addEventListener('change', e => { if (e.matches) setNavOpen(false); });

/* ---- Rotation des rôles ---- */
const roles = ["science des données", "développement web", "jeux vidéo (en C !)"];
const swap = document.getElementById('roleSwap');
if (!reduced) {
  let i = 0;
  setInterval(() => {
    swap.classList.add('out');
    setTimeout(() => {
      i = (i + 1) % roles.length;
      swap.textContent = roles[i];
      swap.classList.remove('out');
    }, 300);
  }, 2800);
}

/* ---- Marquee : duplication de la piste pour la boucle infinie ---- */
const track = document.getElementById('marqueeTrack');
track.innerHTML += track.innerHTML;

/* ---- Signature : le carré bleu mange les carrés jaunes au scroll ---- */
const pacTrack = document.getElementById('pacTrack');
const muncher = document.getElementById('muncher');
/* 36 points sur desktop, moins sur mobile pour garder l'espacement */
const NB_DOTS = Math.max(10, Math.min(36, Math.floor(pacTrack.clientWidth / 24)));
for (let d = 0; d < NB_DOTS; d++) {
  const s = document.createElement('div');
  s.className = 'pdot';
  pacTrack.appendChild(s);
}
const dots = pacTrack.querySelectorAll('.pdot');

function updateMuncher(){
  const r = pacTrack.getBoundingClientRect();
  const vh = window.innerHeight;
  /* progression : 0 quand la piste entre en bas de l'écran, 1 quand elle atteint 20% du haut */
  let prog = (vh - r.top) / (vh * 0.8);
  prog = Math.max(0, Math.min(1, prog));
  muncher.style.left = (prog * 100) + '%';
  dots.forEach((dot, idx) => {
    dot.classList.toggle('eaten', idx / NB_DOTS < prog);
  });
}
if (!reduced) {
  window.addEventListener('scroll', updateMuncher, {passive:true});
  window.addEventListener('resize', updateMuncher);
  updateMuncher();
} else {
  muncher.style.left = '100%';
  dots.forEach(d => d.classList.add('eaten'));
}

/* ---- Révélation des sections ---- */
const reveals = document.querySelectorAll('.reveal');
if (!reduced && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(es => {
    es.forEach(e => { if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, {threshold:.1});
  reveals.forEach(el => io.observe(el));
} else {
  reveals.forEach(el => el.classList.add('in'));
}
