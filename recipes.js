/* recipes.js — loads recipes.json and renders the recipe card grid */
(async () => {
  const data = await fetch('data/recipes.json').then(r => r.json());

  document.title = data.title;
  document.getElementById('recipes-page-title').textContent = data.title;

  const grid = document.getElementById('recipes-grid');
  const modal = document.getElementById('recipe-modal');
  const modalClose = document.getElementById('recipe-modal-close');
  const modalPhoto = document.getElementById('modal-photo');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-description');
  const modalTags = document.getElementById('modal-tags');
  const modalIngredients = document.getElementById('modal-ingredients');
  const modalSteps = document.getElementById('modal-steps');

  function openModal(recipe) {
    modalPhoto.src = recipe.photo || '';
    modalPhoto.alt = recipe.title;
    modalTitle.textContent = recipe.title;
    modalDesc.textContent = recipe.description || '';

    modalTags.innerHTML = '';
    (recipe.tags || []).forEach(tag => {
      const span = document.createElement('span');
      span.className = 'tag';
      span.textContent = tag;
      modalTags.appendChild(span);
    });

    modalIngredients.innerHTML = '';
    (recipe.ingredients || []).forEach(ing => {
      const li = document.createElement('li');
      li.textContent = ing;
      modalIngredients.appendChild(li);
    });

    modalSteps.innerHTML = '';
    (recipe.steps || []).forEach(step => {
      const li = document.createElement('li');
      li.textContent = step;
      modalSteps.appendChild(li);
    });

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    modalPhoto.src = '';
  }

  data.recipes.forEach(recipe => {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', 'Open recipe: ' + recipe.title);

    const thumb = document.createElement('div');
    thumb.className = 'recipe-card-thumb';
    if (recipe.photo) {
      const img = document.createElement('img');
      img.src = recipe.photo;
      img.alt = recipe.title;
      img.loading = 'lazy';
      thumb.appendChild(img);
    }

    const body = document.createElement('div');
    body.className = 'recipe-card-body';

    const title = document.createElement('div');
    title.className = 'recipe-card-title';
    title.textContent = recipe.title;
    body.appendChild(title);

    if (recipe.tags && recipe.tags.length) {
      const tagsDiv = document.createElement('div');
      tagsDiv.className = 'recipe-card-tags';
      recipe.tags.slice(0, 3).forEach(tag => {
        const span = document.createElement('span');
        span.className = 'tag';
        span.textContent = tag;
        tagsDiv.appendChild(span);
      });
      body.appendChild(tagsDiv);
    }

    card.appendChild(thumb);
    card.appendChild(body);

    card.addEventListener('click', () => openModal(recipe));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') openModal(recipe);
    });

    grid.appendChild(card);
  });

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
})();
