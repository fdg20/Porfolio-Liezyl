(function () {
  'use strict';

  const NAV_SELECTOR = '[data-section]';
  const SECTION_SELECTOR = '.portfolio-section';
  const ACTIVE_CLASS = 'active';
  const ANIMATION_DURATION = 400;

  const nav = document.querySelector('.main-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll(SECTION_SELECTOR);
  const menuToggle = document.querySelector('.menu-toggle');

  function getSectionId(sectionName) {
    return 'section-' + sectionName;
  }

  function setActiveSection(sectionName) {
    const targetId = getSectionId(sectionName);
    const targetSection = document.getElementById(targetId);
    if (!targetSection) return;

    document.body.setAttribute('data-section', sectionName);

    navLinks.forEach(function (link) {
      const isActive = link.getAttribute('data-section') === sectionName;
      link.classList.toggle(ACTIVE_CLASS, isActive);
    });

    sections.forEach(function (section) {
      const isTarget = section.getAttribute('data-section') === sectionName;
      section.classList.remove(ACTIVE_CLASS);
      if (isTarget) {
        section.classList.add(ACTIVE_CLASS);
      }
    });
  }

  function handleNavClick(event) {
    const link = event.target.closest(NAV_SELECTOR);
    if (!link) return;

    const sectionName = link.getAttribute('data-section');
    if (!sectionName) return;

    event.preventDefault();
    setActiveSection(sectionName);
    closeMobileMenu();
  }

  function closeMobileMenu() {
    if (nav) nav.classList.remove('is-open');
  }

  function openMobileMenu() {
    if (nav) nav.classList.toggle('is-open');
  }

  document.addEventListener('click', function (event) {
    if (event.target.matches(NAV_SELECTOR) || event.target.closest(NAV_SELECTOR)) {
      handleNavClick(event);
    }
  });

  if (menuToggle) {
    menuToggle.addEventListener('click', openMobileMenu);
  }
})();
