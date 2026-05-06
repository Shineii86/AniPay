/**
 * ═══════════════════════════════════════════════════════════
 *  AniPay v2.0 — Application Engine
 *  Data-driven renderer with modern interactions
 * ═══════════════════════════════════════════════════════════
 */

(function () {
  'use strict';

  // ── State ──────────────────────────────────────────────
  let activeCategory = 'all';

  // ── Utilities ──────────────────────────────────────────
  function esc(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }

  function $(sel, ctx = document) { return ctx.querySelector(sel); }
  function $$(sel, ctx = document) { return [...ctx.querySelectorAll(sel)]; }

  // ── Toast System ───────────────────────────────────────
  function toast(message, icon = 'fa-check-circle') {
    const container = $('.toast-container');
    if (!container) return;
    const t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = `<i class="fas ${icon}"></i><span>${esc(message)}</span>`;
    container.appendChild(t);
    requestAnimationFrame(() => t.classList.add('show'));
    setTimeout(() => {
      t.classList.remove('show');
      setTimeout(() => t.remove(), 400);
    }, 2800);
  }

  // ── Clipboard ──────────────────────────────────────────
  async function copy(text, label) {
    try {
      await navigator.clipboard.writeText(text);
      toast(`${label} copied!`, 'fa-clipboard-check');
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;left:-9999px';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      toast(`${label} copied!`, 'fa-clipboard-check');
    }
  }

  // ── QR Download ────────────────────────────────────────
  function downloadQR(data, name) {
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(data)}`;
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name.toLowerCase().replace(/\s+/g, '-')}-qr.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    toast('QR code downloading...', 'fa-download');
  }

  // ── Build Payment Card ─────────────────────────────────
  function buildCard(method) {
    const card = document.createElement('div');
    card.className = 'pay-card';
    card.style.setProperty('--card-accent', method.color || 'var(--gradient-main)');

    // Badge
    if (method.badge) {
      const badge = document.createElement('span');
      badge.className = `card-badge ${method.badge}`;
      badge.textContent = method.badge;
      card.appendChild(badge);
    }

    // Icon
    const icon = document.createElement('div');
    icon.className = 'card-icon';
    icon.style.background = method.iconBg || 'var(--bg-glass)';
    icon.style.color = method.color || 'var(--accent-teal)';
    icon.style.border = `1px solid ${method.color}22`;
    icon.innerHTML = `<i class="${method.icon}"></i>`;
    card.appendChild(icon);

    // Name
    const name = document.createElement('div');
    name.className = 'card-name';
    name.textContent = method.name;
    card.appendChild(name);

    // Label
    if (method.label) {
      const label = document.createElement('div');
      label.className = 'card-label';
      label.textContent = method.label;
      card.appendChild(label);
    }

    // Description
    const desc = document.createElement('div');
    desc.className = 'card-description';
    desc.textContent = method.description;
    card.appendChild(desc);

    // QR or Value
    if (method.type === 'qr') {
      const qrWrap = document.createElement('div');
      qrWrap.className = 'card-qr';
      const img = document.createElement('img');
      img.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(method.value)}`;
      img.alt = `${method.name} QR`;
      img.loading = 'lazy';
      qrWrap.appendChild(img);
      card.appendChild(qrWrap);
    } else {
      const valWrap = document.createElement('div');
      valWrap.className = 'card-value';
      valWrap.innerHTML = `
        <span class="value-text">${esc(method.value)}</span>
        <i class="fas fa-copy copy-icon"></i>
      `;
      valWrap.addEventListener('click', () => {
        copy(method.value, method.name);
        valWrap.classList.add('copied');
        setTimeout(() => valWrap.classList.remove('copied'), 1500);
      });
      card.appendChild(valWrap);
    }

    // Action Buttons
    const actions = document.createElement('div');
    actions.className = 'card-actions';

    if (method.copyable) {
      const btn = document.createElement('button');
      btn.className = 'btn btn-primary';
      btn.innerHTML = '<i class="fas fa-copy"></i> Copy';
      btn.addEventListener('click', () => copy(method.value, method.name));
      actions.appendChild(btn);
    }

    if (method.downloadable) {
      const btn = document.createElement('button');
      btn.className = 'btn btn-secondary';
      btn.innerHTML = '<i class="fas fa-download"></i> QR';
      btn.addEventListener('click', () => downloadQR(method.value, method.name));
      actions.appendChild(btn);
    }

    if (method.type === 'url') {
      const btn = document.createElement('a');
      btn.href = method.value;
      btn.target = '_blank';
      btn.rel = 'noopener noreferrer';
      btn.className = 'btn btn-secondary';
      btn.innerHTML = '<i class="fas fa-arrow-up-right-from-square"></i> Open';
      actions.appendChild(btn);
    }

    if (actions.children.length) card.appendChild(actions);
    return card;
  }

  // ── Build Section ──────────────────────────────────────
  function buildSection(key, config) {
    const enabled = config.items.filter(m => m.enabled);
    if (!enabled.length) return null;

    const section = document.createElement('section');
    section.className = 'payment-section';
    section.dataset.category = key;

    section.innerHTML = `
      <div class="section-header">
        <div class="section-icon"><i class="${config.icon}"></i></div>
        <div>
          <div class="section-title">${esc(config.title)}</div>
          <div class="section-subtitle">${esc(config.subtitle)}</div>
        </div>
      </div>
    `;

    const grid = document.createElement('div');
    grid.className = 'cards-grid';

    enabled.forEach((method, i) => {
      const card = buildCard(method);
      grid.appendChild(card);
      // Staggered card reveal
      setTimeout(() => card.classList.add('visible'), 150 + i * 100);
    });

    section.appendChild(grid);
    return section;
  }

  // ── Build Category Tabs ────────────────────────────────
  function buildTabs() {
    const nav = $('.category-nav');
    if (!nav) return;

    // "All" tab
    const allTab = document.createElement('button');
    allTab.className = 'category-tab active';
    allTab.dataset.cat = 'all';
    const totalCount = Object.values(PAYMENT_METHODS).reduce((n, c) => n + c.items.filter(i => i.enabled).length, 0);
    allTab.innerHTML = `<i class="fas fa-grip"></i><span class="tab-label">All Methods</span><span class="category-count">${totalCount}</span>`;
    nav.appendChild(allTab);

    // Category tabs
    Object.entries(PAYMENT_METHODS).forEach(([key, cat]) => {
      const count = cat.items.filter(i => i.enabled).length;
      if (!count) return;
      const tab = document.createElement('button');
      tab.className = 'category-tab';
      tab.dataset.cat = key;
      tab.innerHTML = `<i class="${cat.icon}"></i><span class="tab-label">${esc(cat.title)}</span><span class="category-count">${count}</span>`;
      nav.appendChild(tab);
    });

    // Tab click handler
    nav.addEventListener('click', (e) => {
      const tab = e.target.closest('.category-tab');
      if (!tab) return;
      $$('.category-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeCategory = tab.dataset.cat;
      filterSections();
    });
  }

  // ── Filter Sections ────────────────────────────────────
  function filterSections() {
    $$('.payment-section').forEach(sec => {
      if (activeCategory === 'all' || sec.dataset.category === activeCategory) {
        sec.style.display = '';
        requestAnimationFrame(() => sec.classList.add('visible'));
      } else {
        sec.classList.remove('visible');
        setTimeout(() => sec.style.display = 'none', 400);
      }
    });
  }

  // ── Stats Counter ──────────────────────────────────────
  function buildStats() {
    const bar = $('.stats-bar');
    if (!bar) return;

    const allMethods = Object.values(PAYMENT_METHODS).flatMap(c => c.items);
    const enabled = allMethods.filter(m => m.enabled);
    const categories = Object.keys(PAYMENT_METHODS).filter(k => PAYMENT_METHODS[k].items.some(i => i.enabled));

    const stats = [
      { number: enabled.length, label: 'Methods' },
      { number: categories.length, label: 'Categories' },
      { number: Object.values(PAYMENT_METHODS).reduce((n, c) => n + c.items.filter(i => i.copyable).length, 0), label: 'Copy Ready' }
    ];

    stats.forEach(s => {
      const item = document.createElement('div');
      item.className = 'stat-item';
      item.innerHTML = `<span class="stat-number" data-target="${s.number}">0</span><span class="stat-label">${s.label}</span>`;
      bar.appendChild(item);
    });

    // Animate numbers
    setTimeout(() => {
      $$('.stat-number').forEach(el => {
        const target = +el.dataset.target;
        const duration = 1200;
        const start = performance.now();
        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(target * ease);
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    }, 600);
  }

  // ── Render Social Links ────────────────────────────────
  function renderSocials() {
    const row = $('.social-row');
    if (!row || !SITE_CONFIG.socials) return;
    row.innerHTML = '';
    SITE_CONFIG.socials.forEach(s => {
      const a = document.createElement('a');
      a.href = s.url;
      a.className = 'social-link';
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.setAttribute('aria-label', s.label);
      a.innerHTML = `<i class="${s.icon}"></i>`;
      row.appendChild(a);
    });
  }

  // ── Render Footer ──────────────────────────────────────
  function renderFooter() {
    const brand = $('.footer-brand');
    if (brand) brand.textContent = SITE_CONFIG.name;
    const desc = $('.footer-desc');
    if (desc) desc.textContent = SITE_CONFIG.footer;
    const copyEl = $('.footer-copy');
    if (copyEl) copyEl.innerHTML = `&copy; ${SITE_CONFIG.year} <a href="${SITE_CONFIG.author.url}" target="_blank">${esc(SITE_CONFIG.author.name)}</a> &mdash; All rights reserved`;
    document.title = `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`;
  }

  // ── Background Particles ───────────────────────────────
  function initParticles() {
    const canvas = $('#bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const isMobile = window.innerWidth < 768;
    const COUNT = isMobile ? 40 : 80;
    let w, h;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const colors = ['#ff2a6d', '#5ffbf1', '#a855f7', '#86a8e7'];
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.5,
      dy: Math.random() * 1 + 0.3,
      color: colors[Math.random() * colors.length | 0],
      alpha: Math.random() * 0.3 + 0.1
    }));

    function loop() {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.dx;
        p.y += p.dy;
        if (p.y > h + 5) { p.y = -5; p.x = Math.random() * w; }
        if (p.x < -5 || p.x > w + 5) { p.x = Math.random() * w; }
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(loop);
    }
    loop();
  }

  // ── Scroll Progress ────────────────────────────────────
  function initScrollProgress() {
    const bar = $('.scroll-progress');
    if (!bar) return;
    window.addEventListener('scroll', () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = h > 0 ? `${(window.scrollY / h) * 100}%` : '0%';
    }, { passive: true });
  }

  // ── Theme Toggle ───────────────────────────────────────
  function initTheme() {
    const toggle = $('#theme-toggle');
    if (!toggle) return;
    const stored = localStorage.getItem('anipay-theme');
    if (stored) document.documentElement.dataset.theme = stored;

    toggle.addEventListener('click', () => {
      const current = document.documentElement.dataset.theme;
      const next = current === 'light' ? 'dark' : 'light';
      if (next === 'dark') {
        delete document.documentElement.dataset.theme;
      } else {
        document.documentElement.dataset.theme = next;
      }
      localStorage.setItem('anipay-theme', next);
    });
  }

  // ── Back to Top ────────────────────────────────────────
  function initBackToTop() {
    const btn = $('.back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ── Scroll Reveal ──────────────────────────────────────
  function initReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    $$('.payment-section, .pay-card').forEach(el => observer.observe(el));
  }

  // ── Keyboard Shortcuts ─────────────────────────────────
  function initKeyboard() {
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + K = focus first tab
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const firstTab = $('.category-tab');
        if (firstTab) firstTab.focus();
      }
      // Escape = reset to "All"
      if (e.key === 'Escape') {
        const allTab = $('[data-cat="all"]');
        if (allTab) allTab.click();
      }
    });
  }

  // ── Entry Animations (anime.js) ────────────────────────
  function initAnimations() {
    if (typeof anime === 'undefined') return;
    const ease = 'easeOutExpo';

    anime({ targets: '.hero-badge', opacity: [0, 1], translateY: [-15, 0], duration: 800, easing: ease });
    anime({ targets: '.hero-title', opacity: [0, 1], translateY: [-25, 0], delay: 150, duration: 1000, easing: ease });
    anime({ targets: '.hero-subtitle', opacity: [0, 1], translateY: [15, 0], delay: 300, duration: 900, easing: ease });
    anime({ targets: '.hero-divider', width: [0, 80], delay: 500, duration: 800, easing: ease });
    anime({ targets: '.stat-item', opacity: [0, 1], translateY: [20, 0], delay: anime.stagger(100, { start: 400 }), duration: 700, easing: ease });
    anime({ targets: '.category-tab', opacity: [0, 1], scale: [0.9, 1], delay: anime.stagger(60, { start: 600 }), duration: 600, easing: 'easeOutBack' });

    // Social hover
    $$('.social-link').forEach(link => {
      link.addEventListener('mouseenter', () => anime({ targets: link, scale: 1.15, duration: 200, easing: 'easeOutQuad' }));
      link.addEventListener('mouseleave', () => anime({ targets: link, scale: 1, duration: 200, easing: 'easeOutQuad' }));
    });
  }

  // ── Render Everything ──────────────────────────────────
  function render() {
    const main = $('#main-content');
    if (!main) return;

    // Build sections
    Object.entries(PAYMENT_METHODS).forEach(([key, config]) => {
      const section = buildSection(key, config);
      if (section) main.appendChild(section);
    });

    // Build UI
    buildTabs();
    buildStats();
    renderSocials();
    renderFooter();
  }

  // ── Init ───────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    render();
    initTheme();
    initParticles();
    initScrollProgress();
    initBackToTop();
    initKeyboard();
    initAnimations();
    requestAnimationFrame(() => initReveal());
  });

})();
