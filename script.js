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

  // Form submission to Google Sheets
  const franchiseForm = document.querySelector('.franchise-form-grid');
  if (franchiseForm) {
    franchiseForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Show loading state
      const submitBtn = franchiseForm.querySelector('.contact-submit-btn');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Submitting...';
      submitBtn.disabled = true;

      // Collect form data
      const formData = new FormData(franchiseForm);
      const data = {
        firstName: formData.get('firstName') || franchiseForm.querySelector('input[placeholder="First Name*"]').value,
        lastName: formData.get('lastName') || franchiseForm.querySelector('input[placeholder="Last Name*"]').value,
        startDate: formData.get('startDate') || franchiseForm.querySelector('input[placeholder="When would you like to start?*"]').value,
        phone: formData.get('phone') || franchiseForm.querySelector('input[placeholder="Phone*"]').value,
        marketPreference: formData.get('marketPreference') || franchiseForm.querySelector('input[placeholder="What is your market preference?"]').value,
        state: formData.get('state') || franchiseForm.querySelector('input[placeholder="State"]').value,
        heardFrom: formData.get('heardFrom') || franchiseForm.querySelector('input[placeholder="How did you hear about us?*"]').value,
        email: formData.get('email') || franchiseForm.querySelector('input[placeholder="Email Address*"]').value,
        capital: formData.get('capital') || franchiseForm.querySelector('input[placeholder="Capital to Invest*"]').value,
        city: formData.get('city') || franchiseForm.querySelector('#country').value,
        timestamp: new Date().toISOString()
      };

      // Send to Google Sheets
      submitToGoogleSheets(data)
        .then(response => {
          if (response.result === 'success') {
            // Show success message
            showMessage('Thank you! Your information has been submitted successfully. We will contact you soon.', 'success');
            franchiseForm.reset();
          } else {
            throw new Error('Submission failed');
          }
        })
        .catch(error => {
          console.error('Error:', error);
          showMessage('Sorry, there was an error submitting your information. Please try again or call us directly.', 'error');
        })
        .finally(() => {
          // Reset button
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        });
    });
  }
});

// Function to submit data to Google Sheets
async function submitToGoogleSheets(data) {
  // Replace this URL with your Google Apps Script web app URL
  const scriptURL = 'https://script.google.com/macros/s/AKfycbzcAeSsHz2oXCzNtQcJ2VWQsWzaMIMmb3VbLbGd44UiLNJrgCPDYnLRYq1fZi4_nhIN/exec';
  
  try {
    const response = await fetch(scriptURL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    
    return { result: 'success' };
  } catch (error) {
    throw error;
  }
}

// Function to show success/error messages
function showMessage(message, type) {
  // Remove existing messages
  const existingMessage = document.querySelector('.form-message');
  if (existingMessage) {
    existingMessage.remove();
  }

  // Create message element
  const messageDiv = document.createElement('div');
  messageDiv.className = `form-message alert alert-${type === 'success' ? 'success' : 'danger'} mt-3`;
  messageDiv.textContent = message;
  
  // Add to form
  const form = document.querySelector('.franchise-form-grid');
  form.appendChild(messageDiv);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (messageDiv.parentNode) {
      messageDiv.remove();
    }
  }, 5000);
}

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