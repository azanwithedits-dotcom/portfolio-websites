/* =========================================================================
   EDITS WITH AZAN — SCRIPT
   1. Navbar background on scroll
   2. Mobile hamburger menu
   3. Fade-in-on-scroll (IntersectionObserver)
   4. Portfolio lightbox
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. Navbar background on scroll ---------- */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('is-scrolled', window.scrollY > 20);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- 2. Mobile hamburger menu ---------- */
  const navToggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');

  const closeMobileNav = () => {
    mobileNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
  };

  navToggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  // Close mobile menu whenever a link is tapped
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  /* ---------- 3. Fade-in-on-scroll ---------- */
  const revealTargets = document.querySelectorAll('.fade-in, .fade-in-up');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealTargets.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback: just show everything
    revealTargets.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- 4. Portfolio lightbox ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxClose = document.getElementById('lightboxClose');
  const portfolioItems = document.querySelectorAll('.portfolio__item');

  let lastFocusedEl = null;

  function openLightbox(item) {
    const img = item.querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxTitle.textContent = item.dataset.title || '';
    lightboxDesc.textContent = item.dataset.desc || '';

    lastFocusedEl = document.activeElement;
    lightbox.hidden = false;
    // allow the browser to paint before transitioning
    requestAnimationFrame(() => lightbox.classList.add('is-open'));
    document.body.style.overflow = 'hidden';
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(() => { lightbox.hidden = true; }, 250);
    if (lastFocusedEl) lastFocusedEl.focus();
  }

  portfolioItems.forEach(item => {
    item.addEventListener('click', () => openLightbox(item));
  });

  lightboxClose.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightbox.hidden) closeLightbox();
  });

});
