const clamp02 = (v) => Math.min(1, Math.max(0, v));

document.addEventListener('DOMContentLoaded', () => {
  const stack = document.getElementById('testsStack');
  const panel2 = document.getElementById('tPanel2');
  
  // Если элементов нет на странице — просто выходим
  if (!stack || !panel2) return;

  let ticking = false;

  function update(){
    ticking = false;

    const rect = stack.getBoundingClientRect();
    const vh = window.innerHeight;

    // медленнее: 1.25 экрана на подъем
    const progress = clamp02((-rect.top) / (vh * 0.20));

    panel2.style.transform = `translateY(${(1 - progress) * 100}%)`;
  }

  function onScroll(){
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
});

const clamp01 = (v) => Math.min(1, Math.max(0, v));

const QUIZ = [
  // БЛОК 1
  { blockLabel: 'БЛОК 1.', blockTitle: 'КАК ТЫ СМОТРИШЬ?', id: 1, type: 'single',
    text: '1. Когда ты видишь новое пространство, что замечаешь первым?',
    options: [
      { key: 'A', label: 'Свет и атмосферу' },
      { key: 'B', label: 'Композицию и расположение объектов' },
      { key: 'C', label: 'Мелкие детали' },
      { key: 'D', label: 'Общее настроение' },
    ],
  },
  { blockLabel: 'БЛОК 1.', blockTitle: 'КАК ТЫ СМОТРИШЬ?', id: 2, type: 'single',
    text: '2. Ты чаще смотришь на…',
    options: [
      { key: 'A', label: 'Лица' },
      { key: 'B', label: 'Текстуры' },
      { key: 'C', label: 'Движение' },
      { key: 'D', label: 'Формы' },
    ],
  },
  { blockLabel: 'БЛОК 1.', blockTitle: 'КАК ТЫ СМОТРИШЬ?', id: 3, type: 'scale',
    text: '3. Насколько легко ты замечаешь небольшие изменения в привычных местах?',
    min: 1, max: 10, leftLabel: '1 — почти не замечаю', rightLabel: '10 — замечаю сразу',
  },
  { blockLabel: 'БЛОК 1.', blockTitle: 'КАК ТЫ СМОТРИШЬ?', id: 4, type: 'single',
    text: '4. Если смотришь на картину или фото, ты…',
    options: [
      { key: 'A', label: 'Вглядываешься в детали' },
      { key: 'B', label: 'Считываешь идею' },
      { key: 'C', label: 'Ловишь ощущение' },
      { key: 'D', label: 'Думаешь о контексте' },
    ],
  },
  { blockLabel: 'БЛОК 1.', blockTitle: 'КАК ТЫ СМОТРИШЬ?', id: 5, type: 'single',
    text: '5. Что тебя быстрее зацепит?',
    options: [
      { key: 'A', label: 'Необычный цвет' },
      { key: 'B', label: 'Странная форма' },
      { key: 'C', label: 'Непривычное сочетание' },
      { key: 'D', label: 'Тишина и пустота' },
    ],
  },

  // БЛОК 2
  { blockLabel: 'БЛОК 2.', blockTitle: 'КАК ТЫ НАХОДИШЬ ВДОХНОВЕНИЕ?', id: 6, type: 'multi', maxSelect: 3,
    text: '6. Где ты чаще всего находишь вдохновение?',
    options: [
      { key: 'A', label: 'В случайных мелочах' },
      { key: 'B', label: 'В книгах' },
      { key: 'C', label: 'В людях' },
      { key: 'D', label: 'В музыке' },
      { key: 'E', label: 'В интернете' },
      { key: 'F', label: 'В природе' },
    ],
  },
  { blockLabel: 'БЛОК 2.', blockTitle: 'КАК ТЫ НАХОДИШЬ ВДОХНОВЕНИЕ?', id: 7, type: 'single',
    text: '7. Если чувствуешь выгорание, ты…',
    options: [
      { key: 'A', label: 'Уходишь в тишину' },
      { key: 'B', label: 'Начинаешь искать референсы' },
      { key: 'C', label: 'Переключаешься на другое' },
      { key: 'D', label: 'Анализируешь, что пошло не так' },
    ],
  },
  { blockLabel: 'БЛОК 2.', blockTitle: 'КАК ТЫ НАХОДИШЬ ВДОХНОВЕНИЕ?', id: 8, type: 'scale',
    text: '8. Насколько часто тебя вдохновляет повседневность?',
    min: 1, max: 10, leftLabel: '1 — почти никогда', rightLabel: '10 — очень часто',
  },
  { blockLabel: 'БЛОК 2.', blockTitle: 'КАК ТЫ НАХОДИШЬ ВДОХНОВЕНИЕ?', id: 9, type: 'single',
    text: '9. Что чаще становится отправной точкой идеи?',
    options: [
      { key: 'A', label: 'Деталь' },
      { key: 'B', label: 'Эмоция' },
      { key: 'C', label: 'История' },
      { key: 'D', label: 'Форма' },
    ],
  },
  { blockLabel: 'БЛОК 2.', blockTitle: 'КАК ТЫ НАХОДИШЬ ВДОХНОВЕНИЕ?', id: 10, type: 'single',
    text: '10. Когда видишь что-то интересное, ты…',
    options: [
      { key: 'A', label: 'Сохраняешь' },
      { key: 'B', label: 'Запоминаешь' },
      { key: 'C', label: 'Анализируешь' },
      { key: 'D', label: 'Сразу применяешь' },
    ],
  },

  // БЛОК 3
  { blockLabel: 'БЛОК 3.', blockTitle: 'КАК ТЫ СОБИРАЕШЬ?', id: 11, type: 'single',
    text: '11. У тебя есть папка с референсами?',
    options: [
      { key: 'A', label: 'Да, и всё разложено' },
      { key: 'B', label: 'Да, но хаотично' },
      { key: 'C', label: 'Частично' },
      { key: 'D', label: 'Нет' },
    ],
  },
  { blockLabel: 'БЛОК 3.', blockTitle: 'КАК ТЫ СОБИРАЕШЬ?', id: 12, type: 'single',
    text: '12. Ты больше…',
    options: [
      { key: 'A', label: 'Архиватор' },
      { key: 'B', label: 'Интуитивщик' },
      { key: 'C', label: 'Аналитик' },
      { key: 'D', label: 'Импульсивный экспериментатор' },
    ],
  },
  { blockLabel: 'БЛОК 3.', blockTitle: 'КАК ТЫ СОБИРАЕШЬ?', id: 13, type: 'multi', maxSelect: 6,
    text: '13. Что ты делаешь с интересной идеей?',
    options: [
      { key: 'A', label: 'Сохраняю' },
      { key: 'B', label: 'Перерабатываю' },
      { key: 'C', label: 'Оставляю как есть' },
      { key: 'D', label: 'Делаю скрин' },
      { key: 'E', label: 'Применяю сразу' },
    ],
  },
  { blockLabel: 'БЛОК 3.', blockTitle: 'КАК ТЫ СОБИРАЕШЬ?', id: 14, type: 'scale',
    text: '14. Насколько тебе важно понимать, почему что-то работает?',
    min: 1, max: 10, leftLabel: '1 — не важно', rightLabel: '10 — очень важно',
  },
  { blockLabel: 'БЛОК 3.', blockTitle: 'КАК ТЫ СОБИРАЕШЬ?', id: 15, type: 'single',
    text: '15. Ты чаще вдохновляешься…',
    options: [
      { key: 'A', label: 'Структурой' },
      { key: 'B', label: 'Эмоцией' },
      { key: 'C', label: 'Деталью' },
      { key: 'D', label: 'Контекстом' },
    ],
  },

  // БЛОК 4
  { blockLabel: 'БЛОК 4.', blockTitle: 'ЧТО ТЕБЯ ОТЛИЧАЕТ?', id: 16, type: 'single',
    text: '16. Что для тебя “сильная работа”?',
    options: [
      { key: 'A', label: 'Чистая и продуманная' },
      { key: 'B', label: 'Эмоциональная' },
      { key: 'C', label: 'Необычная' },
      { key: 'D', label: 'Тихая, но глубокая' },
    ],
  },
  { blockLabel: 'БЛОК 4.', blockTitle: 'ЧТО ТЕБЯ ОТЛИЧАЕТ?', id: 17, type: 'scale',
    text: '17. Насколько ты чувствителен к визуальному шуму?',
    min: 1, max: 10, leftLabel: '1 — почти не чувствую', rightLabel: '10 — очень чувствую',
  },
  { blockLabel: 'БЛОК 4.', blockTitle: 'ЧТО ТЕБЯ ОТЛИЧАЕТ?', id: 18, type: 'multi', maxSelect: 6,
    text: '18. Что тебе ближе?',
    options: [
      { key: 'A', label: 'Минимализм' },
      { key: 'B', label: 'Сложность' },
      { key: 'C', label: 'Контраст' },
      { key: 'D', label: 'Нежность' },
      { key: 'E', label: 'Графичность' },
      { key: 'F', label: 'Живость' },
    ],
  },
  { blockLabel: 'БЛОК 4.', blockTitle: 'ЧТО ТЕБЯ ОТЛИЧАЕТ?', id: 19, type: 'single',
    text: '19. Ты чаще…',
    options: [
      { key: 'A', label: 'Замечаешь детали' },
      { key: 'B', label: 'Чувствуешь атмосферу' },
      { key: 'C', label: 'Строишь структуру' },
      { key: 'D', label: 'Видишь историю' },
    ],
  },
  { blockLabel: 'БЛОК 4.', blockTitle: 'ЧТО ТЕБЯ ОТЛИЧАЕТ?', id: 20, type: 'single',
    text: '20. Если описать твой способ смотреть одним словом, это:',
    options: [
      { key: 'A', label: 'Внимательный' },
      { key: 'B', label: 'Чувствительный' },
      { key: 'C', label: 'Системный' },
      { key: 'D', label: 'Интуитивный' },
    ],
  },
];

document.addEventListener('DOMContentLoaded', () => {
  const intro = document.getElementById('qIntro');
  const startBtn = document.getElementById('qStartBtn');
  const wrap = document.getElementById('quizWrap');

  const topMeta = document.querySelector('.quizTop__small');
  const topTitle = document.querySelector('.quizTop__title');
  const card = document.querySelector('.quizCard');
  const btnNext = document.getElementById('quizNextBtn');

  if (!intro || !startBtn || !wrap || !topMeta || !topTitle || !card || !btnNext) return;

  wrap.classList.add('is-blurred');

  let index = 0;
  const answers = {};

  function current() { return QUIZ[index]; }

  function hasAnswer(q) {
    const v = answers[q.id];
    if (q.type === 'single') return typeof v === 'string';
    if (q.type === 'scale') return typeof v === 'number';
    if (q.type === 'multi') return Array.isArray(v) && v.length > 0;
    return false;
  }

  function setBtnState() {
    const q = current();
    btnNext.disabled = !hasAnswer(q);
    btnNext.classList.toggle('is-disabled', btnNext.disabled);
  }

  function render() {
    const q = current();

    topMeta.textContent = q.blockLabel;
    topTitle.textContent = q.blockTitle;

    card.innerHTML = '';

    const h = document.createElement('h2');
    h.className = 'qTitle';
    h.textContent = q.text;
    card.appendChild(h);

    if (q.type === 'single') renderSingle(q);
    if (q.type === 'multi') renderMulti(q);
    if (q.type === 'scale') renderScale(q);

    setBtnState();
  }

  function renderSingle(q) {
    const wrap = document.createElement('div');
    wrap.className = 'qOptions';

    q.options.forEach((opt) => {
      const label = document.createElement('label');
      label.className = 'qOpt';

      const input = document.createElement('input');
      input.type = 'radio';
      input.name = `q_${q.id}`;
      input.value = opt.key;
      input.checked = answers[q.id] === opt.key;

      const dot = document.createElement('span');
      dot.className = 'qOpt__dot';

      const txt = document.createElement('span');
      txt.className = 'qOpt__text';
      txt.textContent = opt.label;

      label.addEventListener('click', () => {
        answers[q.id] = opt.key;
        input.checked = true;
        setBtnState();
      });

      label.appendChild(input);
      label.appendChild(dot);
      label.appendChild(txt);
      wrap.appendChild(label);
    });

    card.appendChild(wrap);
  }

  function renderMulti(q) {
    const wrap = document.createElement('div');
    wrap.className = 'qOptions';

    if (!Array.isArray(answers[q.id])) answers[q.id] = [];

    const info = document.createElement('div');
    info.className = 'qHint';
    info.textContent = `Можно выбрать до ${q.maxSelect}.`;
    card.appendChild(info);

    q.options.forEach((opt) => {
      const label = document.createElement('label');
      label.className = 'qOpt';

      const input = document.createElement('input');
      input.type = 'checkbox';
      input.value = opt.key;
      input.checked = answers[q.id].includes(opt.key);

      const dot = document.createElement('span');
      dot.className = 'qOpt__dot';

      const txt = document.createElement('span');
      txt.className = 'qOpt__text';
      txt.textContent = opt.label;

      label.addEventListener('click', (e) => {
        e.preventDefault();

        let arr = Array.isArray(answers[q.id]) ? [...answers[q.id]] : [];
        const exists = arr.includes(opt.key);

        if (!exists) {
          if (arr.length >= q.maxSelect) return;
          arr.push(opt.key);
        } else {
          arr = arr.filter((k) => k !== opt.key);
        }

        answers[q.id] = arr;
        input.checked = !exists;
        setBtnState();
      });

      label.appendChild(input);
      label.appendChild(dot);
      label.appendChild(txt);
      wrap.appendChild(label);
    });

    card.appendChild(wrap);
  }

  function renderScale(q) {
    const box = document.createElement('div');
    box.className = 'qScale';

    const value = typeof answers[q.id] === 'number' ? answers[q.id] : 5;

    const range = document.createElement('input');
    range.type = 'range';
    range.min = String(q.min);
    range.max = String(q.max);
    range.value = String(value);
    range.className = 'qScale__range';

    const labels = document.createElement('div');
    labels.className = 'qScale__labels';

    const left = document.createElement('div');
    left.className = 'qScale__left';
    left.textContent = q.leftLabel || '';

    const right = document.createElement('div');
    right.className = 'qScale__right';
    right.textContent = q.rightLabel || '';

    labels.appendChild(left);
    labels.appendChild(right);

    answers[q.id] = Number(range.value);

    range.addEventListener('input', () => {
      answers[q.id] = Number(range.value);
      setBtnState();
    });

    box.appendChild(range);
    box.appendChild(labels);
    card.appendChild(box);
  }

  startBtn.addEventListener('click', () => {
    intro.classList.add('is-hidden');
    intro.setAttribute('aria-hidden', 'true');
    wrap.classList.remove('is-blurred');
    render();
  });

  btnNext.addEventListener('click', () => {
    const q = current();
    if (!hasAnswer(q)) return;

    index += 1;

    if (index >= QUIZ.length) {

     
        btnNext.style.display = 'none';
      
        const scores = calcScores(answers);
        const key = pickProfile(scores);
        const p = PROFILES[key];
      
        const res = document.getElementById('quizResult');
        const resTitle = document.getElementById('resTitle');
        const resLead = document.getElementById('resLead');
        const resText = document.getElementById('resText');
        const resTips = document.getElementById('resTips');
      
        resTitle.textContent = p.title;
        resLead.textContent = p.lead;
        resText.innerHTML = p.text.map(t => `<p>${t}</p>`).join('');
        resTips.innerHTML = p.tips.map(t => `<div class="tip">${t}</div>`).join('');
      
        res.classList.add('is-show');
        res.setAttribute('aria-hidden', 'false');
      
        return;
      }
      
      const resRestart = document.getElementById('resRestart');
      const res = document.getElementById('quizResult');
      
      if (resRestart && res) {
        resRestart.addEventListener('click', () => {
          // сброс
          index = 0;
          for (const k in answers) delete answers[k];
      
          res.classList.remove('is-show');
          res.setAttribute('aria-hidden', 'true');
      
          // вернуть интро (по желанию). если хочешь сразу на 1 вопрос — убери 2 строки ниже
          intro.classList.remove('is-hidden');
          wrap.classList.add('is-blurred');
      
          btnNext.disabled = true;
          btnNext.classList.add('is-disabled');
          window.scrollTo({ top: 0, behavior: 'instant' });
        });
      }
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // чтобы на старте была неактивная кнопка
  btnNext.disabled = true;
  btnNext.classList.add('is-disabled');
});


/* ===== Result profiles ===== */
const PROFILES = {
    collector: {
      title: 'Коллекционер деталей',
      lead: 'Тебя цепляет микро-жизнь вещей: шов, след времени, случайная тень.',
      text: [
        'Ты смотришь не “в целом”, а внутрь — как будто собираешь мир по частицам.',
        'Твоя сила — находить смысл там, где остальные проходят мимо.',
      ],
      tips: [
        'Веди “архив мелочей”: 3 фото деталей в день (фактура, трещина, шрифт, отражение).',
        'Раз в неделю делай из архива мини-коллаж: ты увидишь свои паттерны.',
        'Когда застряла — ищи не вдохновение, а одну деталь-ключ.',
      ],
      accent: 'detail',
    },
  
    moodhunter: {
      title: 'Охотник за настроением',
      lead: 'Ты ловишь атмосферу быстрее, чем форму — воздух, свет, чувство момента.',
      text: [
        'Ты читаешь пространство как музыку: где тише, где громче, где пауза.',
        'Твоя сила — создавать ощущение, которое трудно объяснить, но невозможно забыть.',
      ],
      tips: [
        'Собирай “палитры настроения”: 5 кадров под одно чувство (тепло/тревога/тишина).',
        'Пробуй описывать увиденное одним словом — это твой главный компас.',
        'Если устала — не анализируй: просто смени среду и “подыши глазами”.',
      ],
      accent: 'mood',
    },
  
    archivist: {
      title: 'Архиватор',
      lead: 'Ты умеешь собирать хаос в систему — и это твоя суперсила.',
      text: [
        'Там, где другим “слишком много”, ты видишь структуру и порядок.',
        'Ты создаёшь основу: каталоги, подборки, связи, логика — всё становится яснее рядом с тобой.',
      ],
      tips: [
        'Раздели референсы на 3 папки: “форма”, “настроение”, “приём”.',
        'Каждой сохранённой картинке добавляй 1 строку “почему сработало”.',
        'Раз в месяц делай чистку: оставляй только то, что реально твоё.',
      ],
      accent: 'structure',
    },
  
    explorer: {
      title: 'Импульсный исследователь',
      lead: 'Ты запускаешь идеи движением — пробой, попыткой, экспериментом.',
      text: [
        'Тебе важно не “понять”, а “проверить”: ты думаешь руками и взглядом.',
        'Твоя сила — быстро находить новое и не бояться странного.',
      ],
      tips: [
        'Правило 10 минут: увидела — сразу попробуй мини-версию (набросок/макет/кадр).',
        'Сделай “коробку экспериментов”: 1 приём в день без оценки результата.',
        'Когда перегруз — выбери один параметр и играй только им (цвет/форма/ритм).',
      ],
      accent: 'impulse',
    },
  
    quiet: {
      title: 'Тихий наблюдатель',
      lead: 'Ты замечаешь то, что проявляется не сразу — глубину, паузу, смысл между строк.',
      text: [
        'Ты не торопишься. И именно поэтому видишь честнее.',
        'Твоя сила — в выдержке и тонкой чувствительности к “лишнему”.',
      ],
      tips: [
        'Оставляй больше воздуха: убери 1 элемент и посмотри, стало ли сильнее.',
        'Практика “30 секунд”: смотри на вещь дольше обычного — смысл проявится.',
        'Если сомневаешься — выбирай тихое решение: оно чаще точнее.',
      ],
      accent: 'observe',
    },
  
    editor: {
      title: 'Смысловой редактор',
      lead: 'Ты видишь не только “что”, но и “зачем” — и умеешь собрать из этого историю.',
      text: [
        'Ты считываешь контекст, связи, подтексты — и превращаешь ощущение в ясную идею.',
        'Твоя сила — делать работу цельной и осмысленной.',
      ],
      tips: [
        'Перед началом формулируй 1 фразу: “эта работа про…”.',
        'Проверяй композицию вопросом: “что здесь главное?”',
        'Ищи противоречие: там часто рождается самый сильный смысл.',
      ],
      accent: 'act',
    },
  };
  
  /* ===== Scoring ===== */
  function calcScores(answers) {
    const s = { detail: 0, mood: 0, structure: 0, impulse: 0, observe: 0, act: 0 };
  
    const add = (key, val = 1) => { s[key] += val; };
  
    // Q1
    if (answers[1] === 'A') add('mood', 2);
    if (answers[1] === 'B') add('structure', 2);
    if (answers[1] === 'C') add('detail', 2);
    if (answers[1] === 'D') add('mood', 1), add('observe', 1);
  
    // Q2
    if (answers[2] === 'A') add('mood', 1), add('observe', 1);
    if (answers[2] === 'B') add('detail', 2);
    if (answers[2] === 'C') add('act', 2);
    if (answers[2] === 'D') add('structure', 2);
  
    // Q3 scale 1-10:
    if (typeof answers[3] === 'number') {
      const v = answers[3]; // 1..10
      add('detail', v >= 7 ? 2 : v >= 4 ? 1 : 0);
      add('observe', v >= 7 ? 2 : v >= 4 ? 1 : 0);
    }
  
    // Q4
    if (answers[4] === 'A') add('detail', 2);
    if (answers[4] === 'B') add('structure', 1), add('act', 1);
    if (answers[4] === 'C') add('mood', 2);
    if (answers[4] === 'D') add('structure', 2);
  
    // Q5
    if (answers[5] === 'A') add('detail', 1), add('mood', 1);
    if (answers[5] === 'B') add('impulse', 2);
    if (answers[5] === 'C') add('impulse', 1), add('structure', 1);
    if (answers[5] === 'D') add('mood', 2), add('observe', 1);
  
    // Q6 multi (до 3)
    const q6 = answers[6] || [];
    if (q6.includes('A')) add('detail', 1);
    if (q6.includes('B')) add('structure', 1);
    if (q6.includes('C')) add('mood', 1);
    if (q6.includes('D')) add('mood', 1);
    if (q6.includes('E')) add('impulse', 1);
    if (q6.includes('F')) add('observe', 1);
  
    // Q7
    if (answers[7] === 'A') add('observe', 2), add('mood', 1);
    if (answers[7] === 'B') add('structure', 1), add('act', 1);
    if (answers[7] === 'C') add('impulse', 2);
    if (answers[7] === 'D') add('structure', 2);
  
    // Q8 scale: 
    if (typeof answers[8] === 'number') {
      const v = answers[8];
      add('mood', v >= 7 ? 2 : v >= 4 ? 1 : 0);
      add('observe', v >= 7 ? 2 : v >= 4 ? 1 : 0);
    }
  
    // Q9
    if (answers[9] === 'A') add('detail', 2);
    if (answers[9] === 'B') add('mood', 2);
    if (answers[9] === 'C') add('act', 2);
    if (answers[9] === 'D') add('structure', 2);
  
    // Q10
    if (answers[10] === 'A') add('structure', 2);
    if (answers[10] === 'B') add('observe', 2);
    if (answers[10] === 'C') add('structure', 1), add('act', 1);
    if (answers[10] === 'D') add('act', 2), add('impulse', 1);
  
    // Q11
    if (answers[11] === 'A') add('structure', 2);
    if (answers[11] === 'B') add('impulse', 1), add('structure', 1);
    if (answers[11] === 'C') add('structure', 1);
    if (answers[11] === 'D') add('impulse', 1);
  
    // Q12
    if (answers[12] === 'A') add('structure', 2);
    if (answers[12] === 'B') add('mood', 2);
    if (answers[12] === 'C') add('act', 2), add('structure', 1);
    if (answers[12] === 'D') add('impulse', 2);
  
    // Q13 multi
    const q13 = answers[13] || [];
    if (q13.includes('A')) add('structure', 1);
    if (q13.includes('B')) add('act', 1), add('structure', 1);
    if (q13.includes('C')) add('observe', 1);
    if (q13.includes('D')) add('structure', 1);
    if (q13.includes('E')) add('act', 2);
  
    // Q14 
    if (typeof answers[14] === 'number') {
      const v = answers[14];
      add('structure', v >= 7 ? 2 : v >= 4 ? 1 : 0);
      add('act', v >= 7 ? 2 : v >= 4 ? 1 : 0);
    }
  
    // Q15
    if (answers[15] === 'A') add('structure', 2);
    if (answers[15] === 'B') add('mood', 2);
    if (answers[15] === 'C') add('detail', 2);
    if (answers[15] === 'D') add('act', 2);
  
    // Q16
    if (answers[16] === 'A') add('structure', 2);
    if (answers[16] === 'B') add('mood', 2);
    if (answers[16] === 'C') add('impulse', 2);
    if (answers[16] === 'D') add('observe', 2);
  
    // Q17 
    if (typeof answers[17] === 'number') {
      const v = answers[17];
      add('observe', v >= 7 ? 2 : v >= 4 ? 1 : 0);
      add('mood', v >= 7 ? 1 : 0);
    }
  
    // Q18 multi
    const q18 = answers[18] || [];
    if (q18.includes('A')) add('structure', 1);
    if (q18.includes('B')) add('detail', 1);
    if (q18.includes('C')) add('impulse', 1);
    if (q18.includes('D')) add('mood', 1);
    if (q18.includes('E')) add('structure', 1);
    if (q18.includes('F')) add('impulse', 1);
  
    // Q19
    if (answers[19] === 'A') add('detail', 2);
    if (answers[19] === 'B') add('mood', 2);
    if (answers[19] === 'C') add('structure', 2);
    if (answers[19] === 'D') add('act', 2);
  
    // Q20
    if (answers[20] === 'A') add('detail', 1), add('observe', 1);
    if (answers[20] === 'B') add('mood', 1), add('observe', 1);
    if (answers[20] === 'C') add('structure', 2);
    if (answers[20] === 'D') add('impulse', 2), add('act', 1);
  
    return s;
  }
  
  function pickProfile(scores) {
    const dm = scores.detail - scores.mood;         
    const si = scores.structure - scores.impulse;    
    const oa = scores.observe - scores.act;          
    // “карта” профилей (6 вариантов)
    if (dm >= 2 && si >= 1) return 'collector';
    if (dm <= -2 && oa >= 1) return 'moodhunter';
    if (si >= 3 && oa >= 0) return 'archivist';
    if (si <= -2 && oa <= -1) return 'explorer';
    if (oa >= 3) return 'quiet';
    return 'editor';
  }




  function renderScale(q) {
    const box = document.createElement('div');
    box.className = 'qScale';
  
    const track = document.createElement('div');
    track.className = 'qScale__track';
  
    const value = typeof answers[q.id] === 'number' ? answers[q.id] : 5;
  
    const range = document.createElement('input');
    range.type = 'range';
    range.min = String(q.min);
    range.max = String(q.max);
    range.step = '1';
    range.value = String(value);
    range.className = 'qScale__range';
  
    // Деления 1–10
    const ticks = document.createElement('div');
    ticks.className = 'qScale__ticks';
    const tickEls = [];
  
    for (let i = q.min; i <= q.max; i++) {
      const t = document.createElement('div');
      t.className = 'qScale__tick';
      ticks.appendChild(t);
      tickEls.push(t);
    }
  
    function paint() {
      const v = Number(range.value);
      answers[q.id] = v;
  
      // заливка трека
      const pct = ((v - q.min) / (q.max - q.min)) * 100;
      range.style.setProperty('--fill', `${pct}%`);
  
      // подсветка делений 
      tickEls.forEach((el, idx) => {
        const tickValue = q.min + idx;
        el.classList.toggle('is-on', tickValue <= v);
      });
  
      btnNext.disabled = false;
    }
  
    range.addEventListener('input', paint);
    paint(); 
  
    const labels = document.createElement('div');
    labels.className = 'qScale__labels';
  
    const left = document.createElement('div');
    left.className = 'qScale__left';
    left.textContent = q.leftLabel || '';
  
    const right = document.createElement('div');
    right.className = 'qScale__right';
    right.textContent = q.rightLabel || '';
  
    labels.appendChild(left);
    labels.appendChild(right);
  
    track.appendChild(ticks);
    track.appendChild(range);
  
    box.appendChild(track);
    box.appendChild(labels);
    elBody.appendChild(box);
  }
  

