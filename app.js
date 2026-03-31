/* ============================================================
   app.js — SPA router + animated canvas + cursor + reveal
   ============================================================ */

// ── CANVAS BACKGROUND ──────────────────────────────────────
(function initCanvas() {
  const canvas = document.getElementById('bgCanvas');
  const ctx = canvas.getContext('2d');

  let W, H, particles = [], mouse = { x: -999, y: -999 };
  const COUNT = 90;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function randomBetween(a, b) { return a + Math.random() * (b - a); }

  class Particle {
    constructor() { this.reset(true); }
    reset(initial) {
      this.x  = randomBetween(0, W);
      this.y  = initial ? randomBetween(0, H) : H + 10;
      this.vx = randomBetween(-0.08, 0.08);
      this.vy = randomBetween(-0.4, -0.12);
      this.size   = randomBetween(1, 2.2);
      this.alpha  = randomBetween(0.04, 0.22);
      this.life   = 0;
      this.maxLife = randomBetween(300, 700);
      // warm gold / cold blue occasionally
      const warm = Math.random() > 0.3;
      this.r = warm ? randomBetween(180, 220) : randomBetween(60, 90);
      this.g = warm ? randomBetween(130, 160) : randomBetween(70, 110);
      this.b = warm ? randomBetween(30, 60)   : randomBetween(140, 200);
    }
    step() {
      this.life++;
      // mouse repulsion
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const d  = Math.sqrt(dx*dx + dy*dy);
      if (d < 120) {
        const f = (120 - d) / 120 * 0.012;
        this.vx += (dx / d) * f;
        this.vy += (dy / d) * f;
      }
      // damping
      this.vx *= 0.98;
      this.vy *= 0.98;
      this.x += this.vx;
      this.y += this.vy;

      // fade in / fade out
      const t = this.life / this.maxLife;
      const fade = t < 0.1 ? t / 0.1 : t > 0.8 ? (1 - t) / 0.2 : 1;
      this.currentAlpha = this.alpha * fade;

      if (this.life > this.maxLife || this.y < -20) this.reset(false);
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.r},${this.g},${this.b},${this.currentAlpha})`;
      ctx.fill();
    }
  }

  // Flowing lines between near particles
  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.sqrt(dx*dx + dy*dy);
        if (d < 110) {
          const a = (1 - d / 110) * 0.05;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(196,146,42,${a})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  // Large slow-drifting gradient orbs
  let orbAngle = 0;
  function drawOrbs() {
    orbAngle += 0.002;
    const orbs = [
      { x: W * 0.15 + Math.sin(orbAngle * 0.7) * W * 0.08,
        y: H * 0.3  + Math.cos(orbAngle * 0.5) * H * 0.1,
        r: W * 0.28, c1: 'rgba(196,146,42,0.04)', c2: 'transparent' },
      { x: W * 0.8  + Math.cos(orbAngle * 0.6) * W * 0.06,
        y: H * 0.6  + Math.sin(orbAngle * 0.8) * H * 0.08,
        r: W * 0.22, c1: 'rgba(80,100,180,0.04)', c2: 'transparent' },
      { x: W * 0.5  + Math.sin(orbAngle * 0.4) * W * 0.1,
        y: H * 0.85 + Math.cos(orbAngle * 0.9) * H * 0.05,
        r: W * 0.18, c1: 'rgba(196,146,42,0.025)', c2: 'transparent' },
    ];
    orbs.forEach(o => {
      const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
      g.addColorStop(0, o.c1);
      g.addColorStop(1, o.c2);
      ctx.beginPath();
      ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
    });
  }

  // Slow horizontal scan line
  let scanY = 0;
  function drawScanline() {
    scanY = (scanY + 0.3) % H;
    const g = ctx.createLinearGradient(0, scanY - 60, 0, scanY + 60);
    g.addColorStop(0, 'transparent');
    g.addColorStop(0.5, 'rgba(196,146,42,0.018)');
    g.addColorStop(1, 'transparent');
    ctx.fillStyle = g;
    ctx.fillRect(0, scanY - 60, W, 120);
  }

  function frame() {
    ctx.clearRect(0, 0, W, H);
    drawOrbs();
    drawScanline();
    drawConnections();
    particles.forEach(p => { p.step(); p.draw(); });
    requestAnimationFrame(frame);
  }

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

  resize();
  for (let i = 0; i < COUNT; i++) particles.push(new Particle());
  frame();
})();

// ── CUSTOM CURSOR ──────────────────────────────────────────
(function initCursor() {
  const ring = document.getElementById('cursorRing');
  const dot  = document.getElementById('cursorDot');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  (function animRing() {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  })();

  const hoverable = () => document.querySelectorAll('a,button,.proj-card,.pnav-btn');
  function bindHover() {
    hoverable().forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('hovered'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('hovered'));
    });
  }
  bindHover();
  // re-bind after DOM changes
  window.addEventListener('portfolioRendered', bindHover);
})();

// ── SCROLL REVEAL ──────────────────────────────────────────
function initReveal() {
  const check = () => {
    document.querySelectorAll('.reveal').forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9)
        el.classList.add('visible');
    });
  };
  window.addEventListener('scroll', check, { passive: true });
  check();
}

// ── SCROLL HELPERS ─────────────────────────────────────────
function scrollTo(id, e) {
  if (e) e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}
function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

// ── SPA STATE ──────────────────────────────────────────────
let currentProjectId = null;

// ── RENDER HOME ────────────────────────────────────────────
function renderHome() {
  // meta from ABOUT
  const A = ABOUT;
  document.getElementById('hdrName').textContent  = A.nameDisplay || A.name;
  document.getElementById('heroProgram').textContent = A.program;
  document.getElementById('heroCount').textContent =
    String(PROJECTS.length).padStart(2, '0');
  document.getElementById('footerName').textContent = `© 2027 ${A.name}`;

  // about section
  document.getElementById('capName').textContent    = (A.nameDisplay || A.name);
  document.getElementById('capProgram').textContent = A.program;
  document.getElementById('aboutLead').textContent  = A.lead;

  const bioEl = document.getElementById('aboutBio');
  bioEl.innerHTML = A.bio.map(p => `<p>${p}</p>`).join('');

  const toolsEl = document.getElementById('toolsList');
  toolsEl.innerHTML = A.tools.map(t => `<span>${t}</span>`).join('');

  if (A.photo) {
    document.getElementById('photoWrap').innerHTML =
      `<img src="${A.photo}" alt="${A.name}">`;
  }

  // contact
  const emailEl = document.getElementById('contactEmail');
  emailEl.href = `mailto:${A.email}`;
  emailEl.textContent = A.email;

  const links = [];
  if (A.github)    links.push(`<a href="${A.github}" target="_blank">GitHub ↗</a>`);
  if (A.instagram) links.push(`<a href="${A.instagram}" target="_blank">Instagram ↗</a>`);
  if (A.linkedin)  links.push(`<a href="${A.linkedin}" target="_blank">LinkedIn ↗</a>`);
  if (A.arena)     links.push(`<a href="${A.arena}" target="_blank">Are.na ↗</a>`);
  document.getElementById('contactLinks').innerHTML = links.join('');

  // project list
  const list = document.getElementById('projectList');
  list.innerHTML = PROJECTS.map((p, i) => {
    const num   = String(i + 1).padStart(3, '0');
    const thumb = p.coverImg
      ? `background-image:url('${p.coverImg}'); background-size:cover; background-position:center;`
      : `background:${p.coverColor || '#1c1a16'};`;
    return `
      <a class="proj-card reveal" onclick="openProject('${p.id}',event)" href="#${p.id}">
        <span class="pc-num">${num}</span>
        <div class="pc-main">
          <div class="pc-title">${p.title}</div>
          <div class="pc-cat">${p.category} &nbsp;·&nbsp; ${p.year}</div>
          <div class="pc-desc">${p.shortDesc}</div>
        </div>
        <div class="pc-thumb">
          <div class="pc-thumb-inner" style="${thumb}"></div>
        </div>
        <span class="pc-arrow">View →</span>
      </a>`;
  }).join('');

  window.dispatchEvent(new Event('portfolioRendered'));
  initReveal();
}

// ── OPEN PROJECT ───────────────────────────────────────────
function openProject(id, e) {
  if (e) e.preventDefault();
  const p   = PROJECTS.find(x => x.id === id);
  if (!p) return;
  currentProjectId = id;

  // fill project page
  const idx = PROJECTS.indexOf(p);
  document.getElementById('projHdrName').textContent = ABOUT.nameDisplay || ABOUT.name;
  document.getElementById('pNum').textContent      = String(idx + 1).padStart(3, '0');
  document.getElementById('pCategory').textContent = p.category;
  document.getElementById('pYear').textContent     = p.year;
  document.getElementById('pTitle').textContent    = p.title;

  // cover
  const coverEl = document.getElementById('pCover');
  if (p.coverImg) {
    coverEl.innerHTML =
      `<img class="proj-cover-img" src="${p.coverImg}" alt="${p.title}">`;
  } else {
    coverEl.innerHTML =
      `<div class="proj-cover-color" style="background:${p.coverColor || '#1c1a16'}"></div>`;
  }

  // sidebar
  document.getElementById('siMedium').textContent = p.medium || '—';
  document.getElementById('siYear').textContent   = p.year   || '—';
  document.getElementById('siRole').textContent   = p.role   || '—';

  // external links
  const extLinks = [];
  if (p.link)   extLinks.push(`<a href="${p.link}" target="_blank">View Project ↗</a>`);
  if (p.github) extLinks.push(`<a href="${p.github}" target="_blank">Source Code ↗</a>`);
  document.getElementById('projExtLinks').innerHTML = extLinks.join('');

  // full description (support newlines → paragraphs)
  const fullDescEl = document.getElementById('pFullDesc');
  fullDescEl.innerHTML = p.fullDesc
    .split(/\n\n+/)
    .map(para => `<p>${para.trim()}</p>`)
    .join('');

  // details
  const detailsBlock = document.getElementById('pDetailsBlock');
  const detailsList  = document.getElementById('pDetailsList');
  if (p.details && p.details.length) {
    detailsList.innerHTML = p.details.map(d => `<li>${d}</li>`).join('');
    detailsBlock.style.display = '';
  } else {
    detailsBlock.style.display = 'none';
  }

  // gallery
  const imagesBlock = document.getElementById('pImagesBlock');
  const gallery     = document.getElementById('pGallery');
  if (p.images && p.images.length) {
    gallery.innerHTML = p.images.map(src =>
      `<img src="${src}" alt="${p.title}" loading="lazy">`
    ).join('');
    imagesBlock.style.display = '';
  } else {
    imagesBlock.style.display = 'none';
  }

  // prev / next
  const prevBtn   = document.getElementById('prevBtn');
  const nextBtn   = document.getElementById('nextBtn');
  const prevTitle = document.getElementById('prevTitle');
  const nextTitle = document.getElementById('nextTitle');

  if (idx > 0) {
    prevBtn.style.display = '';
    prevTitle.textContent = PROJECTS[idx - 1].title;
  } else {
    prevBtn.style.display = 'none';
  }
  if (idx < PROJECTS.length - 1) {
    nextBtn.style.display = '';
    nextTitle.textContent = PROJECTS[idx + 1].title;
  } else {
    nextBtn.style.display = 'none';
  }

  // transition pages
  switchPage('pageProject');
  window.location.hash = id;
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  window.dispatchEvent(new Event('portfolioRendered'));
}

// ── NAVIGATE PREV / NEXT ───────────────────────────────────
function shiftProject(dir) {
  const idx = PROJECTS.findIndex(x => x.id === currentProjectId);
  const next = PROJECTS[idx + dir];
  if (next) openProject(next.id);
}

// ── GO HOME ────────────────────────────────────────────────
function goHome(e) {
  if (e) e.preventDefault();
  switchPage('pageHome');
  history.pushState('', document.title, window.location.pathname);
  window.scrollTo({ top: 0, behavior: 'instant' });
  initReveal();
}

// ── PAGE SWITCH ────────────────────────────────────────────
function switchPage(targetId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(targetId).classList.add('active');
}

// ── HASH ROUTING ───────────────────────────────────────────
function handleHash() {
  const hash = window.location.hash.slice(1);
  if (hash) {
    const p = PROJECTS.find(x => x.id === hash);
    if (p) { openProject(p.id); return; }
  }
  switchPage('pageHome');
}

// ── INIT ───────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderHome();
  handleHash();
});
window.addEventListener('popstate', handleHash);
