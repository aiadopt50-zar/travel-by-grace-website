(() => {
  'use strict';

  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.getElementById('main-nav');
  const closeMenu = () => {
    menu.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
  };
  menuButton.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('click', event => {
    if (!menu.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.classList.contains('is-open')) {
      closeMenu();
      menuButton.focus();
    }
  });

  const albums = JSON.parse(document.getElementById('gallery-data').textContent);
  const viewer = document.getElementById('photo-viewer');
  const photo = document.getElementById('viewer-image');
  const caption = document.getElementById('photo-caption');
  const count = document.getElementById('photo-count');
  const collection = document.getElementById('photo-collection');
  const albumNames = {
    weekend: 'Mamma Mia weekend · 3–6 September 2026',
    moments: 'From Lucille’s camera roll',
    inspiration: 'Travel inspiration · photo illustrations'
  };
  let activeAlbum = 'weekend';
  let activeIndex = 0;
  let opener;
  let previousOverflow = '';

  const showPhoto = () => {
    const items = albums[activeAlbum];
    const item = items[activeIndex];
    photo.src = item.src;
    photo.alt = item.alt;
    caption.textContent = item.caption;
    count.textContent = `${activeIndex + 1} / ${items.length}`;
    collection.textContent = albumNames[activeAlbum];
  };
  const movePhoto = step => {
    activeIndex = (activeIndex + step + albums[activeAlbum].length) % albums[activeAlbum].length;
    showPhoto();
  };
  document.querySelectorAll('[data-gallery]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const album = link.dataset.gallery;
      const index = Number(link.dataset.index);
      if (typeof viewer.showModal !== 'function' || !albums[album]?.[index]) return;
      event.preventDefault();
      opener = link;
      activeAlbum = album;
      activeIndex = index;
      showPhoto();
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      viewer.showModal();
    });
  });
  viewer.querySelector('[data-close-photo]').addEventListener('click', () => viewer.close());
  viewer.querySelector('[data-photo-prev]').addEventListener('click', () => movePhoto(-1));
  viewer.querySelector('[data-photo-next]').addEventListener('click', () => movePhoto(1));
  viewer.addEventListener('close', () => {
    document.body.style.overflow = previousOverflow;
    opener?.focus({ preventScroll: true });
  });
  viewer.addEventListener('click', event => {
    if (event.target !== viewer) return;
    const bounds = viewer.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) viewer.close();
  });
  viewer.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      movePhoto(event.key === 'ArrowLeft' ? -1 : 1);
    }
  });
  let touchStart;
  photo.addEventListener('touchstart', event => {
    if (event.touches.length === 1) {
      touchStart = { x: event.touches[0].clientX, y: event.touches[0].clientY };
    } else touchStart = null;
  }, { passive: true });
  photo.addEventListener('touchend', event => {
    if (!touchStart || event.changedTouches.length !== 1) return;
    const dx = event.changedTouches[0].clientX - touchStart.x;
    const dy = event.changedTouches[0].clientY - touchStart.y;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) movePhoto(dx < 0 ? 1 : -1);
    touchStart = null;
  }, { passive: true });

  const form = document.getElementById('trip-enquiry');
  if (form) {
    document.querySelectorAll('[data-trip]').forEach(link => {
      link.addEventListener('click', () => {
        document.getElementById('enquiry-trip').value = link.dataset.trip;
      });
    });
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const lines = [
        `Hi Lucille, I’m ${String(data.get('name')).trim()}.`,
        'I’d love to plan a journey with Travel By Grace.',
        '',
        `My idea: ${data.get('trip')}`
      ];
      if (data.get('date')) {
        const date = new Date(`${data.get('date')}T12:00:00`);
        lines.push(`Preferred date: ${date.toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' })}`);
      }
      if (data.get('group')) lines.push(`Group: ${data.get('group')}`);
      const details = String(data.get('details') || '').trim();
      if (details) lines.push('', details);
      lines.push('', 'Please let me know about availability and a quote. Thank you!');
      window.location.assign(`https://wa.me/27845620309?text=${encodeURIComponent(lines.join('\n'))}`);
    });
  }
})();
