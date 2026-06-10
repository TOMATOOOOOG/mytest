document.addEventListener('DOMContentLoaded', function() {
  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle) {
    toggle.addEventListener('click', function() {
      links.classList.toggle('open');
    });
  }

  // Active nav link highlighting
  var currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function(link) {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });

  // FAQ accordion
  document.querySelectorAll('.faq-question').forEach(function(question) {
    question.addEventListener('click', function() {
      var item = this.parentElement;
      item.classList.toggle('open');
    });
  });

  // Floating contact QR toggle
  var contactBtn = document.querySelector('.floating-contact-btn');
  var qrContainer = document.querySelector('.floating-contact-qr');
  if (contactBtn && qrContainer) {
    contactBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      qrContainer.classList.toggle('open');
    });
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.floating-contact')) {
        qrContainer.classList.remove('open');
      }
    });
  }
});
