function preloader() {
  const preloader  = document.querySelector('.preloader');
  preloader.classList.add('opacity');
  setTimeout(() => {
    preloader.remove();
  }, 300);
}

setTimeout(preloader, 3000);

function sliderPlugin() {
  const slides = document.querySelectorAll('.slide');
  
  activeSlide = Math.floor(Math.random() * slides.length) + 1;
  slides[activeSlide].classList.add('active');

  for (const slide of slides) {
    slide.addEventListener('click', () => {
      clearActiveClasses();
      slide.classList.add('active');
    });
  }
  
  function clearActiveClasses() {
    slides.forEach((slide) => {
      slide.classList.remove('active');
    });
  }
}

sliderPlugin();