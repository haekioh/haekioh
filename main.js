/* main.js — loads profile.json and populates the home page */
(async () => {
  const data = await fetch('data/profile.json').then(r => r.json());

  /* Photo */
  const photo = document.getElementById('profile-photo');
  photo.src = data.photo;
  photo.alt = data.name;

  /* Name + bio */
  document.getElementById('profile-name').textContent = data.name;
  document.getElementById('profile-bio').textContent = data.bio;

  /* Location */
  document.getElementById('profile-location').textContent =
    data.location ? '📍 ' + data.location : '';

  /* Activity emojis */
  document.getElementById('profile-activities').textContent =
    Array.isArray(data.activities) ? data.activities.join('  ') : '';

  /* Music button + audio preview */
  const musicBtn = document.getElementById('music-btn');
  const audio = document.getElementById('music-audio');
  document.getElementById('music-label').textContent =
    '♫  ' + (data.music.label || 'My favourite track');
  audio.src = data.music.previewUrl;

  musicBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      musicBtn.classList.add('playing');
      document.getElementById('music-label').textContent =
        '◼  ' + (data.music.label || 'My favourite track');
    } else {
      audio.pause();
      audio.currentTime = 0;
      musicBtn.classList.remove('playing');
      document.getElementById('music-label').textContent =
        '♫  ' + (data.music.label || 'My favourite track');
    }
  });

  audio.addEventListener('ended', () => {
    musicBtn.classList.remove('playing');
    document.getElementById('music-label').textContent =
      '♫  ' + (data.music.label || 'My favourite track');
  });

  /* Restaurant link */
  const restLink = document.getElementById('restaurant-link');
  restLink.textContent = '🍽  ' + (data.restaurant.label || 'My favourite spot');
  restLink.href = data.restaurant.url;

    /* Cafe link */
  const cafeLink = document.getElementById('cafe-link');
  cafeLink.textContent = '☕️  ' + (data.cafe.label || 'My favourite spot');
  cafeLink.href = data.cafe.url;

  /* Nav cards */
  const geppyImg = document.getElementById('geppy-img');
  geppyImg.src = data.sections.geppy.coverPhoto;
  geppyImg.alt = data.sections.geppy.label;
  document.getElementById('geppy-label').textContent = data.sections.geppy.label;

  const recipesImg = document.getElementById('recipes-img');
  recipesImg.src = data.sections.recipes.coverPhoto;
  recipesImg.alt = data.sections.recipes.label;
  document.getElementById('recipes-label').textContent = data.sections.recipes.label;

    const meselfImg = document.getElementById('meself-img');
  meselfImg.src = data.sections.meself.coverPhoto;
  meselfImg.alt = data.sections.meself.label;
  document.getElementById('meself-label').textContent = data.sections.meself.label;

  const tripsImg = document.getElementById('trips-img');
  tripsImg.src = data.sections.trips.coverPhoto;
  tripsImg.alt = data.sections.trips.label;
  document.getElementById('trips-label').textContent = data.sections.trips.label;
})();
