// BANDARI ROUTE — shared behaviour

document.addEventListener('DOMContentLoaded', () => {

  // mobile nav
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if(toggle && links){
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
  }

  // scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold:.15 });
  revealEls.forEach(el => io.observe(el));

  // corridor signature animation
  const corridor = document.querySelector('.corridor');
  if(corridor){
    const cio = new IntersectionObserver((entries) => {
      entries.forEach(e => { if(e.isIntersecting){ corridor.classList.add('in-view'); cio.unobserve(corridor); } });
    }, { threshold:.4 });
    cio.observe(corridor);
  }

  // animated stat counters
  const counters = document.querySelectorAll('[data-count]');
  const ctio = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){
        const el = e.target;
        const target = parseFloat(el.dataset.count);
        const decimals = el.dataset.count.includes('.') ? 1 : 0;
        const suffix = el.dataset.suffix || '';
        let cur = 0;
        const step = target / 50;
        const tick = () => {
          cur += step;
          if(cur >= target){ el.textContent = target.toFixed(decimals) + suffix; return; }
          el.textContent = cur.toFixed(decimals) + suffix;
          requestAnimationFrame(tick);
        };
        tick();
        ctio.unobserve(el);
      }
    });
  }, { threshold:.5 });
  counters.forEach(c => ctio.observe(c));

  // shipment tracking demo
  const trackForm = document.getElementById('trackForm');
  if(trackForm){
    trackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const result = document.getElementById('trackResult');
      result.classList.add('show');
      result.scrollIntoView({ behavior:'smooth', block:'nearest' });
    });
  }

  // active nav link
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if(a.getAttribute('href') === path) a.classList.add('active');
  });

  // current year
  document.querySelectorAll('.year').forEach(y => y.textContent = new Date().getFullYear());
});
