  document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector(".custom-carousel-track");
    const cards = document.querySelectorAll(".carousel-card");
    const nextBtn = document.querySelector(".carousel-btn.next");
    const prevBtn = document.querySelector(".carousel-btn.prev");

    const visibleCards = 3;
    const cardMargin = 24; // adjust if needed
    const cardWidth = cards[0].offsetWidth + cardMargin;
    const totalCards = cards.length;

    let currentIndex = 0;

    function updateCarousel() {
      const maxIndex = Math.max(totalCards - visibleCards, 0);
      currentIndex = Math.min(currentIndex, maxIndex);
      track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }

    function showNext() {
      const maxIndex = Math.max(totalCards - visibleCards, 0);
      if (currentIndex < maxIndex) {
        currentIndex++;
      } else {
        currentIndex = 0;
      }
      updateCarousel();
    }

    function showPrev() {
      const maxIndex = Math.max(totalCards - visibleCards, 0);
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        currentIndex = maxIndex;
      }
      updateCarousel();
    }

    nextBtn.addEventListener("click", showNext);
    prevBtn.addEventListener("click", showPrev);

    // ✅ Auto-scroll every 10 seconds
    setInterval(showNext, 1000);
  });