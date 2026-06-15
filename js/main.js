document.addEventListener('DOMContentLoaded', function() {
  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  var nav = document.querySelector('.nav');
  var dropdownItems = Array.prototype.slice.call(
    document.querySelectorAll('.nav-item-dropdown')
  );

  function setSubmenuOpen(item, isOpen) {
    if (!item) return;
    var submenuToggle = item.querySelector('.submenu-toggle');
    if (!submenuToggle) return;
    var isAboutMenu = submenuToggle.getAttribute('aria-controls') === 'about-submenu';
    var openLabel = isAboutMenu
      ? '收起关于我们的子菜单'
      : '收起我们的服务子菜单';
    var closedLabel = isAboutMenu
      ? '展开关于我们的子菜单'
      : '展开我们的服务子菜单';
    item.classList.toggle('submenu-open', isOpen);
    submenuToggle.setAttribute('aria-expanded', String(isOpen));
    submenuToggle.setAttribute('aria-label', isOpen ? openLabel : closedLabel);
  }

  function closeAllSubmenus(exceptItem) {
    dropdownItems.forEach(function(item) {
      if (item !== exceptItem) {
        setSubmenuOpen(item, false);
      }
    });
  }

  function setMenuOpen(isOpen) {
    if (!toggle || !links) return;
    links.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? '关闭导航菜单' : '打开导航菜单');
    toggle.textContent = isOpen ? '×' : '☰';
    if (!isOpen) {
      closeAllSubmenus();
    }
  }

  if (toggle && links) {
    toggle.addEventListener('click', function() {
      setMenuOpen(!links.classList.contains('open'));
    });

    dropdownItems.forEach(function(item) {
      var submenuToggle = item.querySelector('.submenu-toggle');
      if (!submenuToggle) return;
      submenuToggle.addEventListener('click', function(event) {
        event.stopPropagation();
        var shouldOpen = !item.classList.contains('submenu-open');
        closeAllSubmenus(item);
        setSubmenuOpen(item, shouldOpen);
      });
    });

    links.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        setMenuOpen(false);
      });
    });

    document.addEventListener('click', function(event) {
      if (nav && !nav.contains(event.target)) {
        closeAllSubmenus();
        if (links.classList.contains('open')) {
          setMenuOpen(false);
        }
      }
    });

    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') {
        var openSubmenu = document.querySelector('.nav-item-dropdown.submenu-open');
        if (openSubmenu) {
          var openToggle = openSubmenu.querySelector('.submenu-toggle');
          setSubmenuOpen(openSubmenu, false);
          if (openToggle) openToggle.focus();
        } else if (links.classList.contains('open')) {
          setMenuOpen(false);
          toggle.focus();
        }
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
    var linkUrl = new URL(link.getAttribute('href'), window.location.href);
    var linkPath = linkUrl.pathname.split('/').pop() || 'index.html';
    var isSubmenuLink = Boolean(link.closest('.nav-submenu'));
    var isActive = isSubmenuLink
      ? linkPath === currentPath && linkUrl.hash === window.location.hash && Boolean(window.location.hash)
      : linkPath === currentPath;
    if (isActive) {
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

  // Open the contact address in the most suitable map application.
  var mapLink = document.querySelector('.map-navigation-link');
  if (mapLink) {
    var mapAddress = mapLink.getAttribute('data-map-address');
    var encodedAddress = encodeURIComponent(mapAddress);
    var userAgent = navigator.userAgent || '';
    var isIOS = /iPad|iPhone|iPod/.test(userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    var isAndroid = /Android/i.test(userAgent);

    if (isIOS) {
      mapLink.href = 'maps://?daddr=' + encodedAddress;
      mapLink.removeAttribute('target');
      mapLink.removeAttribute('rel');
    } else if (isAndroid) {
      mapLink.href = 'geo:0,0?q=' + encodedAddress;
      mapLink.removeAttribute('target');
      mapLink.removeAttribute('rel');
    }
  }
});
