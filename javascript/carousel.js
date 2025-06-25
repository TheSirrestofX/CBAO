document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.carousel-card');
  const upBtn = document.querySelector('.carousel-button.up');
  const downBtn = document.querySelector('.carousel-button.down');
  let currentIndex = 0;
  const totalCards = cards.length;

  // Update card positions
  function updateCarousel() {
    cards.forEach((card, index) => {
      card.classList.remove('active', 'prev', 'next', 'far-prev', 'far-next');

      if (index === currentIndex) {
        card.classList.add('active');
      } else if (index === (currentIndex - 1 + totalCards) % totalCards) {
        card.classList.add('prev');
      } else if (index === (currentIndex + 1) % totalCards) {
        card.classList.add('next');
      } else if (index === (currentIndex - 2 + totalCards) % totalCards) {
        card.classList.add('far-prev');
      } else if (index === (currentIndex + 2) % totalCards) {
        card.classList.add('far-next');
      }
    });
  }

  // Move to next card (down)
  function moveDown() {
    currentIndex = (currentIndex + 1) % totalCards;
    updateCarousel();
  }

  // Move to previous card (up)
  function moveUp() {
    currentIndex = (currentIndex - 1 + totalCards) % totalCards;
    updateCarousel();
  }

  // Button event listeners
  upBtn.addEventListener('click', moveUp);
  downBtn.addEventListener('click', moveDown);

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
      moveUp();
    } else if (e.key === 'ArrowDown') {
      moveDown();
    }
  });

  // Initialize carousel
  updateCarousel();
});
