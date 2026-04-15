/* meself.js — loads meself.json and renders the masonry photo gallery */
(async () => {
  const data = await fetch('data/meself.json').then(r => r.json());

  document.title = data.title;
  document.getElementById('meself-page-title').textContent = data.title;

  const grid = document.getElementById('meself-grid');
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const lbCaption = document.getElementById('lightbox-caption');
  const lbMeta = document.getElementById('lightbox-meta');
  const lbClose = document.getElementById('lightbox-close');

  function openLightbox(entry) {
    lbImg.src = entry.photo;
    lbImg.alt = entry.caption || '';
    lbCaption.textContent = entry.caption || '';
    const parts = [entry.location, entry.date].filter(Boolean);
    lbMeta.textContent = parts.join(' · ');
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    lbImg.src = '';
  }

  data.photos.forEach(entry => {
    const item = document.createElement('div');
    item.className = 'masonry-item';
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', entry.caption || 'View photo');

    const img = document.createElement('img');
    img.src = entry.photo;
    img.alt = entry.caption || '';
    img.loading = 'lazy';
    item.appendChild(img);

    if (entry.location || entry.date) {
      const info = document.createElement('div');
      info.className = 'masonry-item-info';
      if (entry.location) {
        const loc = document.createElement('span');
        loc.className = 'masonry-item-location';
        loc.textContent = '📍 ' + entry.location;
        info.appendChild(loc);
      }
      if (entry.date) {
        const date = document.createElement('span');
        date.className = 'masonry-item-date';
        date.textContent = entry.date;
        info.appendChild(date);
      }
      item.appendChild(info);
    }

    item.addEventListener('click', () => openLightbox(entry));
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') openLightbox(entry);
    });
    grid.appendChild(item);
  });

  lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
  });
})();