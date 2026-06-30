  /* Sticky nav shadow */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  /* Mobile menu */
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu   = document.getElementById('mobileMenu');
  const mobileClose  = document.getElementById('mobileClose');

  hamburgerBtn.addEventListener('click', () => mobileMenu.classList.add('open'));
  mobileClose.addEventListener('click',  () => mobileMenu.classList.remove('open'));
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });

  /* Scroll-reveal */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* Active nav link highlight on scroll */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute('id');
    });
    navAnchors.forEach(a => {
      a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--gold-400)' : '';
    });
  });

  /* Typing cursor effect on hero title */
  const titleEl = document.querySelector('.hero-title');
  const roles = [
    'Data Scientist',
    'MLOps Practitioner',
    'Backend API Developer',
    'Python Enthusiast'
  ];
  let roleIdx = 0, charIdx = 0, deleting = false;
  function typeRole() {
    const currentRole = roles[roleIdx];
    if (!deleting) {
      titleEl.textContent = currentRole.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === currentRole.length) { deleting = true; setTimeout(typeRole, 1800); return; }
    } else {
      titleEl.textContent = currentRole.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) { deleting = false; roleIdx = (roleIdx + 1) % roles.length; }
    }
    setTimeout(typeRole, deleting ? 45 : 85);
  }
  setTimeout(typeRole, 1200);
