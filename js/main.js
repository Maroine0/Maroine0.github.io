/* ============================================================
   MAIN — interactions du portfolio
   (header au scroll, rotation des rôles, marquee,
    divider Pac-Man, révélation des sections)
   ============================================================ */

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---- Nav : fond au scroll ---- */
const headerEl = document.getElementById('site-header');
const onScrollHeader = () => headerEl.classList.toggle('scrolled', window.scrollY > 24);
window.addEventListener('scroll', onScrollHeader, {passive:true});
onScrollHeader();

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
const NB_DOTS = 36;
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
