document.addEventListener('DOMContentLoaded', () => {
  const hero = document.getElementById('articlesHero');
  const layer = document.getElementById('cursorLayer');
  const preloadImages = document.querySelectorAll('.articlesHero__preload img');

  console.log('hero:', hero);
  console.log('layer:', layer);
  console.log('preloadImages:', preloadImages.length);

  if (!hero || !layer || !preloadImages.length) return;

  const images = Array.from(preloadImages).map((img) => img.src);

  let imageIndex = 0;
  let repeatCount = 0;
  let lastX = -999;
  let lastY = -999;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const dx = x - lastX;
    const dy = y - lastY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // чтобы хвост не был слишком плотным
    if (dist < 18) return;

    lastX = x;
    lastY = y;

    const item = document.createElement('div');
    item.className = 'articlesHero__trailItem';
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    item.style.backgroundImage = `url("${images[imageIndex]}")`;
    item.style.transform = `translate(-50%, -50%) rotate(${randomBetween(-18, 18)}deg)`;

    layer.appendChild(item);

    // каждая картинка 4 раза подряд
    repeatCount += 1;
    if (repeatCount >= 4) {
      repeatCount = 0;
      imageIndex += 1;
      if (imageIndex >= images.length) imageIndex = 0;
    }

    // плавное исчезновение
    setTimeout(() => {
      item.classList.add('is-fade');
    }, 250);

    setTimeout(() => {
      if (item.parentNode) item.parentNode.removeChild(item);
    }, 700);

    // ограничиваем хвост
    const items = layer.querySelectorAll('.articlesHero__trailItem');
    if (items.length > 24) {
      const first = items[0];
      if (first.parentNode) first.parentNode.removeChild(first);
    }
  });

  hero.addEventListener('mouseleave', () => {
    layer.innerHTML = '';
  });
});

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}









document.addEventListener('DOMContentLoaded', () => {
  initArticleSlider();
});

function initArticleSlider() {
  const track = document.getElementById('articlesSliderTrack');
  if (!track) return;

  const slides = Array.from(track.querySelectorAll('.articleSlide'));
  if (!slides.length) return;

  let activeIndex = Math.min(1, slides.length - 1);

  slides.forEach((slide, index) => {
    slide.addEventListener('click', (e) => {
      if (index === activeIndex) return;
      e.preventDefault();
      activeIndex = index;
      updateSlides();
    });
  });

  function updateSlides() {
    slides.forEach((slide, index) => {
      slide.className = 'articleSlide';

      const delta = index - activeIndex;

      if (delta === 0) slide.classList.add('is-active');
      else if (delta === -1) slide.classList.add('is-left-1');
      else if (delta === 1) slide.classList.add('is-right-1');
      else if (delta === -2) slide.classList.add('is-left-2');
      else if (delta === 2) slide.classList.add('is-right-2');
      else if (delta < -2) slide.classList.add('is-hidden-left');
      else if (delta > 2) slide.classList.add('is-hidden-right');
    });
  }

  updateSlides();
}





const clamp01 = (v) => Math.min(1, Math.max(0, v));

document.addEventListener('DOMContentLoaded', () => {
  const stack = document.getElementById('articlesStack');
  const panel2 = document.getElementById('articlesCardsBlock');
  const panel3 = document.getElementById('siteFooter');

  if (!stack || !panel2 || !panel3) return;

  let ticking = false;

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function update() {
    ticking = false;

    const rect = stack.getBoundingClientRect();
    const vh = window.innerHeight;

    // общая прогрессия по стеку
    const t = Math.max(0, -rect.top / vh);

    /* ===== ПЕРЕХОД 1 -> 2 =====
       старт раньше и короче, чтобы не было длинного пустого скрола
    */
    const p2Raw = clamp01((t - 0.82) / 0.72);
    const p2 = easeOutCubic(p2Raw);
    panel2.style.transform = `translateY(${(1 - p2) * 100}%)`;

    /* ===== ПЕРЕХОД 2 -> 3 =====
       даём футеру чуть длиннее диапазон, чтобы не дёргался
    */
    const p3Raw = clamp01((t - 1.62) / 0.9);
    const p3 = easeOutCubic(p3Raw);
    panel3.style.transform = `translateY(${(1 - p3) * 100}%)`;
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  update();
});