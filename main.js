/* ═══════════════════════════════════════════════════════════
   ARYAN VEX — PORTFOLIO JAVASCRIPT
   File: main.js

   Sections:
   1. Custom Cursor
   2. Loader Animation
   3. Hero Entrance Animation
   4. Scroll Reveal (IntersectionObserver)
   5. Active Navigation Highlight
═══════════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────────
   1. CUSTOM CURSOR
   Smooth magnetic cursor with ring trail effect.
───────────────────────────────────────────── */
(function initCursor() {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');

  let mouseX = 0, mouseY = 0;   // actual mouse position
  let ringX  = 0, ringY  = 0;   // lagged ring position

  /* Track mouse position */
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  /* Animate dot instantly, ring with lag */
  function animateCursor() {
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';

    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  /* Expand ring on interactive elements */
  const interactables = 'a, button, .proj-filter, input, textarea, .social-link';
  document.querySelectorAll(interactables).forEach((el) => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
  });
})();


/* ─────────────────────────────────────────────
   2. LOADER ANIMATION
   Letter-by-letter reveal + progress bar,
   then fades out and triggers hero entrance.
───────────────────────────────────────────── */
(function initLoader() {
  const loaderEl      = document.getElementById('loader');
  const barEl         = document.getElementById('loader-bar');
  const percentEl     = document.getElementById('loader-percent');
  const letterSpans   = document.querySelectorAll('#loader-text span');

  let progress = 0;

  /* Animate letters in one by one */
  letterSpans.forEach((span, i) => {
    setTimeout(() => {
      span.style.transition = 'opacity 0.4s, transform 0.5s cubic-bezier(0.16,1,0.3,1)';
      span.style.opacity    = '1';
      span.style.transform  = 'translateY(0)';
    }, i * 60 + 200);
  });

  /* Fake progress bar */
  const progressInterval = setInterval(() => {
    progress += Math.random() * 8 + 2;

    if (progress >= 100) {
      progress = 100;
      clearInterval(progressInterval);
      setTimeout(hideLoader, 300);
    }

    barEl.style.width         = progress + '%';
    percentEl.textContent     = Math.floor(progress) + '%';
  }, 80);

  /* Fade out loader, show nav, trigger hero */
  function hideLoader() {
    loaderEl.style.transition = 'opacity 0.7s, transform 0.7s';
    loaderEl.style.opacity    = '0';
    loaderEl.style.transform  = 'translateY(-20px)';

    setTimeout(() => {
      loaderEl.style.display = 'none';
      document.getElementById('navbar').classList.add('visible');
      animateHero();
    }, 700);
  }
})();


/* ─────────────────────────────────────────────
   3. HERO ENTRANCE ANIMATION
   Staggered reveal of each hero element after
   the loader finishes. Called by loader.
───────────────────────────────────────────── */
function animateHero() {
  const eyebrow   = document.getElementById('eyebrow');
  const heroName  = document.getElementById('heroName');
  const tagline   = document.getElementById('heroTagline');
  const cta       = document.getElementById('heroCta');
  const scrollHint = document.getElementById('scrollHint');
  const stats     = document.getElementById('heroStats');

  const nameInners = heroName.querySelectorAll('.inner');

  /* Eyebrow line */
  setTimeout(() => {
    eyebrow.style.transition = 'opacity 0.6s, transform 0.6s';
    eyebrow.style.opacity    = '1';
  }, 100);

  /* Name — each line slides up */
  setTimeout(() => {
    heroName.style.opacity = '1';
    nameInners.forEach((el, i) => {
      setTimeout(() => {
        el.style.transition = 'transform 0.8s cubic-bezier(0.16,1,0.3,1)';
        el.style.transform  = 'translateY(0)';
      }, i * 120);
    });
  }, 300);

  /* Tagline */
  setTimeout(() => {
    tagline.style.transition = 'opacity 0.7s, transform 0.7s';
    tagline.style.opacity    = '1';
    tagline.style.transform  = 'translateY(0)';
  }, 700);

  /* CTA buttons */
  setTimeout(() => {
    cta.style.transition = 'opacity 0.7s';
    cta.style.opacity    = '1';
  }, 950);

  /* Stats */
  setTimeout(() => {
    stats.style.transition = 'opacity 0.7s';
    stats.style.opacity    = '1';
  }, 1100);

  /* Scroll hint */
  setTimeout(() => {
    scrollHint.style.transition = 'opacity 0.7s';
    scrollHint.style.opacity    = '0.6';
  }, 1200);
}


/* ─────────────────────────────────────────────
   4. SCROLL REVEAL
   Elements with class "reveal" animate in when
   they enter the viewport via IntersectionObserver.
───────────────────────────────────────────── */
(function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
})();


/* ─────────────────────────────────────────────
   5. ACTIVE NAVIGATION HIGHLIGHT
   Updates nav link colour based on which section
   is currently in view as the user scrolls.
───────────────────────────────────────────── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let currentSectionId = '';

    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 200) {
        currentSectionId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === '#' + currentSectionId;
      link.style.color = isActive ? 'var(--accent)' : '';
    });
  });
})();



/* ─── FLOATING PARTICLES ─── */
(function initParticles() {
  const hero = document.getElementById('hero');
  const colors = ['rgba(0,229,255,0.6)', 'rgba(255,107,53,0.5)', 'rgba(168,255,62,0.5)'];

  for (let i = 0; i < 24; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 3 + 1;
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      animation-duration: ${Math.random() * 15 + 10}s;
      animation-delay: ${Math.random() * -20}s;
      box-shadow: 0 0 ${size * 3}px ${colors[Math.floor(Math.random() * colors.length)]};
    `;
    hero.appendChild(p);
  }
})();