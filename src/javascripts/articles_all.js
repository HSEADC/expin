const ARTICLE_RECOMMENDATIONS = [
    {
      title: 'Случайность.\nКрасота там, где её не планировали.',
      image: '/b5ffa63b5a97c7710acf.png',
      link: './article10.html'
    },
    {
      title: 'Обычные вещи.\nКак найти новые смыслы?',
      image: '/2fa36bb069b6937658b8.png',
      link: './article11.html'
    },
    {
      title: 'Паттерн.\nПовторение как визуальный язык.',
      image: '/8192d4011fe0b8628d98.png',
      link: './article12.html'
    },
    {
      title: 'Образы.\nКак создавать образы из простого?',
      image: '/055013e81324ef62bbf3.png',
      link: './article3.html'
    },
    {
      title: 'Повседневное вдохновение.\nГде искать?',
      image: '/18756674781bba04ab06.png',
      link: './article2.html'
    },
    
    {
        title: 'Насмотренность и вкус.\nКак развивать?',
        image: '/436ffc35ffcaf21b2ef6.png',
        link: './article5.html'
      },
      {
        title: 'Изобилее идей.\nКак не запутаться в мыслях?',
        image: '/6e0d6f32b6ee8140c6ae.png',
        link: './article9.html'
      },
      {
        title: 'Приукрашивания.\n Можно ли разукрасить этот мир?',
        image: '/16f0ec2e711f9ee1427b.png',
        link: './article16.html'
      }

  ];
  
  document.addEventListener('DOMContentLoaded', () => {
    renderRecommendedArticles();
  });
  
  function renderRecommendedArticles() {
    const grid = document.getElementById('recommendedArticles');
    if (!grid) return;
  
    const currentPath = window.location.pathname;
    const pool = ARTICLE_RECOMMENDATIONS.filter((item) => !currentPath.endsWith(item.link.replace('./', '')));
  
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, 3);
  
    grid.innerHTML = shuffled.map((item) => `
      <a class="adRecCard" href="${item.link}">
        <img class="adRecCard__img" src="${item.image}" alt="">
        <div class="adRecCard__body">
          <div class="adRecCard__title">${item.title.replace(/\n/g, '<br>')}</div>
          <div class="adRecCard__link">перейти →</div>
        </div>
      </a>
    `).join('');
  }