(() => {
  const root = document.documentElement;
  const header = document.querySelector('[data-header]');
  const nav = document.querySelector('[data-nav]');
  const navToggle = document.querySelector('[data-nav-toggle]');
  const entry = document.querySelector('[data-entry-scene]');

  // Play the entry scene once per browser session.
  try {
    if (sessionStorage.getItem('travelByGraceIntroSeen')) {
      entry?.classList.add('is-skipped');
    } else {
      sessionStorage.setItem('travelByGraceIntroSeen', 'true');
    }
  } catch (_) {
    // Browsers that block session storage can still show the animation normally.
  }

  const updateScroll = () => {
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    root.style.setProperty('--scroll', Math.min(1, window.scrollY / max).toFixed(4));
    header?.classList.toggle('is-scrolled', window.scrollY > 18);
  };
  updateScroll();
  window.addEventListener('scroll', updateScroll, { passive: true });

  navToggle?.addEventListener('click', () => {
    const open = nav?.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(Boolean(open)));
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((item) => {
      if (item.isIntersecting) {
        item.target.classList.add('is-visible');
        observer.unobserve(item.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  document.querySelectorAll('[data-filter]').forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      document.querySelectorAll('[data-filter]').forEach(btn => btn.classList.toggle('is-active', btn === button));
      document.querySelectorAll('[data-category]').forEach(card => {
        const categories = card.dataset.category?.split(' ') || [];
        card.classList.toggle('is-hidden', filter !== 'all' && !categories.includes(filter));
      });
    });
  });

  // Carry a selected trip idea into the enquiry form.
  const message = document.querySelector('textarea[name="message"]');
  document.querySelectorAll('[data-trip]').forEach(link => {
    link.addEventListener('click', () => {
      if (message) message.value = `I’m interested in the ${link.dataset.trip}. Please help me plan travel, accommodation and itinerary options.`;
    });
  });

  const routeCar = document.querySelector('.route-car');
  if (routeCar && !CSS.supports('offset-path', 'path("M0 0L1 1")')) {
    routeCar.style.display = 'none';
  }

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());
})();
