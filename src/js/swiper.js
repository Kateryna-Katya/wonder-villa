import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('.hero-swiper');

  const swiper = new Swiper(container, {
    modules: [Navigation],
    breakpoints: {
      374: {
        slidesPerView: 'auto',
        spaceBetween: 30,
      },
      1439: {
        slidesPerView: 6,
        spaceBetween: 30,
      },
    },
    loop: true,
    centeredSlides: true,
    slideClass: 'hero-swiper-slide',
    wrapperClass: 'hero-swiper-wrapper',
    direction: 'horizontal',

    on: {
      init() {
        scaleSlides(container, 'hero-swiper-slide');
      },
      slideChange() {
        scaleSlides(container, 'hero-swiper-slide');
      },
      resize() {
        scaleSlides(container, 'hero-swiper-slide');
      },
      transitionEnd() {
        scaleSlides(container, 'hero-swiper-slide');
      },
    },
  });

  function scaleSlides(container, slideClass) {
    const slides = container.querySelectorAll(`.${slideClass}:not(.swiper-slide-duplicate)`);
    slides.forEach(slide => slide.classList.remove('is-center'));

    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;

    let closestSlide = null;
    let closestDistance = Infinity;

    slides.forEach(slide => {
      const rect = slide.getBoundingClientRect();
      const slideCenter = rect.left + rect.width / 2;
      const distance = Math.abs(containerCenter - slideCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestSlide = slide;
      }
    });

    if (closestSlide) {
      closestSlide.classList.add('is-center');
    }
  }
});