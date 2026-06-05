(() => {
  /* ── Hamburger ── */
  const ham = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  ham.addEventListener('click', () => navLinks.classList.toggle('open'));
  document.querySelectorAll('#nav-links a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

  /* ── Scroll reveal ── */
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  /* ── Active nav spy ── */
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('nav ul li a');
  window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) cur = s.id; });
    links.forEach(l => { l.classList.toggle('active', l.getAttribute('href') === `#${cur}`); });
  }, { passive: true });

  /* ── Typing effect (loops) ── */
  const el = document.querySelector('.typed');
  const phrases = ['Software Developer', 'Rails 8 Engineer', 'API Integration Specialist', 'Backend Developer'];
  let pi = 0, ci = 0, deleting = false;
  function type() {
    const phrase = phrases[pi];
    el.textContent = deleting ? phrase.slice(0, ci - 1) : phrase.slice(0, ci + 1);
    deleting ? ci-- : ci++;
    if (!deleting && ci === phrase.length) { setTimeout(() => { deleting = true; requestAnimationFrame(() => setTimeout(type, 60)); }, 1800); return; }
    if (deleting && ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; setTimeout(type, 400); return; }
    setTimeout(type, deleting ? 40 : 65);
  }
  setTimeout(type, 800);

  /* ── Project filter ── */
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.project-card').forEach(card => {
        const show = filter === 'all' || card.dataset.cat === filter;
        card.style.transition = 'opacity 0.3s, transform 0.3s';
        card.style.opacity = show ? '1' : '0.2';
        card.style.transform = show ? '' : 'scale(0.97)';
        card.style.pointerEvents = show ? '' : 'none';
      });
    });
  });

  /* ── Contact form ── */
  const form = document.getElementById('contact-form');
  const msg = document.getElementById('form-msg');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';
    btn.disabled = true;
    // ── To enable real email: replace below with Formspree fetch ──
    // fetch('https://formspree.io/f/YOUR_ID', { method:'POST', body: new FormData(form), headers:{Accept:'application/json'} })
    setTimeout(() => {
      msg.textContent = '✓ Message sent! I\'ll get back to you within 24 hours.';
      msg.className = 'success';
      form.reset();
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      btn.disabled = false;
      setTimeout(() => { msg.textContent = ''; msg.className = ''; }, 6000);
    }, 900);
  });
})();