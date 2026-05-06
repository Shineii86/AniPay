/**
 * ═══════════════════════════════════════════════════════════
 *  AniPay — Anime Effects Module
 *  Custom cursor, click bursts, Konami code easter egg
 * ═══════════════════════════════════════════════════════════
 */

const AnimeFX = (() => {
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  let cursor = null;
  let trails = [];
  const TRAIL_COUNT = 6;
  const KONAMI = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
  let konamiIndex = 0;
  let konamiActive = false;

  function init() {
    if (isTouchDevice) return;
    createCursor();
    createTrail();
    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('keydown', onKonami);
    // Hide default cursor
    document.documentElement.style.cursor = 'none';
    document.body.style.cursor = 'none';
    // Make all interactive elements cursor: none
    const style = document.createElement('style');
    style.textContent = `
      a, button, input, textarea, select, [role="button"],
      .social-icon-link, .social-link, .pay-card, .post-item,
      .category-tab, .theme-toggle, .back-to-top, .accent-dot,
      .profile-share-btn, .profile-qr-btn, .btn { cursor: none !important; }
    `;
    document.head.appendChild(style);
  }

  // ── Custom Cursor ─────────────────────────────────────
  function createCursor() {
    cursor = document.createElement('div');
    cursor.className = 'anime-cursor';
    cursor.innerHTML = `
      <div class="cursor-dot"></div>
      <div class="cursor-ring"></div>
    `;
    document.body.appendChild(cursor);
  }

  function createTrail() {
    for (let i = 0; i < TRAIL_COUNT; i++) {
      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      trail.style.opacity = (1 - i / TRAIL_COUNT) * 0.3;
      trail.style.width = `${8 - i}px`;
      trail.style.height = `${8 - i}px`;
      document.body.appendChild(trail);
      trails.push({ el: trail, x: 0, y: 0 });
    }
  }

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  function onMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }

  function onMouseDown() {
    if (cursor) cursor.classList.add('pressed');
    spawnBurst(mouseX, mouseY);
  }

  function onMouseUp() {
    if (cursor) cursor.classList.remove('pressed');
  }

  function onMouseOver(e) {
    const interactive = e.target.closest('a, button, input, textarea, select, .pay-card, .social-icon-link, .social-link, .post-item, .category-tab, .accent-dot');
    if (cursor) {
      cursor.classList.toggle('hover', !!interactive);
    }
  }

  // ── Animation Loop ────────────────────────────────────
  function updateCursor() {
    // Smooth follow with lerp
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;

    if (cursor) {
      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    }

    // Trail follows with increasing delay
    for (let i = 0; i < trails.length; i++) {
      const t = trails[i];
      const delay = 0.12 - i * 0.01;
      t.x += (mouseX - t.x) * delay;
      t.y += (mouseY - t.y) * delay;
      t.el.style.transform = `translate(${t.x}px, ${t.y}px)`;
    }

    requestAnimationFrame(updateCursor);
  }

  // ── Click Burst Particles ─────────────────────────────
  function spawnBurst(x, y) {
    const colors = ['#ff2a6d', '#5ffbf1', '#a855f7', '#86a8e7', '#fbbf24'];
    const count = 8;

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'click-burst-particle';
      const angle = (Math.PI * 2 / count) * i;
      const velocity = 30 + Math.random() * 30;
      const color = colors[Math.random() * colors.length | 0];
      const size = 3 + Math.random() * 4;

      particle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: ${color};
        pointer-events: none;
        z-index: 99998;
        box-shadow: 0 0 6px ${color};
      `;
      document.body.appendChild(particle);

      const dx = Math.cos(angle) * velocity;
      const dy = Math.sin(angle) * velocity;

      particle.animate([
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { transform: `translate(${dx}px, ${dy}px) scale(0)`, opacity: 0 }
      ], {
        duration: 500 + Math.random() * 200,
        easing: 'cubic-bezier(0, 0.9, 0.57, 1)',
        fill: 'forwards'
      }).onfinish = () => particle.remove();
    }
  }

  // ── Konami Code Easter Egg ────────────────────────────
  function onKonami(e) {
    if (e.keyCode === KONAMI[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === KONAMI.length) {
        konamiIndex = 0;
        activateKonami();
      }
    } else {
      konamiIndex = 0;
    }
  }

  function activateKonami() {
    if (konamiActive) return;
    konamiActive = true;

    // Create celebration overlay
    const overlay = document.createElement('div');
    overlay.className = 'konami-overlay';
    overlay.innerHTML = `
      <div class="konami-content">
        <div class="konami-title">✨ ZERO TWO MODE ✨</div>
        <div class="konami-subtitle">You found the secret!</div>
        <div class="konami-art">
          <pre class="konami-ascii">
    ♥♥♥♥♥♥♥♥♥♥
   ♥  Darling  ♥
    ♥  in the ♥
     ♥ Franxx ♥
      ♥♥♥♥♥♥♥♥
         ♥
        ♥♥♥
       ♥♥♥♥♥
      ♥♥♥♥♥♥♥
        </pre>
        </div>
        <div class="konami-msg">Code:002 is watching 💕</div>
      </div>
    `;
    document.body.appendChild(overlay);

    // Screen flash
    document.body.style.animation = 'konami-flash 0.15s ease 3';

    // Confetti burst
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.className = 'konami-confetti';
        const colors = ['#ff2a6d', '#5ffbf1', '#a855f7', '#fbbf24', '#ff6b9d'];
        confetti.style.cssText = `
          position: fixed;
          left: ${Math.random() * 100}vw;
          top: -10px;
          width: ${6 + Math.random() * 8}px;
          height: ${6 + Math.random() * 8}px;
          background: ${colors[Math.random() * colors.length | 0]};
          border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
          pointer-events: none;
          z-index: 100002;
        `;
        document.body.appendChild(confetti);

        confetti.animate([
          { transform: `translateY(0) rotate(0deg)`, opacity: 1 },
          { transform: `translateY(100vh) rotate(${Math.random() * 720}deg)`, opacity: 0 }
        ], {
          duration: 2000 + Math.random() * 2000,
          easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          fill: 'forwards'
        }).onfinish = () => confetti.remove();
      }, i * 30);
    }

    // Play success sound if available
    if (typeof SoundFX !== 'undefined') SoundFX.play('success');

    // Remove after 4 seconds
    setTimeout(() => {
      overlay.style.opacity = '0';
      overlay.style.transition = 'opacity 0.5s ease';
      document.body.style.animation = '';
      setTimeout(() => {
        overlay.remove();
        konamiActive = false;
      }, 500);
    }, 4000);
  }

  // ── Start ─────────────────────────────────────────────
  function start() {
    if (!isTouchDevice && cursor) {
      requestAnimationFrame(updateCursor);
    }
  }

  return { init, start };
})();
