document.addEventListener('DOMContentLoaded', () => {
  i18n.init();

  const scrollBtn = document.getElementById('scrollTop');
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    scrollBtn.classList.toggle('visible', window.scrollY > 400);
    navbar.style.padding = window.scrollY > 60 ? '12px 6%' : '18px 6%';
  });

  const statNums = document.querySelectorAll('.stat-num');
  const statObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        statObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity .6s, transform .6s';
    statObs.observe(el);
  });

  const cards = document.querySelectorAll('.service-card, .review-card, .price-row');
  const cardObs = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 60);
        cardObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity .5s, transform .5s';
    cardObs.observe(el);
  });
});
