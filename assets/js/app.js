/**
 * ═══════════════════════════════════════════════════════════
 *  AniPay v4.0 — Application Engine
 *  Modular renderer: Profile, Socials, Posts, Payments
 * ═══════════════════════════════════════════════════════════
 */

(function () {
  'use strict';

  // ── State ──────────────────────────────────────────────
  let activeCategory = 'all';
  let lightboxState = { images: [], index: 0, caption: '' };

  // ═══════════════════════════════════════════════════════════
  //  CUSTOM FONTS — Load from config
  // ═══════════════════════════════════════════════════════════

  function loadCustomFonts() {
    const fonts = (SITE_CONFIG.fonts || {});
    const families = [];

    if (fonts.main && fonts.main.family) {
      families.push(`family=${encodeURIComponent(fonts.main.family)}:wght@${fonts.main.weights || '300;400;500;600;700'}`);
    }
    if (fonts.heading && fonts.heading.family) {
      families.push(`family=${encodeURIComponent(fonts.heading.family)}:wght@${fonts.heading.weights || '300;400;600;700'}`);
    }
    if (fonts.mono && fonts.mono.family) {
      families.push(`family=${encodeURIComponent(fonts.mono.family)}:wght@${fonts.mono.weights || '400;500'}`);
    }

    if (!families.length) return;

    // Inject Google Fonts link
    const url = `https://fonts.googleapis.com/css2?${families.join('&')}&display=swap`;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);

    // Override CSS custom properties
    const root = document.documentElement;
    if (fonts.main && fonts.main.family) {
      root.style.setProperty('--font-main', `'${fonts.main.family}', -apple-system, sans-serif`);
    }
    if (fonts.heading && fonts.heading.family) {
      const currentMain = fonts.main ? fonts.main.family : 'Inter';
      root.style.setProperty('--font-main', `'${fonts.heading.family}', '${currentMain}', -apple-system, sans-serif`);
    }
    if (fonts.mono && fonts.mono.family) {
      root.style.setProperty('--font-mono', `'${fonts.mono.family}', 'Fira Code', monospace`);
    }
  }

  // ── Utilities ──────────────────────────────────────────
  function esc(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }

  function $(sel, ctx = document) { return ctx.querySelector(sel); }
  function $$(sel, ctx = document) { return [...ctx.querySelectorAll(sel)]; }

  function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    return num.toString();
  }

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

  // ═══════════════════════════════════════════════════════════
  //  PROFILE SECTION — Twitter/X Style
  // ═══════════════════════════════════════════════════════════

  function renderProfile() {
    const section = $('#profile-section');
    if (!section || !SITE_CONFIG.features.profile) {
      if (section) section.style.display = 'none';
      return;
    }

    const p = SITE_CONFIG.profile;
    if (!p) { section.style.display = 'none'; return; }

    // Banner
    let bannerHTML = '';
    if (p.banner) {
      bannerHTML = `
        <div class="profile-banner">
          <img src="${esc(p.banner)}" alt="Profile banner" loading="lazy">
        </div>
      `;
    }

    // Verified badge
    const verifiedHTML = p.verified ? `<span class="profile-verified"><i class="fas fa-circle-check"></i></span>` : '';

    // Bio link
    let bioLinkHTML = '';
    if (p.bioLink && p.bioLink.enabled && p.bioLink.url) {
      bioLinkHTML = `
        <a href="${esc(p.bioLink.url)}" class="profile-bio-link" target="_blank" rel="noopener noreferrer">
          <i class="fas fa-link"></i> ${esc(p.bioLink.label || p.bioLink.url)}
        </a>
      `;
    }

    // Meta items (location, join date)
    let metaHTML = '';
    const metaItems = [];
    if (p.location) {
      metaItems.push(`<span class="profile-meta-item"><i class="fas fa-location-dot"></i> ${esc(p.location)}</span>`);
    }
    if (p.joinDate) {
      metaItems.push(`<span class="profile-meta-item"><i class="fas fa-calendar"></i> Joined ${esc(p.joinDate)}</span>`);
    }
    if (metaItems.length) {
      metaHTML = `<div class="profile-meta">${metaItems.join('')}</div>`;
    }

    // Stats
    let statsHTML = '';
    if (p.stats) {
      const statItems = [];
      const statEntries = [
        { key: 'posts', data: p.stats.posts },
        { key: 'followers', data: p.stats.followers },
        { key: 'following', data: p.stats.following },
      ];
      for (const s of statEntries) {
        if (s.data && s.data.enabled) {
          statItems.push(`
            <span class="profile-stat">
              <span class="profile-stat-count" data-target="${s.data.count}">0</span>
              <span class="profile-stat-label">${esc(s.data.label)}</span>
            </span>
          `);
        }
      }
      if (statItems.length) {
        statsHTML = `<div class="profile-stats">${statItems.join('')}</div>`;
      }
    }

    section.innerHTML = `
      ${bannerHTML}
      <div class="profile-info">
        <div class="profile-avatar-wrap">
          <img class="profile-avatar" src="${esc(p.avatar)}" alt="${esc(p.displayName)}">
        </div>
        <div class="profile-names">
          <div class="profile-display-name">
            ${esc(p.displayName)}${verifiedHTML}
          </div>
          ${p.username ? `<div class="profile-username">${esc(p.username)}</div>` : ''}
        </div>
        ${p.bio ? `<p class="profile-bio">${esc(p.bio)}</p>` : ''}
        ${bioLinkHTML}
        ${metaHTML}
        ${statsHTML}
      </div>
    `;

    section.style.display = '';

    // Bio typing animation
    if (p.bio && p.bioTyping) {
      const bioEl = section.querySelector('.profile-bio');
      if (bioEl) {
        const bioText = bioEl.textContent;
        setTimeout(() => typeWriter(bioEl, bioText, 40), 600);
      }
    }

    // QR Code popover
    renderQRPopover();

    // Share button
    renderShareButton();

    // Animate stats
    setTimeout(() => {
      $$('.profile-stat-count', section).forEach(el => {
        const target = +el.dataset.target;
        const duration = 1200;
        const start = performance.now();
        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          el.textContent = formatNumber(Math.round(target * ease));
          if (progress < 1) requestAnimationFrame(tick);
          else el.textContent = formatNumber(target);
        }
        requestAnimationFrame(tick);
      });
    }, 500);
  }

  // ═══════════════════════════════════════════════════════════
  //  SOCIAL MEDIA ICONS SECTION
  // ═══════════════════════════════════════════════════════════

  function renderSocialsSection() {
    const section = $('#socials-section');
    if (!section || !SITE_CONFIG.features.socials) {
      if (section) section.style.display = 'none';
      return;
    }

    const socials = (SITE_CONFIG.socials || []).filter(s => s.enabled && s.url);
    if (!socials.length) { section.style.display = 'none'; return; }

    const cfg = SITE_CONFIG.socialsSection || {};
    const showHeader = cfg.enabled !== false;

    let headerHTML = '';
    if (showHeader && (cfg.title || cfg.subtitle)) {
      headerHTML = `
        <div class="socials-header">
          ${cfg.title ? `<div class="socials-title">${esc(cfg.title)}</div>` : ''}
          ${cfg.subtitle ? `<div class="socials-subtitle">${esc(cfg.subtitle)}</div>` : ''}
        </div>
      `;
    }

    const iconsHTML = socials.map(s => {
      const platform = SOCIAL_ICONS[s.platform] || SOCIAL_ICONS.custom;
      const icon = platform.icon;
      const label = platform.label;
      const hoverColor = platform.color;

      return `
        <a href="${esc(s.url)}" class="social-icon-link" target="_blank" rel="noopener noreferrer"
           aria-label="${esc(label)}"
           style="--hover-color: ${hoverColor}"
           data-color="${esc(hoverColor)}">
          <i class="${icon}"></i>
          <span class="social-tooltip">${esc(label)}</span>
        </a>
      `;
    }).join('');

    section.innerHTML = `
      ${headerHTML}
      <div class="socials-grid">${iconsHTML}</div>
    `;

    section.style.display = '';

    // Add hover color effect
    $$('.social-icon-link', section).forEach(link => {
      const color = link.dataset.color;
      link.addEventListener('mouseenter', () => {
        link.style.background = color;
        link.style.borderColor = 'transparent';
        link.style.color = '#fff';
        link.style.boxShadow = `0 8px 20px ${color}40`;
      });
      link.addEventListener('mouseleave', () => {
        link.style.background = '';
        link.style.borderColor = '';
        link.style.color = '';
        link.style.boxShadow = '';
      });
    });
  }

  // ═══════════════════════════════════════════════════════════
  //  INSTAGRAM-STYLE POSTS SECTION
  // ═══════════════════════════════════════════════════════════

  function renderPostsSection() {
    const section = $('#posts-section');
    if (!section || !SITE_CONFIG.features.posts) {
      if (section) section.style.display = 'none';
      return;
    }

    const posts = (SITE_CONFIG.posts.items || []).filter(p => p.enabled);
    if (!posts.length) { section.style.display = 'none'; return; }

    const cfg = SITE_CONFIG.posts;
    const columns = cfg.columns || 3;

    let headerHTML = '';
    if (cfg.title || cfg.subtitle) {
      headerHTML = `
        <div class="posts-header">
          ${cfg.title ? `<div class="posts-title">${esc(cfg.title)}</div>` : ''}
          ${cfg.subtitle ? `<div class="posts-subtitle">${esc(cfg.subtitle)}</div>` : ''}
        </div>
      `;
    }

    const postsHTML = posts.map((post, idx) => {
      const mainImage = post.images[0] || '';
      const isCarousel = post.images.length > 1;
      const likes = post.likes != null ? post.likes : null;

      let overlayHTML = '';
      if (likes != null) {
        overlayHTML = `
          <div class="post-overlay">
            <span class="post-stat"><i class="fas fa-heart"></i> ${formatNumber(likes)}</span>
          </div>
        `;
      }

      let carouselHTML = '';
      if (isCarousel) {
        carouselHTML = `<span class="post-carousel-indicator"><i class="fas fa-images"></i> ${post.images.length}</span>`;
      }

      return `
        <div class="post-item" data-post-index="${idx}" data-images='${esc(JSON.stringify(post.images))}' data-caption="${esc(post.caption || '')}">
          <img src="${esc(mainImage)}" alt="${esc(post.caption || 'Post')}" loading="lazy">
          ${overlayHTML}
          ${carouselHTML}
        </div>
      `;
    }).join('');

    section.innerHTML = `
      ${headerHTML}
      <div class="posts-grid" data-columns="${columns}">${postsHTML}</div>
    `;

    section.style.display = '';

    // Post click → open lightbox
    $$('.post-item', section).forEach(item => {
      item.addEventListener('click', () => {
        const images = JSON.parse(item.dataset.images);
        const caption = item.dataset.caption;
        openLightbox(images, 0, caption);
      });
    });
  }

  // ═══════════════════════════════════════════════════════════
  //  LIGHTBOX
  // ═══════════════════════════════════════════════════════════

  function openLightbox(images, index, caption) {
    lightboxState = { images, index, caption };
    const overlay = $('#lightbox');
    if (!overlay) return;

    updateLightboxImage();
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    const overlay = $('#lightbox');
    if (!overlay) return;
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateLightboxImage() {
    const img = $('.lightbox-image');
    const captionEl = $('.lightbox-caption');
    const dotsEl = $('.lightbox-dots');
    if (!img) return;

    const { images, index, caption } = lightboxState;
    img.src = images[index] || '';

    if (captionEl) {
      captionEl.textContent = caption || '';
      captionEl.style.display = caption ? '' : 'none';
    }

    // Dots
    if (dotsEl) {
      if (images.length > 1) {
        dotsEl.innerHTML = images.map((_, i) =>
          `<button class="lightbox-dot${i === index ? ' active' : ''}" data-index="${i}"></button>`
        ).join('');
        dotsEl.style.display = '';
      } else {
        dotsEl.style.display = 'none';
      }
    }

    // Prev/Next visibility
    const prev = $('.lightbox-prev');
    const next = $('.lightbox-next');
    if (prev) prev.style.display = images.length > 1 ? '' : 'none';
    if (next) next.style.display = images.length > 1 ? '' : 'none';
  }

  function lightboxPrev() {
    if (lightboxState.images.length <= 1) return;
    lightboxState.index = (lightboxState.index - 1 + lightboxState.images.length) % lightboxState.images.length;
    updateLightboxImage();
  }

  function lightboxNext() {
    if (lightboxState.images.length <= 1) return;
    lightboxState.index = (lightboxState.index + 1) % lightboxState.images.length;
    updateLightboxImage();
  }

  function initLightbox() {
    const overlay = $('#lightbox');
    if (!overlay) return;

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay || e.target.classList.contains('lightbox-content')) {
        closeLightbox();
      }
    });

    const closeBtn = $('.lightbox-close');
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

    const prevBtn = $('.lightbox-prev');
    if (prevBtn) prevBtn.addEventListener('click', lightboxPrev);

    const nextBtn = $('.lightbox-next');
    if (nextBtn) nextBtn.addEventListener('click', lightboxNext);

    // Dots click
    overlay.addEventListener('click', (e) => {
      const dot = e.target.closest('.lightbox-dot');
      if (dot) {
        lightboxState.index = parseInt(dot.dataset.index, 10);
        updateLightboxImage();
      }
    });

    // Keyboard
    document.addEventListener('keydown', (e) => {
      if (!overlay.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') lightboxPrev();
      if (e.key === 'ArrowRight') lightboxNext();
    });

    // Swipe support
    let touchStartX = 0;
    overlay.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    overlay.addEventListener('touchend', (e) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) lightboxNext();
        else lightboxPrev();
      }
    }, { passive: true });
  }

  // ═══════════════════════════════════════════════════════════
  //  PAYMENT CARDS (existing, preserved)
  // ═══════════════════════════════════════════════════════════

  function buildCard(method) {
    const card = document.createElement('div');
    card.className = 'pay-card';
    card.style.setProperty('--card-accent', method.color || 'var(--gradient-main)');

    if (method.badge) {
      const badge = document.createElement('span');
      badge.className = `card-badge ${method.badge}`;
      badge.textContent = method.badge;
      card.appendChild(badge);
    }

    const icon = document.createElement('div');
    icon.className = 'card-icon';
    icon.style.background = method.iconBg || 'var(--bg-glass)';
    icon.style.color = method.color || 'var(--accent-teal)';
    icon.style.border = `1px solid ${method.color}22`;
    icon.innerHTML = `<i class="${method.icon}"></i>`;
    card.appendChild(icon);

    const name = document.createElement('div');
    name.className = 'card-name';
    name.textContent = method.name;
    card.appendChild(name);

    if (method.label) {
      const label = document.createElement('div');
      label.className = 'card-label';
      label.textContent = method.label;
      card.appendChild(label);
    }

    const desc = document.createElement('div');
    desc.className = 'card-description';
    desc.textContent = method.description;
    card.appendChild(desc);

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
      setTimeout(() => card.classList.add('visible'), 150 + i * 100);
    });

    section.appendChild(grid);
    return section;
  }

  // ═══════════════════════════════════════════════════════════
  //  PAYMENT TABS & FILTERING
  // ═══════════════════════════════════════════════════════════

  function buildTabs() {
    const nav = $('#category-nav');
    if (!nav || !SITE_CONFIG.features.payments) return;

    const allTab = document.createElement('button');
    allTab.className = 'category-tab active';
    allTab.dataset.cat = 'all';
    const totalCount = Object.values(PAYMENT_METHODS).reduce((n, c) => n + c.items.filter(i => i.enabled).length, 0);
    allTab.innerHTML = `<i class="fas fa-grip"></i><span class="tab-label">All Methods</span><span class="category-count">${totalCount}</span>`;
    nav.appendChild(allTab);

    Object.entries(PAYMENT_METHODS).forEach(([key, cat]) => {
      const count = cat.items.filter(i => i.enabled).length;
      if (!count) return;
      const tab = document.createElement('button');
      tab.className = 'category-tab';
      tab.dataset.cat = key;
      tab.innerHTML = `<i class="${cat.icon}"></i><span class="tab-label">${esc(cat.title)}</span><span class="category-count">${count}</span>`;
      nav.appendChild(tab);
    });

    nav.addEventListener('click', (e) => {
      const tab = e.target.closest('.category-tab');
      if (!tab) return;
      $$('.category-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeCategory = tab.dataset.cat;
      filterSections();
    });
  }

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

  // ═══════════════════════════════════════════════════════════
  //  STATS COUNTER
  // ═══════════════════════════════════════════════════════════

  function buildStats() {
    const bar = $('#stats-bar');
    if (!bar || !SITE_CONFIG.features.stats || !SITE_CONFIG.features.payments) return;

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

  // ═══════════════════════════════════════════════════════════
  //  FOOTER SOCIALS
  // ═══════════════════════════════════════════════════════════

  function renderFooterSocials() {
    const row = $('.social-row');
    if (!row || !SITE_CONFIG.socials) return;
    row.innerHTML = '';
    const enabled = SITE_CONFIG.socials.filter(s => s.enabled && s.url);
    enabled.forEach(s => {
      const platform = SOCIAL_ICONS[s.platform] || SOCIAL_ICONS.custom;
      const a = document.createElement('a');
      a.href = s.url;
      a.className = 'social-link';
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.setAttribute('aria-label', platform.label);
      a.innerHTML = `<i class="${platform.icon}"></i>`;
      row.appendChild(a);
    });
  }

  // ═══════════════════════════════════════════════════════════
  //  FOOTER CONTENT
  // ═══════════════════════════════════════════════════════════

  function renderFooter() {
    const brand = $('.footer-brand');
    if (brand) brand.textContent = SITE_CONFIG.name;
    const desc = $('.footer-desc');
    if (desc) desc.textContent = SITE_CONFIG.footer;
    const copyEl = $('.footer-copy');
    if (copyEl) copyEl.innerHTML = `&copy; ${SITE_CONFIG.year} <a href="${SITE_CONFIG.author.url}" target="_blank">${esc(SITE_CONFIG.author.name)}</a> &mdash; All rights reserved`;
    document.title = `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`;
  }

  // ═══════════════════════════════════════════════════════════
  //  TYPING ANIMATION — Bio text
  // ═══════════════════════════════════════════════════════════

  function typeWriter(element, text, speed = 40) {
    if (!element || !text) return;
    element.textContent = '';
    const cursor = document.createElement('span');
    cursor.className = 'profile-bio-cursor';
    element.appendChild(cursor);

    let i = 0;
    function type() {
      if (i < text.length) {
        element.insertBefore(document.createTextNode(text.charAt(i)), cursor);
        i++;
        setTimeout(type, speed);
      } else {
        // Remove cursor after a delay
        setTimeout(() => {
          if (cursor.parentNode) cursor.remove();
        }, 2000);
      }
    }
    type();
  }

  // ═══════════════════════════════════════════════════════════
  //  ACCENT THEME SYSTEM
  // ═══════════════════════════════════════════════════════════

  function applyAccent(accentName) {
    const theme = SITE_CONFIG.theme || {};
    const accents = theme.accents || {};
    const root = document.documentElement;

    if (accentName === 'custom') {
      const custom = theme.customColor || '#ff2a6d';
      root.removeAttribute('data-accent');
      root.style.setProperty('--accent-main', custom);
      // Inline gradient override
      root.style.setProperty('--gradient-main', `linear-gradient(135deg, ${custom}, #d16ba5, #86a8e7, #5ffbf1)`);
      root.style.setProperty('--gradient-pink', `linear-gradient(135deg, ${custom}, #d16ba5)`);
    } else {
      root.style.removeProperty('--accent-main');
      root.style.removeProperty('--gradient-main');
      root.style.removeProperty('--gradient-pink');
      root.setAttribute('data-accent', accentName);
    }

    localStorage.setItem('anipay-accent', accentName);

    // Update active dot
    $$('.accent-dot').forEach(dot => {
      dot.classList.toggle('active', dot.dataset.accent === accentName);
    });
  }

  function renderAccentPicker() {
    const container = $('#accent-picker');
    if (!container) return;

    const theme = SITE_CONFIG.theme || {};
    if (!theme.accentPicker) {
      container.style.display = 'none';
      return;
    }

    const accents = theme.accents || {};
    const stored = localStorage.getItem('anipay-accent') || theme.accent || 'pink';

    container.innerHTML = '';

    Object.entries(accents).forEach(([key, data]) => {
      const dot = document.createElement('button');
      dot.className = 'accent-dot' + (key === stored ? ' active' : '');
      dot.dataset.accent = key;
      dot.style.background = data.color;
      dot.style.color = data.color;
      dot.setAttribute('aria-label', `${data.label} accent`);
      dot.innerHTML = `<span class="accent-tooltip">${esc(data.label)}</span>`;
      dot.addEventListener('click', () => applyAccent(key));
      container.appendChild(dot);
    });

    // Custom color dot
    if (theme.accent === 'custom' || stored === 'custom') {
      const dot = document.createElement('button');
      dot.className = 'accent-dot' + ('custom' === stored ? ' active' : '');
      dot.dataset.accent = 'custom';
      dot.style.background = theme.customColor || '#ff2a6d';
      dot.style.color = theme.customColor || '#ff2a6d';
      dot.setAttribute('aria-label', 'Custom accent');
      dot.innerHTML = `<span class="accent-tooltip">Custom</span>`;
      dot.addEventListener('click', () => applyAccent('custom'));
      container.appendChild(dot);
    }

    // Apply stored accent
    applyAccent(stored);
  }

  // ═══════════════════════════════════════════════════════════
  //  SHARE BUTTON
  // ═══════════════════════════════════════════════════════════

  function renderShareButton() {
    const shareCfg = SITE_CONFIG.share || {};
    if (!shareCfg.enabled) return;

    // Find the QR button wrapper (which is inside profile-bio-link parent)
    const qrBtn = $('.profile-qr-btn');
    if (!qrBtn) return;

    const parent = qrBtn.parentNode;
    const pageUrl = encodeURIComponent(window.location.href);
    const pageTitle = encodeURIComponent(document.title);
    const platforms = shareCfg.platforms || ['twitter', 'whatsapp', 'copy'];

    // Build share options
    const optionMap = {
      twitter: {
        icon: 'fab fa-x-twitter',
        label: 'X / Twitter',
        cls: 'twitter',
        action: () => window.open(`https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`, '_blank', 'noopener,noreferrer'),
      },
      whatsapp: {
        icon: 'fab fa-whatsapp',
        label: 'WhatsApp',
        cls: 'whatsapp',
        action: () => window.open(`https://wa.me/?text=${pageTitle}%20${pageUrl}`, '_blank', 'noopener,noreferrer'),
      },
      copy: {
        icon: 'fas fa-link',
        label: 'Copy Link',
        cls: 'copy',
        action: () => {
          copy(window.location.href, 'Link');
          toast('Link copied!', 'fa-link');
        },
      },
    };

    const optionsHTML = platforms
      .filter(p => optionMap[p])
      .map(p => {
        const opt = optionMap[p];
        return `<button class="share-option ${opt.cls}" data-platform="${p}">
          <i class="${opt.icon}"></i>
          <span>${opt.label}</span>
        </button>`;
      })
      .join('');

    const wrap = document.createElement('span');
    wrap.className = 'share-btn-wrap';
    wrap.innerHTML = `
      <button class="profile-share-btn" aria-label="Share profile">
        <i class="fas fa-share-nodes"></i>
        <span>Share</span>
      </button>
      <div class="share-dropdown">${optionsHTML}</div>
    `;

    parent.appendChild(wrap);

    const btn = wrap.querySelector('.profile-share-btn');
    const dropdown = wrap.querySelector('.share-dropdown');

    // Toggle dropdown
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('open');
    });

    // Option click
    wrap.querySelectorAll('.share-option').forEach(opt => {
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        const platform = opt.dataset.platform;
        if (optionMap[platform]) {
          optionMap[platform].action();
        }
        dropdown.classList.remove('open');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!wrap.contains(e.target)) {
        dropdown.classList.remove('open');
      }
    });
  }

  // ═══════════════════════════════════════════════════════════
  //  LOADING SCREEN
  // ═══════════════════════════════════════════════════════════

  function initLoadingScreen() {
    const cfg = SITE_CONFIG.loading || {};
    if (!cfg.enabled) {
      const el = $('#loading-screen');
      if (el) el.remove();
      return;
    }

    // Update logo and text from config
    const logo = $('.loading-logo');
    const text = $('.loading-text');
    if (logo && cfg.logo) logo.src = cfg.logo;
    if (text && cfg.text) text.textContent = cfg.text;

    const duration = cfg.duration || 1500;

    function dismissLoading() {
      setTimeout(() => {
        const screen = $('#loading-screen');
        if (screen) {
          screen.classList.add('fade-out');
          setTimeout(() => screen.remove(), 700);
        }
      }, duration);
    }

    // If page already loaded (cached), dismiss immediately
    if (document.readyState === 'complete') {
      dismissLoading();
    } else {
      window.addEventListener('load', dismissLoading);
    }
  }

  // ═══════════════════════════════════════════════════════════
  //  QR CODE POPOVER
  // ═══════════════════════════════════════════════════════════

  function renderQRPopover() {
    const profile = SITE_CONFIG.profile;
    if (!profile || !profile.qrCode || !profile.qrCode.enabled) return;

    const bioLinkWrap = $('.profile-bio-link');
    if (!bioLinkWrap) return;

    // Create QR button next to bio link
    const qrBtn = document.createElement('button');
    qrBtn.className = 'profile-qr-btn';
    qrBtn.setAttribute('aria-label', 'Show QR code');
    qrBtn.innerHTML = '<i class="fas fa-qrcode"></i>';

    // Create popover
    const pageUrl = window.location.href;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(pageUrl)}`;

    const popover = document.createElement('div');
    popover.className = 'qr-popover';
    popover.innerHTML = `
      <button class="qr-popover-close" aria-label="Close"><i class="fas fa-xmark"></i></button>
      <img src="${qrUrl}" alt="QR Code for this page">
      <div class="qr-popover-text">Scan to visit</div>
      <div class="qr-popover-url">${esc(pageUrl)}</div>
    `;

    // Position relative to the button's parent
    const wrapper = document.createElement('span');
    wrapper.style.position = 'relative';
    wrapper.style.display = 'inline-flex';
    wrapper.style.alignItems = 'center';
    bioLinkWrap.parentNode.insertBefore(wrapper, bioLinkWrap);
    wrapper.appendChild(bioLinkWrap);
    wrapper.appendChild(qrBtn);
    wrapper.appendChild(popover);

    // Toggle popover
    qrBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      popover.classList.toggle('open');
    });

    // Close button
    const closeBtn = popover.querySelector('.qr-popover-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        popover.classList.remove('open');
      });
    }

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!popover.contains(e.target) && e.target !== qrBtn && !qrBtn.contains(e.target)) {
        popover.classList.remove('open');
      }
    });
  }

  // ═══════════════════════════════════════════════════════════
  //  BACKGROUND PARTICLES
  // ═══════════════════════════════════════════════════════════

  function initParticles() {
    if (!SITE_CONFIG.features.particles) return;
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

  // ═══════════════════════════════════════════════════════════
  //  SCROLL PROGRESS
  // ═══════════════════════════════════════════════════════════

  function initScrollProgress() {
    if (!SITE_CONFIG.features.scrollProgress) return;
    const bar = $('.scroll-progress');
    if (!bar) return;
    window.addEventListener('scroll', () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = h > 0 ? `${(window.scrollY / h) * 100}%` : '0%';
    }, { passive: true });
  }

  // ═══════════════════════════════════════════════════════════
  //  THEME TOGGLE
  // ═══════════════════════════════════════════════════════════

  function initTheme() {
    const toggle = $('#theme-toggle');
    if (!toggle) return;
    if (!SITE_CONFIG.features.themeToggle) {
      toggle.style.display = 'none';
      return;
    }
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

  // ═══════════════════════════════════════════════════════════
  //  BACK TO TOP
  // ═══════════════════════════════════════════════════════════

  function initBackToTop() {
    const btn = $('.back-to-top');
    if (!btn) return;
    if (!SITE_CONFIG.features.backToTop) {
      btn.style.display = 'none';
      return;
    }
    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ═══════════════════════════════════════════════════════════
  //  SCROLL REVEAL
  // ═══════════════════════════════════════════════════════════

  function initReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    // Observe profile, socials, posts sections
    ['#profile-section', '#socials-section', '#posts-section'].forEach(sel => {
      const el = $(sel);
      if (el && el.style.display !== 'none') observer.observe(el);
    });

    // Observe payment sections and cards
    $$('.payment-section, .pay-card').forEach(el => observer.observe(el));
  }

  // ═══════════════════════════════════════════════════════════
  //  KEYBOARD SHORTCUTS
  // ═══════════════════════════════════════════════════════════

  function initKeyboard() {
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const firstTab = $('.category-tab');
        if (firstTab) firstTab.focus();
      }
      if (e.key === 'Escape') {
        const allTab = $('[data-cat="all"]');
        if (allTab && !$('#lightbox.active')) allTab.click();
      }
    });
  }

  // ═══════════════════════════════════════════════════════════
  //  ENTRY ANIMATIONS (anime.js)
  // ═══════════════════════════════════════════════════════════

  function initAnimations() {
    if (typeof anime === 'undefined') return;
    const ease = 'easeOutExpo';

    // Profile animation
    anime({ targets: '#profile-section', opacity: [0, 1], translateY: [20, 0], duration: 800, easing: ease });

    // Socials animation
    anime({ targets: '.social-icon-link', opacity: [0, 1], scale: [0.5, 1], delay: anime.stagger(30, { start: 300 }), duration: 500, easing: 'easeOutBack' });

    // Posts animation
    anime({ targets: '.post-item', opacity: [0, 1], scale: [0.9, 1], delay: anime.stagger(50, { start: 400 }), duration: 600, easing: ease });

    // Hero animations
    anime({ targets: '.hero-badge', opacity: [0, 1], translateY: [-15, 0], duration: 800, easing: ease });
    anime({ targets: '.hero-title', opacity: [0, 1], translateY: [-25, 0], delay: 150, duration: 1000, easing: ease });
    anime({ targets: '.hero-subtitle', opacity: [0, 1], translateY: [15, 0], delay: 300, duration: 900, easing: ease });
    anime({ targets: '.hero-divider', width: [0, 80], delay: 500, duration: 800, easing: ease });
    anime({ targets: '.stat-item', opacity: [0, 1], translateY: [20, 0], delay: anime.stagger(100, { start: 400 }), duration: 700, easing: ease });
    anime({ targets: '.category-tab', opacity: [0, 1], scale: [0.9, 1], delay: anime.stagger(60, { start: 600 }), duration: 600, easing: 'easeOutBack' });

    // Footer social hover
    $$('.social-link').forEach(link => {
      link.addEventListener('mouseenter', () => anime({ targets: link, scale: 1.15, duration: 200, easing: 'easeOutQuad' }));
      link.addEventListener('mouseleave', () => anime({ targets: link, scale: 1, duration: 200, easing: 'easeOutQuad' }));
    });
  }

  // ═══════════════════════════════════════════════════════════
  //  PAYMENTS VISIBILITY
  // ═══════════════════════════════════════════════════════════

  function togglePaymentsWrapper() {
    const wrapper = $('#payments-wrapper');
    if (!wrapper) return;
    if (!SITE_CONFIG.features.payments) {
      wrapper.style.display = 'none';
    }
  }

  // ═══════════════════════════════════════════════════════════
  //  RENDER ALL
  // ═══════════════════════════════════════════════════════════

  function render() {
    // 1. Profile
    renderProfile();

    // 2. Socials
    renderSocialsSection();

    // 3. Posts
    renderPostsSection();

    // 4. Payments
    togglePaymentsWrapper();
    if (SITE_CONFIG.features.payments) {
      const main = $('#main-content');
      if (main) {
        Object.entries(PAYMENT_METHODS).forEach(([key, config]) => {
          const section = buildSection(key, config);
          if (section) main.appendChild(section);
        });
      }
      buildTabs();
      buildStats();
    }

    // 5. Footer
    renderFooterSocials();
    renderFooter();
  }

  // ═══════════════════════════════════════════════════════════
  //  INIT
  // ═══════════════════════════════════════════════════════════

  document.addEventListener('DOMContentLoaded', () => {
    initLoadingScreen();
    loadCustomFonts();
    render();
    initTheme();
    renderAccentPicker();
    initParticles();
    initScrollProgress();
    initBackToTop();
    initKeyboard();
    initLightbox();
    initAnimations();
    requestAnimationFrame(() => initReveal());
  });

})();
