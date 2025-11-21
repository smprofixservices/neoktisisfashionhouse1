// main.js - mobile menu, reveal on scroll, contact form light handling, year stamp

document.addEventListener('DOMContentLoaded', () => {
  // year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // mobile menu toggle (safe: toggle button is outside the nav)
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');
  const overlay = document.getElementById('overlay');

  function openMenu() {
    mobileMenu.classList.add('active');
    overlay.classList.add('active');
    mobileMenu.setAttribute('aria-hidden','false');
    overlay.hidden = false;
  }
  function closeMenu() {
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
    mobileMenu.setAttribute('aria-hidden','true');
    overlay.hidden = true;
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);

  // Smooth reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        // optionally unobserve to prevent repeat
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(r => observer.observe(r));

  // Light contact form handler (client-only)
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  if (contactForm) {
    const send = document.getElementById('send');
    send.addEventListener('click', () => {
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();
      if (!name || !email || !subject || !message) {
        formStatus.textContent = 'Please complete all required fields.';
        formStatus.style.color = 'crimson';
        return;
      }
      // fallback: open mailto with prefilled content
      const mailto = `mailto:neoktisis001@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent('Name: '+name+'\nEmail: '+email+'\n\n'+message)}`;
      window.location.href = mailto;
      formStatus.textContent = 'Opening your email client...';
      formStatus.style.color = 'green';
    });
  }

  // Add small keyboard accessibility: close menu on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

});
