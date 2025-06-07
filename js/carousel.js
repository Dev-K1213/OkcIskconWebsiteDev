  const track = document.querySelector('.custom-carousel-track');
  const cards = document.querySelectorAll('.carousel-card');
  const nextBtn = document.querySelector('.next');
  const prevBtn = document.querySelector('.prev');

  let currentIndex = 0;

  function updateCarousel() {
    const cardWidth = cards[0].offsetWidth + 24; // includes margin/padding
    track.style.transform = `translateX(-${cardWidth * currentIndex}px)`;
  }

  nextBtn.addEventListener('click', () => {
    if (currentIndex < cards.length - 3) {
      currentIndex++;
      updateCarousel();
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  window.addEventListener('resize', updateCarousel);