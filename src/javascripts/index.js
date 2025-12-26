import '../stylesheets/style.css';

/* ===== utils ===== */
const clamp01 = (v) => Math.min(1, Math.max(0, v));
const lerp = (a, b, t) => a + (b - a) * t;
const HOLD_START = 4.0;
const HOLD_END = 4.8;

const PLAN_IN_START = HOLD_END;       
const PLAN_IN_END = PLAN_IN_START + 1.2; 
const PLAN_HOLD_END = PLAN_IN_END + 1.4;  

const SUB_START = PLAN_HOLD_END;  
const SUB_END = SUB_START + 1.2;     

const T_MAX = SUB_END;

document.addEventListener('DOMContentLoaded', () => {
  const stack = document.getElementById('stack');

  const panel2 = document.getElementById('panel2'); 
  const panel3 = document.getElementById('panel3'); 
  const panel4 = document.getElementById('panel4');
  const panel5 = document.getElementById('panel5'); 
  const panel6 = document.getElementById('panel6'); 

  if (!stack || !panel2) return;

  /* ===== ZO: zoomStack base ===== */
  const zoInner = panel3 ? panel3.querySelector('.zoScene__inner') : null;
  const zoomItems = panel3 ? Array.from(panel3.querySelectorAll('.zoomStack__item')) : [];
  const n = zoomItems.length;

  const STACK_BIG = 1.25;
  const STACK_SMALL = 0.55;
  const SPREAD = 18;

  function baseScale(i) {
    if (n <= 1) return 1;
    return lerp(STACK_BIG, STACK_SMALL, i / (n - 1));
  }

  function initZoomStackBase() {
    if (!n) return;

    for (let i = 0; i < n; i++) {
      const b = baseScale(i);
      const tx = (i - (n - 1) / 2) * (SPREAD * 0.45);
      const ty = i * (SPREAD * 0.22);

      zoomItems[i].style.setProperty('--sc', b.toFixed(4));
      zoomItems[i].style.setProperty('--tx', `${tx.toFixed(2)}px`);
      zoomItems[i].style.setProperty('--ty', `${ty.toFixed(2)}px`);
      zoomItems[i].style.opacity = '1';
      zoomItems[i].style.zIndex = String(i + 1);
    }
  }

  initZoomStackBase();

  const T_MAX = 6.8;
  const HOLD_START = 4.0;
  const HOLD_END = 4.8;

  let ticking = false;

  function update() {
    ticking = false;

    const rect = stack.getBoundingClientRect();
    const vh = window.innerHeight;

    const t = Math.min(T_MAX, Math.max(0, -rect.top / vh));

    
    const cover = clamp01(t);
    panel2.style.transform = `translateY(${(1 - cover) * 100}%)`;
    const p = clamp01(t - 1);
    panel2.style.setProperty('--p', p.toFixed(4));

   
    if (panel3) {
      const q = clamp01((p - 0.15) / 0.85);
      panel3.style.transform = `translateY(${(1 - q) * 100}%)`;
      panel3.style.setProperty('--q', q.toFixed(4));

      const r = clamp01(t - 2);
      const split = 0.45;
      const r1 = clamp01(r / split);
      const r2 = clamp01((r - split) / (1 - split));

      if (zoInner) {
        zoInner.style.setProperty('--r1', r1.toFixed(4));
        zoInner.style.setProperty('--r2', r2.toFixed(4));
      }
    }

    
    if (panel4) {
      const sIn = clamp01(t - 3);
      panel4.style.transform = `translateY(${(1 - sIn) * 100}%)`;
      panel4.style.setProperty('--s', sIn.toFixed(4));
    }

    
    const hold = (t >= HOLD_START && t <= HOLD_END);

 
    if (panel5) {
      const u = hold ? 0 : clamp01((t - HOLD_END) / 1.0); 
      const ease = 1 - Math.pow(1 - u, 3);
      panel5.style.transform = `translateX(${(1 - ease) * 110}%)`;
    }

    if (panel6) {
      const v = clamp01((t - (HOLD_END + 1.0)) / 1.0);
      panel6.style.transform = `translateY(${(1 - v) * 110}%)`;
    }
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => {
    initZoomStackBase();
    onScroll();
  }, { passive: true });

  update();

  /* ===== SUBSCRIBE form clear ===== */
  const form = document.getElementById('subscribeForm');
  const input = document.getElementById('subscribeEmail');
  if (form && input) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      input.value = '';
      input.blur();
    });
  }
});


document.addEventListener('DOMContentLoaded', () => {
  
  const menu =
    document.querySelector('.siteMenu') ||
    document.querySelector('nav[aria-label="Меню разделов"]');


  const footerPanel =
    document.getElementById('panelFooter') ||     
    document.querySelector('.panel--footer') ||  
    document.querySelector('footer') ||                    
    document.querySelector('#footer');                     

  if (!menu || !footerPanel) return;

  let raf = 0;

  const setHidden = (hidden) => {
   
    menu.style.opacity = hidden ? '0' : '1';
    menu.style.pointerEvents = hidden ? 'none' : 'auto';
    menu.style.transform = hidden
      ? 'translateX(-50%) translateY(16px)'
      : 'translateX(-50%) translateY(0px)';
    menu.style.transition = 'opacity .35s ease, transform .35s ease';
  };

  const tick = () => {
    raf = 0;

    const r = footerPanel.getBoundingClientRect();
    const vh = window.innerHeight;

   

    const visible =
      r.bottom > vh * 0.10 &&  
      r.top < vh * 0.90;      

    setHidden(visible);
  };

  const onScroll = () => {
    if (raf) return;
    raf = requestAnimationFrame(tick);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  tick(); 
});
