(() => {
  'use strict';

  /* ===================== SCROLL REVEAL ===================== */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach((el) => revealObserver.observe(el));

  /* ===================== ACCORDION (FAQ) ===================== */
  const accordionItems = document.querySelectorAll('.accordion__item');

  accordionItems.forEach((item) => {
    const header = item.querySelector('.accordion__header');
    const body = item.querySelector('.accordion__body');

    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      accordionItems.forEach((other) => {
        other.classList.remove('is-open');
        other.querySelector('.accordion__body').style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('is-open');
        body.style.maxHeight = body.scrollHeight + 40 + 'px';
      }
    });
  });

  /* ===================== HEADER SHADOW ON SCROLL ===================== */
  const header = document.getElementById('header');
  let lastScrollY = 0;

  const onScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > 10) {
      header.style.boxShadow = '0 1px 12px rgba(16, 24, 40, 0.06)';
    } else {
      header.style.boxShadow = 'none';
    }
    lastScrollY = currentScrollY;
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  /* ===================== LEAD FORM VALIDATION ===================== */
  const form = document.getElementById('leadForm');
  const formSuccess = document.getElementById('formSuccess');
  const nameInput = document.getElementById('name');
  const phoneInput = document.getElementById('phone');
  const nameError = document.getElementById('nameError');
  const phoneError = document.getElementById('phoneError');

  const phonePattern = /^[+]?[0-9\s\-()]{10,18}$/;

  const validateField = (input, errorEl, testFn, message) => {
    const value = input.value.trim();
    if (!testFn(value)) {
      input.classList.add('is-invalid');
      errorEl.textContent = message;
      return false;
    }
    input.classList.remove('is-invalid');
    errorEl.textContent = '';
    return true;
  };

  const clearFieldError = (input, errorEl) => {
    input.classList.remove('is-invalid');
    errorEl.textContent = '';
  };

  nameInput.addEventListener('input', () => clearFieldError(nameInput, nameError));
  phoneInput.addEventListener('input', () => clearFieldError(phoneInput, phoneError));

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = validateField(
      nameInput,
      nameError,
      (value) => value.length >= 2,
      'Введите ваше имя'
    );

    const isPhoneValid = validateField(
      phoneInput,
      phoneError,
      (value) => phonePattern.test(value),
      'Введите корректный номер телефона'
    );

    if (!isNameValid || !isPhoneValid) {
      return;
    }

    form.classList.add('is-hidden');
    formSuccess.classList.add('is-visible');
  });

  /* ===================== COOKIE CONSENT ===================== */
  const cookieBanner = document.getElementById('cookieBanner');
  const cookieAccept = document.getElementById('cookieAccept');
  const cookieDecline = document.getElementById('cookieDecline');
  const COOKIE_CONSENT_KEY = 'cookieConsentAccepted';

  // TODO: на финальном этапе вернуть проверку `!localStorage.getItem(COOKIE_CONSENT_KEY)`,
  // сейчас отключена для тестирования — баннер показывается при каждой перезагрузке.
  if (cookieBanner && cookieAccept) {
    setTimeout(() => cookieBanner.classList.add('is-visible'), 600);
  }

  cookieAccept?.addEventListener('click', () => {
    // TODO: на финальном этапе вернуть localStorage.setItem(COOKIE_CONSENT_KEY, '1');
    cookieBanner.classList.remove('is-visible');
  });

  cookieDecline?.addEventListener('click', () => {
    // TODO: на финальном этапе вернуть localStorage.setItem(COOKIE_CONSENT_KEY, '0');
    cookieBanner.classList.remove('is-visible');
  });

  /* ===================== SMOOTH ANCHOR SCROLL (FALLBACK) ===================== */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
