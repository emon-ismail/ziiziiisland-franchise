// FAQ toggle (accordion style, only one open at a time, plus/minus icons)
document.addEventListener('DOMContentLoaded', function () {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', function () {
      // Close all other items
      faqItems.forEach(i => {
        if (i !== item) {
          i.classList.remove('active');
          i.querySelector('.faq-icon').textContent = '+';
        }
      });
      // Toggle current item
      const isActive = item.classList.contains('active');
      item.classList.toggle('active');
      item.querySelector('.faq-icon').textContent = isActive ? '+' : '−';
    });
    // Set initial icon
    item.querySelector('.faq-icon').textContent = item.classList.contains('active') ? '−' : '+';
  });
  // Open the first FAQ by default
  if (faqItems.length > 0) {
    faqItems[0].classList.add('active');
    faqItems[0].querySelector('.faq-icon').textContent = '−';
  }
});

// Basic form validation (HTML5 will handle most, but you can add custom JS if needed)
document.querySelector('.franchise-form')?.addEventListener('submit', function(e) {
  // Example: Prevent submit if country not selected
  const country = document.getElementById('country');
  if (!country.value) {
    alert('Please select a country.');
    country.focus();
    e.preventDefault();
  }
});

// Mobile navbar overlay toggle
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.getElementById('mainNavbar');
if (navbarToggler && navbarCollapse) {
  navbarToggler.addEventListener('click', function() {
    setTimeout(() => {
      if (navbarCollapse.classList.contains('show')) {
        document.body.classList.add('menu-open');
      } else {
        document.body.classList.remove('menu-open');
      }
    }, 10);
  });
  // Also close overlay if nav is closed by clicking a link
  navbarCollapse.querySelectorAll('.nav-link, .cta-btn').forEach(link => {
    link.addEventListener('click', () => {
      document.body.classList.remove('menu-open');
    });
  });
}

// Gallery modal: open at correct image
const galleryImgs = document.querySelectorAll('.gallery-img');
const galleryCarousel = document.getElementById('galleryCarousel');
const galleryModal = document.getElementById('galleryModal');
if (galleryImgs.length && galleryCarousel && galleryModal) {
  galleryImgs.forEach((img, idx) => {
    img.addEventListener('click', function() {
      const carousel = bootstrap.Carousel.getOrCreateInstance(galleryCarousel);
      carousel.to(idx);
    });
  });
} 