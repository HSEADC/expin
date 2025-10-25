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
  