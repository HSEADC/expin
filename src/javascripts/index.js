 import '../stylesheets/style.css'

 
(function initThumbRotators() {
    const thumbs = document.querySelectorAll('.thumb');
    const options = {
      intervalMs: 1500,     
      initialDelayMs: 400    
    };
  
    thumbs.forEach((thumb, idx) => {
      const slides = Array.from(thumb.querySelectorAll('.slide'));
      if (slides.length <= 1) return;
  
      let i = 0;
      const activate = (n) => {
        slides.forEach(s => s.classList.remove('is-active'));
        slides[n].classList.add('is-active');
      };
      activate(0);
  
      const start = () => {
        setInterval(() => {
          i = (i + 1) % slides.length;
          activate(i);
        }, options.intervalMs);
      };
  
      
      setTimeout(start, idx * options.initialDelayMs);
    });
  })();
  


(function syncRightWithImage(){
  const hero = document.querySelector('.hero-container');
  const img = document.querySelector('.headline-img');
  const right = document.querySelector('.right-copy');
  if (!hero || !img || !right) return;

  const applySync = () => {
    const heroRect = hero.getBoundingClientRect();
    const imgRect = img.getBoundingClientRect();
    const topOffset = Math.max(0, imgRect.top - heroRect.top);
    right.style.marginTop = `${topOffset}px`;
    right.style.setProperty('--pair-h', `${imgRect.height}px`);
  };

  const ready = () => applySync();
  let rAF = null;
  const onResize = () => {
    if (rAF) cancelAnimationFrame(rAF);
    rAF = requestAnimationFrame(applySync);
  };

  window.addEventListener('resize', onResize, { passive: true });
  if (img.complete) ready(); else img.addEventListener('load', ready, { once: true });
  if ('ResizeObserver' in window) new ResizeObserver(applySync).observe(img);
})();

