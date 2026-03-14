/* ═══════════════════════════════════════════════════════
   Akash Bridal Mehandi — Main JavaScript
   File: js/main.js
═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── Hamburger / Mobile Drawer Toggle ──────────────── */
  const hamburger   = document.getElementById('hamburger');
  const drawer      = document.getElementById('mobileDrawer');

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    drawer.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    drawer.setAttribute('aria-hidden', !isOpen);
  });

  // Close drawer when a link/button inside is clicked
  drawer.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('click', () => {
      hamburger.classList.remove('open');
      drawer.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
      drawer.setAttribute('aria-hidden', true);
    });
  });

  /* ─── Book Now: scroll to CTA ───────────────────────── */
  const bookNowBtn = document.getElementById('bookNowBtn');
  if (bookNowBtn) {
    bookNowBtn.addEventListener('click', () => {
      const ctaBtn = document.getElementById('ctaBtn');
      if (ctaBtn) ctaBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  /* ─── Gallery Cards: scroll reveal animation ────────── */
  const cards = document.querySelectorAll('.gallery-card');

  cards.forEach(card => {
    card.style.opacity   = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = (i * 0.12) + 's';
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  cards.forEach(card => revealObserver.observe(card));

  /* ─── Service Cards: staggered scroll reveal ─────── */
  const svcCards = document.querySelectorAll('.svc-card');

  const svcObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx   = parseInt(entry.target.dataset.index ?? '0', 10);
        const delay = (idx % 4) * 0.1; // stagger within each row
        entry.target.style.transitionDelay = delay + 's';
        entry.target.classList.add('visible');
        svcObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  svcCards.forEach(card => svcObserver.observe(card));

  /* ─── Why Choose Cards: staggered scroll reveal ─────── */
  const wcCards = document.querySelectorAll('.wc-card');

  const wcObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx   = parseInt(entry.target.dataset.wcIndex ?? '0', 10);
        const col   = idx % 3;
        const row   = Math.floor(idx / 3);
        const delay = row * 0.12 + col * 0.1;
        entry.target.style.transitionDelay = delay + 's';
        entry.target.classList.add('wc-visible');
        wcObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  wcCards.forEach(card => wcObserver.observe(card));

  /* ─── Particle Canvas — Golden Bokeh ────────────────── */
  const canvas  = document.getElementById('wcParticlesCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, particles = [], animId;

    const COLORS = [
      'rgba(229,180,91,',
      'rgba(197,138,44,',
      'rgba(240,208,128,',
      'rgba(245,230,211,',
    ];

    function resize() {
      const section = canvas.closest('.whychoose-section');
      W = canvas.width  = section.offsetWidth;
      H = canvas.height = section.offsetHeight;
    }

    function makeParticle() {
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      return {
        x:     Math.random() * W,
        y:     H + Math.random() * 60,
        r:     Math.random() * 3 + 0.8,
        speed: Math.random() * 0.5 + 0.2,
        drift: (Math.random() - 0.5) * 0.35,
        alpha: Math.random() * 0.55 + 0.15,
        fade:  Math.random() * 0.003 + 0.0015,
        color,
      };
    }

    function init() {
      resize();
      particles = [];
      const count = Math.min(Math.floor(W / 14), 80);
      for (let i = 0; i < count; i++) {
        const p = makeParticle();
        p.y = Math.random() * H; // spread on load
        particles.push(p);
      }
    }

    function tick() {
      ctx.clearRect(0, 0, W, H);

      particles.forEach((p, i) => {
        p.y     -= p.speed;
        p.x     += p.drift;
        p.alpha -= p.fade;

        if (p.alpha <= 0 || p.y < -10) {
          particles[i] = makeParticle();
          return;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.alpha + ')';
        ctx.fill();

        // Extra sparkle ring on larger particles
        if (p.r > 2.5) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 2, 0, Math.PI * 2);
          ctx.strokeStyle = p.color + (p.alpha * 0.25) + ')';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });

      animId = requestAnimationFrame(tick);
    }

    // Pause when section is not visible (perf)
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          if (!animId) tick();
        } else {
          cancelAnimationFrame(animId);
          animId = null;
        }
      });
    }, { threshold: 0.01 });

    const wcSection = document.getElementById('why-choose');
    if (wcSection) sectionObserver.observe(wcSection);

    init();
    window.addEventListener('resize', () => {
      cancelAnimationFrame(animId);
      animId = null;
      init();
      tick();
    });
  }

  /* ─── Active Nav Link Highlight ─────────────────────── */
  const navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      document.querySelectorAll('.nav-menu li').forEach(li => li.classList.remove('active'));
      this.closest('li')?.classList.add('active');
    });
  });

  /* ─── TG: Testimonial Cards Scroll Reveal ───────────── */
  const tgCards = document.querySelectorAll('.tg-card');

  const tgCardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx   = parseInt(entry.target.dataset.tgIndex ?? '0', 10);
        const delay = idx * 0.15;
        entry.target.style.transitionDelay = delay + 's';
        entry.target.classList.add('tg-visible');
        tgCardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  tgCards.forEach(card => tgCardObserver.observe(card));

  /* ─── TG: Gallery Items Scroll Reveal ──────────────── */
  const tgGalleryItems = document.querySelectorAll('.tg-gallery-item');

  const tgGiObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx   = parseInt(entry.target.dataset.tgGi ?? '0', 10);
        const col   = idx % 4;
        const row   = Math.floor(idx / 4);
        const delay = row * 0.1 + col * 0.08;
        entry.target.style.transitionDelay = delay + 's';
        entry.target.classList.add('tg-gi-visible');
        tgGiObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06 });

  tgGalleryItems.forEach(item => tgGiObserver.observe(item));

  /* ─── TG: Particle Canvas — Golden Bokeh ──────────── */
  const tgCanvas = document.getElementById('tgParticlesCanvas');
  if (tgCanvas) {
    const tgCtx = tgCanvas.getContext('2d');
    let tgW, tgH, tgParticles = [], tgAnimId;

    const TG_COLORS = [
      'rgba(229,180,91,',
      'rgba(197,138,44,',
      'rgba(240,208,128,',
      'rgba(245,230,200,',
    ];

    function tgResize() {
      const sec = tgCanvas.closest('.tg-section');
      tgW = tgCanvas.width  = sec.offsetWidth;
      tgH = tgCanvas.height = sec.offsetHeight;
    }

    function tgMakeParticle() {
      const c = TG_COLORS[Math.floor(Math.random() * TG_COLORS.length)];
      return {
        x: Math.random() * tgW,
        y: tgH + Math.random() * 50,
        r: Math.random() * 2.8 + 0.7,
        speed: Math.random() * 0.45 + 0.18,
        drift: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.5 + 0.12,
        fade:  Math.random() * 0.003 + 0.0012,
        color: c,
      };
    }

    function tgInit() {
      tgResize();
      tgParticles = [];
      const count = Math.min(Math.floor(tgW / 14), 80);
      for (let i = 0; i < count; i++) {
        const p = tgMakeParticle();
        p.y = Math.random() * tgH;
        tgParticles.push(p);
      }
    }

    function tgTick() {
      tgCtx.clearRect(0, 0, tgW, tgH);
      tgParticles.forEach((p, i) => {
        p.y -= p.speed;
        p.x += p.drift;
        p.alpha -= p.fade;
        if (p.alpha <= 0 || p.y < -10) { tgParticles[i] = tgMakeParticle(); return; }
        tgCtx.beginPath();
        tgCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        tgCtx.fillStyle = p.color + p.alpha + ')';
        tgCtx.fill();
        if (p.r > 2.2) {
          tgCtx.beginPath();
          tgCtx.arc(p.x, p.y, p.r * 2, 0, Math.PI * 2);
          tgCtx.strokeStyle = p.color + (p.alpha * 0.22) + ')';
          tgCtx.lineWidth = 0.5;
          tgCtx.stroke();
        }
      });
      tgAnimId = requestAnimationFrame(tgTick);
    }

    const tgSectionObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { if (!tgAnimId) tgTick(); }
        else { cancelAnimationFrame(tgAnimId); tgAnimId = null; }
      });
    }, { threshold: 0.01 });

    const tgSec = document.getElementById('testimonials');
    if (tgSec) tgSectionObs.observe(tgSec);

    tgInit();
    window.addEventListener('resize', () => {
      cancelAnimationFrame(tgAnimId);
      tgAnimId = null;
      tgInit();
      tgTick();
    });
  }

  /* ─── View More Button ────────────────────────────── */
  const viewMoreBtn = document.getElementById('viewMoreBtn');
  if (viewMoreBtn) {
    viewMoreBtn.addEventListener('click', () => {
      viewMoreBtn.textContent = 'Coming Soon!';
      viewMoreBtn.style.opacity = '0.7';
      setTimeout(() => {
        viewMoreBtn.innerHTML = '<span>View More</span>';
        viewMoreBtn.style.opacity = '1';
      }, 2000);
    });
  }

  /* ─── SM: Portrait Reveal ───────────────────────── */
  const smPortrait = document.querySelector('.sm-portrait-img');
  if (smPortrait) {
    const smPortraitObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('sm-visible');
          smPortraitObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    smPortraitObs.observe(smPortrait);
  }

  /* ─── SM: Social Cards Reveal ───────────────────── */
  const smCards = document.querySelectorAll('.sm-card');

  const smCardObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx   = Array.from(smCards).indexOf(entry.target);
        const delay = idx * 0.15;
        entry.target.style.transitionDelay = delay + 's';
        entry.target.classList.add('sm-card-visible');
        smCardObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  smCards.forEach(card => smCardObs.observe(card));

  /* ─── SM: Particle Canvas ───────────────────────── */
  const smCanvas = document.getElementById('smParticlesCanvas');
  if (smCanvas) {
    const smCtx = smCanvas.getContext('2d');
    let smW, smH, smParticles = [], smAnimId;

    const SM_COLORS = [
      'rgba(229,180,91,',
      'rgba(197,138,44,',
      'rgba(244,196,104,',
      'rgba(245,225,180,',
    ];

    function smResize() {
      const sec = smCanvas.closest('.sm-section');
      smW = smCanvas.width  = sec.offsetWidth;
      smH = smCanvas.height = sec.offsetHeight;
    }

    function smMakeP() {
      const c = SM_COLORS[Math.floor(Math.random() * SM_COLORS.length)];
      return {
        x: Math.random() * smW,
        y: smH + Math.random() * 50,
        r: Math.random() * 3 + 0.6,
        speed: Math.random() * 0.5 + 0.18,
        drift: (Math.random() - 0.5) * 0.32,
        alpha: Math.random() * 0.55 + 0.12,
        fade:  Math.random() * 0.003 + 0.0012,
        color: c,
      };
    }

    function smInit() {
      smResize();
      smParticles = [];
      const count = Math.min(Math.floor(smW / 12), 90);
      for (let i = 0; i < count; i++) {
        const p = smMakeP();
        p.y = Math.random() * smH;
        smParticles.push(p);
      }
    }

    function smTick() {
      smCtx.clearRect(0, 0, smW, smH);
      smParticles.forEach((p, i) => {
        p.y -= p.speed;
        p.x += p.drift;
        p.alpha -= p.fade;
        if (p.alpha <= 0 || p.y < -10) { smParticles[i] = smMakeP(); return; }
        smCtx.beginPath();
        smCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        smCtx.fillStyle = p.color + p.alpha + ')';
        smCtx.fill();
        if (p.r > 2) {
          smCtx.beginPath();
          smCtx.arc(p.x, p.y, p.r * 2.2, 0, Math.PI * 2);
          smCtx.strokeStyle = p.color + (p.alpha * 0.2) + ')';
          smCtx.lineWidth = 0.5;
          smCtx.stroke();
        }
      });
      smAnimId = requestAnimationFrame(smTick);
    }

    const smSecObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { if (!smAnimId) smTick(); }
        else { cancelAnimationFrame(smAnimId); smAnimId = null; }
      });
    }, { threshold: 0.01 });

    const smSec = document.getElementById('social');
    if (smSec) smSecObs.observe(smSec);

    smInit();
    window.addEventListener('resize', () => {
      cancelAnimationFrame(smAnimId);
      smAnimId = null;
      smInit();
      smTick();
    });
  }

  /* ─── Footer: Scroll Fade + Social Hover State ───────────────────────── */
  const royalFooter = document.getElementById('royalFooter');
  if (royalFooter) {
    const footerFadeTarget = royalFooter.querySelector('.footer-fade-target');
    if (footerFadeTarget && 'IntersectionObserver' in window) {
      const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            footerFadeTarget.classList.add('is-visible');
            footerObserver.disconnect();
          }
        });
      }, {
        root: null,
        threshold: 0.2,
        rootMargin: '0px 0px -12% 0px'
      });

      footerObserver.observe(royalFooter);
    } else if (footerFadeTarget) {
      footerFadeTarget.classList.add('is-visible');
    }

    const footerSocialLinks = royalFooter.querySelectorAll('.footer-social-link');
    footerSocialLinks.forEach((link) => {
      link.addEventListener('mouseenter', () => link.classList.add('is-active'));
      link.addEventListener('mouseleave', () => link.classList.remove('is-active'));
      link.addEventListener('focus', () => link.classList.add('is-active'));
      link.addEventListener('blur', () => link.classList.remove('is-active'));
    });
  }

});
