import '../stylesheets/style.css';

/* ===== utils ===== */
const clamp01 = (v) => Math.min(1, Math.max(0, v));
const lerp = (a, b, t) => a + (b - a) * t;
const HOLD_START = 4.0;
const HOLD_END = 4.8;

const PLAN_IN_START = HOLD_END;       // 4.8
const PLAN_IN_END = PLAN_IN_START + 1.2;  // 6.0 (въезд дольше)
const PLAN_HOLD_END = PLAN_IN_END + 1.4;  // 7.4 (пауза на чтение)

const SUB_START = PLAN_HOLD_END;      // 7.4
const SUB_END = SUB_START + 1.2;      // 8.6

const T_MAX = SUB_END;

document.addEventListener('DOMContentLoaded', () => {
  const stack = document.getElementById('stack');

  const panel2 = document.getElementById('panel2'); // S2
  const panel3 = document.getElementById('panel3'); // ZO
  const panel4 = document.getElementById('panel4'); // BIG
  const panel5 = document.getElementById('panel5'); // PLAN
  const panel6 = document.getElementById('panel6'); // SUBSCRIBE

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

  /* ===== таймлайн фаз =====
     0..1  : S2 накрывает HERO
     1..2  : S2 разлёт/blur (--p)
     2..3  : ZO (текст разъезд -> зум)
     3..4  : BIG появляется
     4..4.8: HOLD на BIG (пауза, чтобы успеть прочитать)
     4.8..5.8: PLAN въезжает справа
     5.8..6.8: SUBSCRIBE (если нужно)
  */
  const T_MAX = 6.8;
  const HOLD_START = 4.0;
  const HOLD_END = 4.8;

  let ticking = false;

  function update() {
    ticking = false;

    const rect = stack.getBoundingClientRect();
    const vh = window.innerHeight;

    const t = Math.min(T_MAX, Math.max(0, -rect.top / vh));

    /* --- 0..1: S2 накрывает HERO --- */
    const cover = clamp01(t);
    panel2.style.transform = `translateY(${(1 - cover) * 100}%)`;

    /* --- 1..2: S2 анимация (--p) --- */
    const p = clamp01(t - 1);
    panel2.style.setProperty('--p', p.toFixed(4));

    /* --- 2..3: ZO появляется + внутренние фазы текста/зума --- */
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

    /* --- 3..4: BIG появляется --- */
    if (panel4) {
      const sIn = clamp01(t - 3);
      panel4.style.transform = `translateY(${(1 - sIn) * 100}%)`;
      panel4.style.setProperty('--s', sIn.toFixed(4));
    }

    /* --- HOLD: 4..4.8 держим BIG, не двигаем следующий --- */
    const hold = (t >= HOLD_START && t <= HOLD_END);

    /* --- PLAN: 4.8..5.8 --- */
    if (panel5) {
      const u = hold ? 0 : clamp01((t - HOLD_END) / 1.0); // ровно 1 экран на въезд
      const ease = 1 - Math.pow(1 - u, 3);
      panel5.style.transform = `translateX(${(1 - ease) * 110}%)`;
    }

    /* --- SUBSCRIBE: 5.8..6.8 --- */
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
  // меню: пробуем найти максимально надёжно
  const menu =
    document.querySelector('.siteMenu') ||
    document.querySelector('nav[aria-label="Меню разделов"]');

  // футер: тоже максимально надёжно
  const footerPanel =
    document.getElementById('panelFooter') ||              // если ты так называла
    document.querySelector('.panel--footer') ||            // если есть такой класс
    document.querySelector('footer') ||                    // если у тебя <footer>
    document.querySelector('#footer');                     // если вдруг id="footer"

  if (!menu || !footerPanel) return;

  let raf = 0;

  const setHidden = (hidden) => {
    // ВАЖНО: inline-стили — чтобы точно спряталось
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

    // футер "активен", если он реально находится в зоне видимости
    // (это работает даже со sticky и любыми transform)
    const visible =
      r.bottom > vh * 0.10 &&   // низ футера ниже верхней "полки"
      r.top < vh * 0.90;        // верх футера выше нижней "полки"

    setHidden(visible);
  };

  const onScroll = () => {
    if (raf) return;
    raf = requestAnimationFrame(tick);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  tick(); // стартовое состояние
});
