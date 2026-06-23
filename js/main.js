/* ============================================================
   PHOENIX LEADS SOLUTIONS — MAIN JAVASCRIPT
   ============================================================ */

document.addEventListener('DOMContentLoaded', function() {

  // ------------------------------------------------------------
  // 1. MOBILE NAV TOGGLE
  // ------------------------------------------------------------
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function() {
      const expanded = this.getAttribute('aria-expanded') === 'true' ? false : true;
      this.setAttribute('aria-expanded', expanded);
      navLinks.classList.toggle('open');
    });
  }

  // ------------------------------------------------------------
  // 2. HEADER SCROLL EFFECT
  // ------------------------------------------------------------
  const header = document.querySelector('.site-header');
  let lastScrollY = 0;

  window.addEventListener('scroll', function() {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScrollY = scrollY;
  });

  // ------------------------------------------------------------
  // 3. BACK TO TOP BUTTON
  // ------------------------------------------------------------
  const backToTop = document.querySelector('.back-to-top');

  window.addEventListener('scroll', function() {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  if (backToTop) {
    backToTop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ------------------------------------------------------------
  // 4. SCROLL REVEAL (Intersection Observer)
  // ------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-fade');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Optionally unobserve after reveal for performance
        // revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // Also handle elements with data-stagger (like process steps, industries)
  const staggerParents = document.querySelectorAll('[data-stagger]');
  staggerParents.forEach(parent => {
    const children = parent.children;
    // Add delay classes if not already present
    Array.from(children).forEach((child, index) => {
      if (!child.classList.contains('delay-1') && !child.classList.contains('delay-2') && !child.classList.contains('delay-3') && !child.classList.contains('delay-4') && !child.classList.contains('delay-5')) {
        const delay = (index % 5) + 1;
        child.classList.add(`delay-${delay}`);
      }
    });
  });

  // ------------------------------------------------------------
  // 5. STATISTICS COUNTER ANIMATION
  // ------------------------------------------------------------
  const statNumbers = document.querySelectorAll('.stat-number');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        let current = 0;
        const increment = Math.ceil(target / 80); // 80 steps
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = current + suffix;
        }, 25);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));

  // ------------------------------------------------------------
  // 6. FAQ ACCORDION
  // ------------------------------------------------------------
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      const isOpen = this.getAttribute('aria-expanded') === 'true' ? true : false;
      const answer = this.nextElementSibling;

      // Close other open FAQ items (optional, for single-open behavior)
      // Uncomment below if you want only one open at a time
      /*
      faqQuestions.forEach(q => {
        if (q !== this) {
          q.setAttribute('aria-expanded', 'false');
          q.nextElementSibling.style.maxHeight = '0';
          q.classList.remove('open');
        }
      });
      */

      if (isOpen) {
        this.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = '0';
        this.classList.remove('open');
      } else {
        this.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        this.classList.add('open');
      }
    });
  });

  // ------------------------------------------------------------
  // 7. CONTACT FORM VALIDATION — REMOVED to allow PHP processing
  // The PHP backend now handles validation, database saving,
  // and email delivery. The HTML5 'required' attributes provide
  // basic client-side checks.
  // ------------------------------------------------------------

});