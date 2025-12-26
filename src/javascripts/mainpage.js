document.addEventListener("DOMContentLoaded", () => {
    const next = document.querySelector(".next--reveal");
    if (!next) return;
  
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) next.classList.add("is-visible");
        });
      },
      { threshold: 0.15 }
    );
  
    io.observe(next);
  });
  