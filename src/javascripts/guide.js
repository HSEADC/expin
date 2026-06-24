document.addEventListener('DOMContentLoaded', () => {
    initGuidesStack();
  });
  
  function initGuidesStack() {
    const stackWrap = document.querySelector('.guidesStackWrap');
    const stack = document.getElementById('guidesStack');
    if (!stackWrap || !stack) return;
  
    const slides = Array.from(stack.querySelectorAll('.guideSlide'));
    if (slides.length !== 4) return;
  
    let wheelLock = false;
  

    let order = [0, 1, 2, 3];
  
    function render() {
      slides.forEach((slide) => {
        slide.classList.remove(
          'is-active',
          'is-prev-1',
          'is-prev-2',
          'is-prev-3',
          'is-hidden'
        );
      });
  
      slides[order[0]].classList.add('is-prev-3');
      slides[order[1]].classList.add('is-prev-2');
      slides[order[2]].classList.add('is-prev-1');
      slides[order[3]].classList.add('is-active');
    }
  
    function nextSlide() {
      const active = order.pop();
      order.unshift(active);
      render();
    }
  
    function prevSlide() {
      const back = order.shift();
      order.push(back);
      render();
    }
  
    function isInsideSlider(target) {
      return !!target.closest('.guidesStackWrap');
    }
  
    function handleWheel(delta) {
      if (wheelLock) return;
      if (Math.abs(delta) < 10) return;
  
      wheelLock = true;
  
      if (delta > 0) nextSlide();
      else prevSlide();
  
      setTimeout(() => {
        wheelLock = false;
      }, 420);
    }
  
    
    window.addEventListener('wheel', (e) => {
      if (!isInsideSlider(e.target)) return;
  
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < 10) return;
  
      e.preventDefault();
      e.stopPropagation();
  
      handleWheel(delta);
    }, { passive: false, capture: true });
  
    slides.forEach((slide) => {
      slide.addEventListener('click', (e) => {
        const clickedIndex = slides.indexOf(slide);
        const activeIndex = order[3];
  

        if (clickedIndex === activeIndex) return;
  
 
        e.preventDefault();
  
        while (order[3] !== clickedIndex) {
          nextSlide();
        }
      });
    });
  
    let touchStartX = 0;
    let touchStartY = 0;
  
    stackWrap.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });
  
    stackWrap.addEventListener('touchmove', (e) => {
      const dx = e.touches[0].clientX - touchStartX;
      const dy = e.touches[0].clientY - touchStartY;
  
      
      if (Math.abs(dx) > Math.abs(dy)) {
        e.preventDefault();
      }
    }, { passive: false });
  
    stackWrap.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
  
      if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
  
      if (dx < 0) nextSlide();
      else prevSlide();
    }, { passive: true });
  
    render();
  }



  


 

  const clamp01 = (v) => Math.min(1, Math.max(0, v));

document.addEventListener('DOMContentLoaded', () => {
  const scene = document.getElementById('guideScene');
  const text = document.getElementById('guideText');
  const cards = Array.from(document.querySelectorAll('.guideCard'));
  const isMobile = window.matchMedia('(max-width: 820px)').matches;

  if (!scene || !text || !cards.length) return;

  let ticking = false;
  function update() {
    ticking = false;
  
    const rect = scene.getBoundingClientRect();
    const vh = window.innerHeight;
  
    const p = clamp01(-rect.top / (vh * 1.15));
  
    /* ТЕКСТ: стартует раньше */
    const textProgress = clamp01((p - 0.00) / 0.42);
    const textX = -1650 * textProgress;
    const textOpacity = 1 - textProgress * 0.22;
  
    text.style.transform = `translate(-50%, -50%) translateX(${textX}px)`;
    text.style.opacity = String(textOpacity);
  
    /* КАРТИНКИ: стартуют позже */
    const cardsProgress = clamp01((p - 0.05) / 0.82);
  
    let spacing = 560;
    let start = 1300;
    let flow = -2450 * cardsProgress;

    if (isMobile) {
      spacing = 450;
      start = 500;
}
  
    cards.forEach((card, index) => {
      const appear = clamp01((cardsProgress - index * 0.10) / 0.34);
  
      const x = start + index * spacing + flow;
      const scale = 0.92 + appear * 0.08;
      const opacity = appear;
  
      card.style.opacity = String(opacity);
      card.style.transform =
        `translate(-50%, -50%) translateX(${x}px) scale(${scale})`;
    });
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