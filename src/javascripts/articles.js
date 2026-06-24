document.addEventListener('DOMContentLoaded', () => {
  const hero = document.getElementById('articlesHero');
  const layer = document.getElementById('cursorLayer');
  const preloadImages = document.querySelectorAll('.articlesHero__preload img');

  if (!hero || !layer || !preloadImages.length) return;

  const images = Array.from(preloadImages).map((img) => img.src);
  const isMobile = window.matchMedia('(max-width: 780px)').matches;

  if (isMobile) {
    initMobileArticleClusters(hero, layer, images);
    return;
  }

  initDesktopArticleCursor(hero, layer, images);
});

function initDesktopArticleCursor(hero, layer, images) {
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

    if (dist < 18) return;

    lastX = x;
    lastY = y;

    createArticleTrailItem(
      layer,
      images[imageIndex],
      x,
      y,
      null,
      randomBetween(-18, 18),
      700
    );

    repeatCount += 1;

    if (repeatCount >= 4) {
      repeatCount = 0;
      imageIndex += 1;

      if (imageIndex >= images.length) {
        imageIndex = 0;
      }
    }

    limitTrailItems(layer, 24);
  });

  hero.addEventListener('mouseleave', () => {
    layer.innerHTML = '';
  });
}

function initMobileArticleClusters(hero, layer, images) {
  const clusters = [
    [
      { x: 36, y: 19, size: 110, rotate: -12 },
      { x: 44, y: 18, size: 112, rotate: 8 },
      { x: 53, y: 20, size: 118, rotate: -6 }
    ],
    [
      { x: 68, y: 23, size: 96, rotate: 10 },
      { x: 74, y: 30, size: 104, rotate: -8 },
      { x: 70, y: 37, size: 98, rotate: 6 }
    ],
    [
      { x: 59, y: 61, size: 108, rotate: -8 },
      { x: 67, y: 66, size: 116, rotate: 10 },
      { x: 72, y: 71, size: 108, rotate: -5 }
    ]
  ];

  let clusterIndex = 0;
  let imageIndex = 0;

  function showCluster() {
    const cluster = clusters[clusterIndex];

    cluster.forEach((point, index) => {
      const image = images[(imageIndex + index) % images.length];

      setTimeout(() => {
        createArticleTrailItem(
          layer,
          image,
          (point.x / 100) * hero.clientWidth,
          (point.y / 100) * hero.clientHeight,
          point.size,
          point.rotate,
          1800
        );
      }, index * 120);
    });

    imageIndex += cluster.length;
    clusterIndex += 1;

    if (clusterIndex >= clusters.length) {
      clusterIndex = 0;
    }

    limitTrailItems(layer, 18);
  }

  showCluster();

  window.articleClusterInterval = setInterval(showCluster, 1900);
}

function createArticleTrailItem(layer, image, x, y, size, rotate, lifetime) {
  const item = document.createElement('div');

  item.className = 'articlesHero__trailItem';
  item.style.left = `${x}px`;
  item.style.top = `${y}px`;
  item.style.backgroundImage = `url("${image}")`;
  item.style.transform = `translate(-50%, -50%) rotate(${rotate}deg)`;

  if (size !== null) {
    item.style.width = `${size}px`;
  }

  layer.appendChild(item);

  setTimeout(() => {
    item.classList.add('is-fade');
  }, lifetime * 0.55);

  setTimeout(() => {
    if (item.parentNode) {
      item.parentNode.removeChild(item);
    }
  }, lifetime);
}

function limitTrailItems(layer, maxItems) {
  const items = layer.querySelectorAll('.articlesHero__trailItem');

  if (items.length <= maxItems) return;

  const extraCount = items.length - maxItems;

  for (let i = 0; i < extraCount; i += 1) {
    items[i].remove();
  }
}

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