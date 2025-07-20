export function initModal() {
  const overlay = document.getElementById('artifactModal');
  overlay.querySelector('.modal-close')
         .addEventListener('click', () => overlay.classList.add('hidden'));
  overlay.addEventListener('click', e => {
    if (e.target === overlay) overlay.classList.add('hidden');
  });
}

export function openModal(item) {
  const overlay = document.getElementById('artifactModal');
  overlay.querySelector('.modal-image').src = item.image;
  overlay.querySelector('.modal-title').textContent = item.name;
  overlay.querySelector('.modal-desc').textContent = item.description;
  overlay.classList.remove('hidden');
}


export function initHamburgerMenu({
  hamburgerSelector = '#hamburger',
  menuSelector      = '#mobile-menu',
  overlaySelector   = '#overlay'
} = {}) {
  const hamburger  = document.querySelector(hamburgerSelector);
  const mobileMenu = document.querySelector(menuSelector);
  const overlay    = document.querySelector(overlaySelector);

  if (!hamburger || !mobileMenu || !overlay) return;

  
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    overlay   .classList.toggle('open');
    console.log("click")
  });


  overlay.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    overlay   .classList.remove('open');
    console.log("click")
  });
}
