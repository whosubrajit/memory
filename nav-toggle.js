// ---------------- Mobile Menu Toggle ----------------
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

// Toggle menu on hamburger click
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');

  // Toggle hamburger ↔ close icon
  menuToggle.textContent = navLinks.classList.contains('active') ? '❌' : '☰';

  // Update aria-expanded for accessibility
  menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('active'));
});

// ---------------- Close menu when clicking outside ----------------
document.addEventListener('click', (e) => {
  if (
    !navLinks.contains(e.target) &&
    !menuToggle.contains(e.target) &&
    navLinks.classList.contains('active')
  ) {
    navLinks.classList.remove('active');
    menuToggle.textContent = '☰';
    menuToggle.setAttribute('aria-expanded', 'false');
  }
});

// ---------------- Close menu on link click (mobile) ----------------
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      navLinks.classList.remove('active');
      menuToggle.textContent = '☰';
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
});
