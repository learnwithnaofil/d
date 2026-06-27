
// Global Campus, Bhiwandi - static website interactions
(function(){
  const body = document.body;
  body.classList.add('page-loaded');

  const header = document.querySelector('.site-header');
  const backToTop = document.querySelector('.back-to-top');
  const onScroll = () => {
    if(header) header.classList.toggle('scrolled', window.scrollY > 20);
    if(backToTop) backToTop.classList.toggle('show', window.scrollY > 460);
  };
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if(menuToggle && navMenu){
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', navMenu.classList.contains('open'));
    });
  }

  document.querySelectorAll('.nav-item.has-dropdown > .nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      if(window.innerWidth <= 1080){
        e.preventDefault();
        link.closest('.nav-item').classList.toggle('open');
      }
    });
  });

  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if(href === current) link.classList.add('active');
  });

  const revealEls = document.querySelectorAll('.reveal, [data-animate]');
  if('IntersectionObserver' in window){
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold:.14});
    revealEls.forEach(el => observer.observe(el));
  }else{
    revealEls.forEach(el => el.classList.add('visible'));
  }

  const counters = document.querySelectorAll('[data-counter]');
  const animateCounter = (el) => {
    const target = Number(el.dataset.counter || 0);
    const suffix = el.dataset.suffix || '+';
    let start = 0;
    const duration = 1200;
    const t0 = performance.now();
    const step = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      const val = Math.floor(target * (1 - Math.pow(1 - p, 3)));
      el.textContent = val + suffix;
      if(p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if('IntersectionObserver' in window){
    const counterObserver = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, {threshold:.6});
    counters.forEach(c => counterObserver.observe(c));
  }else counters.forEach(animateCounter);

  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      galleryItems.forEach(item => {
        item.classList.toggle('hide', filter !== 'all' && item.dataset.category !== filter);
      });
    });
  });

  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      q.closest('.faq-item').classList.toggle('active');
    });
  });

  document.querySelectorAll('form[data-static-form]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you. This is a static form placeholder. Connect it later with Google Forms, EmailJS, Formspree, or your backend.');
      form.reset();
    });
  });

  if(backToTop){
    backToTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
  }
})();
