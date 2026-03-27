// main.js

document.addEventListener('DOMContentLoaded', () => {

  // ── Hamburger Menu ───────────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('.tab-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // ── Logo Carousel — seamless infinite scroll ─────────────────
  const track = document.getElementById('logo-carousel');

  if (track) {
    Array.from(track.children).forEach(logo => {
      track.appendChild(logo.cloneNode(true));
    });

    track.addEventListener('mouseenter', () => {
      track.style.animationPlayState = 'paused';
    });
    track.addEventListener('mouseleave', () => {
      track.style.animationPlayState = 'running';
    });
  }

  // ── Dynamic Calendar ─────────────────────────────────────────
  const calWidget = document.getElementById('calendar-widget');

  if (calWidget) {
    const now   = new Date();
    const year  = now.getFullYear();
    const month = now.getMonth();
    const today = now.getDate();

    const MONTHS   = ['January','February','March','April','May','June',
                      'July','August','September','October','November','December'];
    const DAY_ABBR = ['S','M','T','W','T','F','S'];

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth     = new Date(year, month + 1, 0).getDate();

    const dayLabelsHTML = DAY_ABBR
      .map(d => `<div class="cal-day-label">${d}</div>`)
      .join('');

    const blankCells = Array(firstDayOfMonth)
      .fill('<div></div>')
      .join('');

    let daysCells = '';
    for (let d = 1; d <= daysInMonth; d++) {
      const isToday = d === today;
      daysCells += `<div class="cal-day${isToday ? ' cal-today' : ''}">${d}</div>`;
    }

    calWidget.innerHTML = `
      <div class="cal-header">${MONTHS[month]} ${year}</div>
      <div class="cal-grid">
        ${dayLabelsHTML}
        ${blankCells}
        ${daysCells}
      </div>
    `;
  }

  // ── Scroll Reveal ────────────────────────────────────────────
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.07 }
  );

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ── Smooth Scroll ────────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

});

// ── Booking Form Handler ──────────────────────────────────────
function handleBooking(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.btn-submit');
  btn.textContent = 'Request Sent!';
  btn.style.background = 'linear-gradient(135deg, #00f5a0, #00b37a)';
  btn.style.boxShadow  = '0 0 30px rgba(0, 245, 160, 0.45)';
  btn.disabled = true;
}
