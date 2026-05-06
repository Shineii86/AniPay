/**
 * ═══════════════════════════════════════════════════════════
 *  AniPay - Main Application
 *  Data-driven payment gateway renderer
 * ═══════════════════════════════════════════════════════════
 */

(function () {
  'use strict';

  // ── Toast Notification ─────────────────────────────────
  function showToast(message, icon = 'fa-check-circle') {
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fas ${icon}"></i> ${message}`;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), 3000);
  }

  // ── Clipboard Copy ─────────────────────────────────────
  function copyToClipboard(text, label = 'Copied') {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => showToast(`${label} to clipboard!`));
    } else {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;left:-9999px';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showToast(`${label} to clipboard!`);
    }
  }

  // ── QR Download ────────────────────────────────────────
  function downloadQR(data, filename = 'anipay-qrcode.png') {
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(data)}`;
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('QR Code download started!', 'fa-download');
  }

  // ── Build a Method Card ────────────────────────────────
  function buildMethodCard(method) {
    const card = document.createElement('div');
    card.className = 'method-card';

    // Icon
    const iconWrap = document.createElement('div');
    iconWrap.className = 'method-icon';
    iconWrap.innerHTML = `<i class="${method.icon}" style="color:${method.iconColor || '#5ffbf1'}"></i>`;
    card.appendChild(iconWrap);

    // Title
    const title = document.createElement('h3');
    title.className = 'method-title';
    title.textContent = method.name;
    card.appendChild(title);

    // Description
    const desc = document.createElement('p');
    desc.className = 'method-description';
    desc.textContent = method.description;
    card.appendChild(desc);

    // QR type
    if (method.type === 'qr') {
      const qrWrap = document.createElement('div');
      qrWrap.className = 'qr-container';
      const img = document.createElement('img');
      img.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(method.value)}`;
      img.alt = `${method.name} QR Code`;
      img.className = 'qr-code';
      img.loading = 'lazy';
      qrWrap.appendChild(img);
      card.appendChild(qrWrap);
    }

    // Value display (for non-QR types)
    if (method.type !== 'qr') {
      const display = document.createElement('div');
      display.className = 'id-display';
      display.innerHTML = `${escapeHtml(method.value)}<span class="copy-hint">click to copy</span>`;
      display.addEventListener('click', () => {
        copyToClipboard(method.value, method.name);
        display.style.borderColor = 'rgba(95, 251, 241, 0.8)';
        setTimeout(() => display.style.borderColor = '', 1000);
      });
      card.appendChild(display);
    }

    // Button group
    const btnGroup = document.createElement('div');
    btnGroup.className = 'btn-group';

    if (method.copyable) {
      const copyBtn = document.createElement('button');
      copyBtn.className = 'action-btn';
      copyBtn.innerHTML = `<i class="fas fa-copy"></i> Copy`;
      copyBtn.addEventListener('click', () => copyToClipboard(method.value, method.name));
      btnGroup.appendChild(copyBtn);
    }

    if (method.downloadable) {
      const dlBtn = document.createElement('button');
      dlBtn.className = 'action-btn secondary';
      dlBtn.innerHTML = `<i class="fas fa-download"></i> Download QR`;
      dlBtn.addEventListener('click', () => downloadQR(method.value));
      btnGroup.appendChild(dlBtn);
    }

    // URL type gets an "Open" button
    if (method.type === 'url') {
      const openBtn = document.createElement('a');
      openBtn.href = method.value;
      openBtn.target = '_blank';
      openBtn.rel = 'noopener noreferrer';
      openBtn.className = 'action-btn secondary';
      openBtn.innerHTML = `<i class="fas fa-external-link-alt"></i> Open`;
      btnGroup.appendChild(openBtn);
    }

    if (btnGroup.children.length > 0) {
      card.appendChild(btnGroup);
    }

    return card;
  }

  // ── Build a Payment Section ────────────────────────────
  function buildSection(config) {
    // Filter enabled methods
    const enabled = config.methods.filter(m => m.enabled);
    if (enabled.length === 0) return null;

    const section = document.createElement('section');
    section.className = 'payment-section reveal';

    // Header
    const header = document.createElement('div');
    header.className = 'section-header';
    header.innerHTML = `
      <h2 class="section-title">${escapeHtml(config.title)}</h2>
      <p class="section-subtitle">${escapeHtml(config.subtitle)}</p>
    `;
    section.appendChild(header);

    // Grid
    const grid = document.createElement('div');
    grid.className = 'methods-grid';

    enabled.forEach((method, i) => {
      const card = buildMethodCard(method);
      grid.appendChild(card);

      // Staggered reveal
      setTimeout(() => card.classList.add('visible'), 200 + i * 150);
    });

    section.appendChild(grid);
    return section;
  }

  // ── Particle System ────────────────────────────────────
  function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    const PARTICLE_COUNT = window.innerWidth < 768 ? 60 : 120;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = Math.random() * 1.5 + 0.5;
        this.color = Math.random() > 0.5 ? '#ff2a6d' : '#5ffbf1';
        this.alpha = Math.random() * 0.4 + 0.2;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.y > canvas.height + 10) this.reset(), this.y = -10;
        if (this.x < -10 || this.x > canvas.width + 10) this.reset();
      }
      draw() {
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      ctx.globalAlpha = 1;
      requestAnimationFrame(loop);
    }
    loop();
  }

  // ── Scroll Reveal ──────────────────────────────────────
  function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  // ── Entry Animations (anime.js) ────────────────────────
  function initAnimations() {
    if (typeof anime === 'undefined') return;

    anime({ targets: '.title', opacity: [0, 1], translateY: [-30, 0], duration: 1400, easing: 'easeOutExpo' });
    anime({ targets: '.subtitle', opacity: [0, 1], translateY: [20, 0], delay: 250, duration: 1100, easing: 'easeOutExpo' });
    anime({ targets: '.divider', width: [0, 120], delay: 500, duration: 900, easing: 'easeOutExpo' });
    anime({ targets: '.payment-section', opacity: [0, 1], translateY: [40, 0], delay: anime.stagger(200, { start: 400 }), duration: 1000, easing: 'easeOutExpo' });
    anime({ targets: '.social-icon', opacity: [0, 1], scale: [0.5, 1], delay: anime.stagger(80), duration: 800, easing: 'easeOutBack' });

    // Button hover micro-interactions
    document.querySelectorAll('.action-btn').forEach(btn => {
      btn.addEventListener('mouseenter', () => anime({ targets: btn, scale: 1.06, duration: 250, easing: 'easeOutQuad' }));
      btn.addEventListener('mouseleave', () => anime({ targets: btn, scale: 1, duration: 250, easing: 'easeOutQuad' }));
    });
  }

  // ── Render Site ────────────────────────────────────────
  function render() {
    const config = PAYMENT_CONFIG;
    const main = document.getElementById('main-content');
    if (!main) return;

    // Build sections
    ['indian', 'international'].forEach(key => {
      const section = buildSection(config[key]);
      if (section) main.appendChild(section);
    });

    // Render socials
    const socialContainer = document.querySelector('.social-links');
    if (socialContainer && config.site.socials) {
      socialContainer.innerHTML = '';
      config.site.socials.forEach(s => {
        const a = document.createElement('a');
        a.href = s.url;
        a.className = 'social-icon';
        a.setAttribute('aria-label', s.label);
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.innerHTML = `<i class="${s.icon}"></i>`;
        socialContainer.appendChild(a);
      });
    }

    // Footer text
    const footerText = document.querySelector('.footer-text');
    if (footerText) footerText.innerHTML = `${config.site.footer}<br>Secure, reliable, and anime-themed payment solutions`;

    const copyright = document.querySelector('.copyright');
    if (copyright) copyright.textContent = `© ${config.site.year} ${config.site.name} | All rights reserved`;

    // Update page title
    document.title = `${config.site.name} | ${config.site.tagline}`;
  }

  // ── Utility ────────────────────────────────────────────
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ── Init ───────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    render();
    initParticles();
    initAnimations();
    // Delay scroll reveal setup so cards have been inserted
    requestAnimationFrame(() => initScrollReveal());
  });

})();
