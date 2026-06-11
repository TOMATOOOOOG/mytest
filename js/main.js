document.addEventListener('DOMContentLoaded', function() {
  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  var nav = document.querySelector('.nav');

  function setMenuOpen(isOpen) {
    if (!toggle || !links) return;
    links.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? '关闭导航菜单' : '打开导航菜单');
    toggle.textContent = isOpen ? '×' : '☰';
  }

  if (toggle && links) {
    toggle.addEventListener('click', function() {
      setMenuOpen(!links.classList.contains('open'));
    });

    links.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        setMenuOpen(false);
      });
    });

    document.addEventListener('click', function(event) {
      if (links.classList.contains('open') && nav && !nav.contains(event.target)) {
        setMenuOpen(false);
      }
    });

    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && links.classList.contains('open')) {
        setMenuOpen(false);
        toggle.focus();
      }
    });

    window.addEventListener('resize', function() {
      if (window.innerWidth > 768 && links.classList.contains('open')) {
        setMenuOpen(false);
      }
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
