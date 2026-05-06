/**
 * ═══════════════════════════════════════════════════════════
 *  AniPay — Admin Config Editor
 *  Visual form-based config editor at ?admin
 *  No backend required — edits SITE_CONFIG in-memory
 * ═══════════════════════════════════════════════════════════
 */

const AdminPanel = (() => {
  const PASS_KEY = 'anipay-admin-auth';
  let isOpen = false;

  function init() {
    if (!window.location.search.includes('admin')) return;
    // Inject admin styles
    injectStyles();
    // Show password prompt or panel
    if (sessionStorage.getItem(PASS_KEY) === 'ok') {
      openPanel();
    } else {
      showPasswordPrompt();
    }
  }

  function showPasswordPrompt() {
    const overlay = document.createElement('div');
    overlay.className = 'admin-overlay';
    overlay.innerHTML = `
      <div class="admin-login">
        <div class="admin-login-icon"><i class="fas fa-shield-halved"></i></div>
        <div class="admin-login-title">AniPay Admin</div>
        <div class="admin-login-subtitle">Enter admin password</div>
        <input type="password" class="admin-login-input" id="admin-pass" placeholder="Password" autocomplete="off">
        <div class="admin-login-hint">Default: <code>anipay</code></div>
        <button class="admin-login-btn" id="admin-login-btn"><i class="fas fa-arrow-right"></i> Enter</button>
        <div class="admin-login-error" id="admin-error"></div>
      </div>
    `;
    document.body.appendChild(overlay);

    const input = document.getElementById('admin-pass');
    const btn = document.getElementById('admin-login-btn');
    const error = document.getElementById('admin-error');

    input.focus();
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') btn.click(); });
    btn.addEventListener('click', () => {
      const pass = SITE_CONFIG.admin?.password || 'anipay';
      if (input.value === pass) {
        sessionStorage.setItem(PASS_KEY, 'ok');
        overlay.remove();
        openPanel();
      } else {
        error.textContent = 'Wrong password';
        input.value = '';
        input.focus();
      }
    });
  }

  function openPanel() {
    isOpen = true;
    // Hide the main page content
    const wrapper = document.querySelector('.page-wrapper');
    if (wrapper) wrapper.style.display = 'none';

    const overlay = document.createElement('div');
    overlay.id = 'admin-panel';
    overlay.className = 'admin-overlay';
    document.body.appendChild(overlay);

    renderPanel(overlay);
  }

  function renderPanel(container) {
    const cfg = SITE_CONFIG;

    container.innerHTML = `
      <div class="admin-panel">
        <header class="admin-header">
          <div class="admin-header-left">
            <i class="fas fa-cog"></i>
            <span class="admin-header-title">AniPay Config Editor</span>
            <span class="admin-version">v${cfg.version || '5.0'}</span>
          </div>
          <div class="admin-header-right">
            <button class="admin-btn admin-btn-secondary" id="admin-export"><i class="fas fa-download"></i> Export</button>
            <button class="admin-btn admin-btn-secondary" id="admin-import"><i class="fas fa-upload"></i> Import</button>
            <button class="admin-btn admin-btn-danger" id="admin-reset"><i class="fas fa-rotate-left"></i> Reset</button>
            <button class="admin-btn admin-btn-primary" id="admin-apply"><i class="fas fa-check"></i> Apply</button>
            <a href="?" class="admin-btn admin-btn-ghost"><i class="fas fa-xmark"></i></a>
          </div>
        </header>

        <div class="admin-body">
          <nav class="admin-sidebar">
            <button class="admin-nav-btn active" data-section="identity"><i class="fas fa-id-card"></i> Identity</button>
            <button class="admin-nav-btn" data-section="features"><i class="fas fa-toggle-on"></i> Features</button>
            <button class="admin-nav-btn" data-section="profile"><i class="fas fa-user"></i> Profile</button>
            <button class="admin-nav-btn" data-section="socials"><i class="fas fa-share-nodes"></i> Socials</button>
            <button class="admin-nav-btn" data-section="payments"><i class="fas fa-credit-card"></i> Payments</button>
            <button class="admin-nav-btn" data-section="appearance"><i class="fas fa-palette"></i> Appearance</button>
          </nav>

          <main class="admin-content" id="admin-content">
            ${renderIdentity(cfg)}
          </main>
        </div>

        <input type="file" id="admin-import-file" accept=".js,.json" style="display:none">
      </div>
    `;

    // Nav
    container.querySelectorAll('.admin-nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        container.querySelectorAll('.admin-nav-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const section = btn.dataset.section;
        const content = document.getElementById('admin-content');
        switch (section) {
          case 'identity': content.innerHTML = renderIdentity(cfg); break;
          case 'features': content.innerHTML = renderFeatures(cfg); break;
          case 'profile': content.innerHTML = renderProfile(cfg); break;
          case 'socials': content.innerHTML = renderSocials(cfg); break;
          case 'payments': content.innerHTML = renderPayments(cfg); break;
          case 'appearance': content.innerHTML = renderAppearance(cfg); break;
        }
        bindSectionEvents(section);
      });
    });

    // Export
    document.getElementById('admin-export').addEventListener('click', () => exportConfig());

    // Import
    document.getElementById('admin-import').addEventListener('click', () => {
      document.getElementById('admin-import-file').click();
    });
    document.getElementById('admin-import-file').addEventListener('change', (e) => {
      importConfig(e.target.files[0]);
    });

    // Apply
    document.getElementById('admin-apply').addEventListener('click', () => {
      applyChanges();
    });

    // Reset
    const resetBtn = document.getElementById('admin-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Reset all admin changes? This will restore the original config.js values.')) {
          localStorage.removeItem('anipay-config-overrides');
          window.location.href = window.location.pathname;
        }
      });
    }

    bindSectionEvents('identity');
  }

  // ── Section Renderers ─────────────────────────────────

  function renderIdentity(cfg) {
    return `
      <div class="admin-section">
        <h2 class="admin-section-title"><i class="fas fa-id-card"></i> Site Identity</h2>
        <div class="admin-form-grid">
          ${field('Site Name', 'name', cfg.name)}
          ${field('Tagline', 'tagline', cfg.tagline)}
          ${field('Description', 'description', cfg.description, 'textarea')}
          ${field('Footer Text', 'footer', cfg.footer)}
          ${field('Year', 'year', cfg.year)}
          ${field('Author Name', 'author.name', cfg.author?.name)}
          ${field('Author URL', 'author.url', cfg.author?.url)}
        </div>

        <h3 class="admin-sub-title">SEO & Open Graph</h3>
        <div class="admin-form-grid">
          ${toggle('SEO Enabled', 'seo.enabled', cfg.seo?.enabled)}
          ${field('OG Title', 'seo.title', cfg.seo?.title)}
          ${field('OG Description', 'seo.description', cfg.seo?.description, 'textarea')}
          ${field('OG Image', 'seo.image', cfg.seo?.image)}
          ${field('Canonical URL', 'seo.url', cfg.seo?.url)}
        </div>

        <h3 class="admin-sub-title">Service Worker</h3>
        <div class="admin-form-grid">
          ${field('Cache Version', 'sw.version', cfg.version)}
        </div>
      </div>
    `;
  }

  function renderFeatures(cfg) {
    const f = cfg.features || {};
    return `
      <div class="admin-section">
        <h2 class="admin-section-title"><i class="fas fa-toggle-on"></i> Feature Toggles</h2>
        <div class="admin-toggle-grid">
          ${toggle('Profile Section', 'features.profile', f.profile)}
          ${toggle('Socials Section', 'features.socials', f.socials)}
          ${toggle('Posts Section', 'features.posts', f.posts)}
          ${toggle('Payments Section', 'features.payments', f.payments)}
          ${toggle('Theme Toggle', 'features.themeToggle', f.themeToggle)}
          ${toggle('Particles Background', 'features.particles', f.particles)}
          ${toggle('Scroll Progress', 'features.scrollProgress', f.scrollProgress)}
          ${toggle('Back to Top', 'features.backToTop', f.backToTop)}
          ${toggle('Stats Counter', 'features.stats', f.stats)}
        </div>

        <h3 class="admin-sub-title">Loading Screen</h3>
        <div class="admin-form-grid">
          ${toggle('Loading Screen', 'loading.enabled', cfg.loading?.enabled)}
          ${field('Duration (ms)', 'loading.duration', cfg.loading?.duration)}
          ${field('Logo Path', 'loading.logo', cfg.loading?.logo)}
          ${field('Loading Text', 'loading.text', cfg.loading?.text)}
        </div>

        <h3 class="admin-sub-title">Share Button</h3>
        <div class="admin-form-grid">
          ${toggle('Share Button', 'share.enabled', cfg.share?.enabled)}
        </div>

        <h3 class="admin-sub-title">Sound Effects</h3>
        <div class="admin-form-grid">
          ${toggle('Sounds', 'sounds.enabled', localStorage.getItem('anipay-sounds') === 'on')}
        </div>
      </div>
    `;
  }

  function renderProfile(cfg) {
    const p = cfg.profile || {};
    return `
      <div class="admin-section">
        <h2 class="admin-section-title"><i class="fas fa-user"></i> Profile</h2>
        <div class="admin-form-grid">
          ${field('Banner URL', 'profile.banner', p.banner)}
          ${field('Avatar URL', 'profile.avatar', p.avatar)}
          ${field('Display Name', 'profile.displayName', p.displayName)}
          ${field('Username', 'profile.username', p.username)}
          ${field('Bio', 'profile.bio', p.bio, 'textarea')}
          ${toggle('Verified Badge', 'profile.verified', p.verified)}
          ${toggle('Bio Typing Effect', 'profile.bioTyping', p.bioTyping)}
          ${field('Location', 'profile.location', p.location)}
          ${field('Join Date', 'profile.joinDate', p.joinDate)}
        </div>

        <h3 class="admin-sub-title">Bio Link</h3>
        <div class="admin-form-grid">
          ${toggle('Bio Link Enabled', 'profile.bioLink.enabled', p.bioLink?.enabled)}
          ${field('Bio Link URL', 'profile.bioLink.url', p.bioLink?.url)}
          ${field('Bio Link Label', 'profile.bioLink.label', p.bioLink?.label)}
        </div>

        <h3 class="admin-sub-title">Stats</h3>
        <div class="admin-form-grid">
          ${toggle('Posts Stat', 'profile.stats.posts.enabled', p.stats?.posts?.enabled)}
          ${field('Posts Count', 'profile.stats.posts.count', p.stats?.posts?.count)}
          ${toggle('Followers Stat', 'profile.stats.followers.enabled', p.stats?.followers?.enabled)}
          ${field('Followers Count', 'profile.stats.followers.count', p.stats?.followers?.count)}
          ${toggle('Following Stat', 'profile.stats.following.enabled', p.stats?.following?.enabled)}
          ${field('Following Count', 'profile.stats.following.count', p.stats?.following?.count)}
        </div>

        <h3 class="admin-sub-title">QR Code</h3>
        <div class="admin-form-grid">
          ${toggle('QR Code Enabled', 'profile.qrCode.enabled', p.qrCode?.enabled)}
        </div>
      </div>
    `;
  }

  function renderSocials(cfg) {
    const socials = cfg.socials || [];
    return `
      <div class="admin-section">
        <h2 class="admin-section-title"><i class="fas fa-share-nodes"></i> Social Links</h2>
        <div class="admin-form-grid">
          ${field('Section Title', 'socialsSection.title', cfg.socialsSection?.title)}
          ${field('Section Subtitle', 'socialsSection.subtitle', cfg.socialsSection?.subtitle)}
          ${toggle('Show Header', 'socialsSection.enabled', cfg.socialsSection?.enabled)}
        </div>

        <h3 class="admin-sub-title">Platforms</h3>
        <div class="admin-socials-list">
          ${socials.map((s, i) => `
            <div class="admin-social-row">
              <span class="admin-social-icon"><i class="${SOCIAL_ICONS[s.platform]?.icon || 'fas fa-link'}"></i></span>
              <span class="admin-social-name">${SOCIAL_ICONS[s.platform]?.label || s.platform}</span>
              <input type="text" class="admin-input admin-input-sm" value="${esc(s.url)}" data-path="socials.${i}.url" placeholder="URL">
              <label class="admin-toggle-sm">
                <input type="checkbox" ${s.enabled ? 'checked' : ''} data-path="socials.${i}.enabled">
                <span class="admin-toggle-track"></span>
              </label>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderPayments(cfg) {
    const payments = cfg.payments || {};
    return `
      <div class="admin-section">
        <h2 class="admin-section-title"><i class="fas fa-credit-card"></i> Payment Methods</h2>
        ${Object.entries(payments).map(([key, cat]) => `
          <div class="admin-payment-cat">
            <h3 class="admin-sub-title"><i class="${cat.icon}"></i> ${esc(cat.title)}</h3>
            <div class="admin-form-grid">
              ${field('Title', `payments.${key}.title`, cat.title)}
              ${field('Subtitle', `payments.${key}.subtitle`, cat.subtitle)}
            </div>
            <div class="admin-payment-items">
              ${cat.items.map((item, i) => `
                <div class="admin-payment-item ${item.enabled ? '' : 'admin-disabled'}">
                  <div class="admin-payment-item-header">
                    <span class="admin-payment-icon" style="background:${item.iconBg};color:${item.color}"><i class="${item.icon}"></i></span>
                    <span class="admin-payment-name">${esc(item.name)}</span>
                    ${item.badge ? `<span class="admin-badge admin-badge-${item.badge}">${item.badge}</span>` : ''}
                    <label class="admin-toggle-sm">
                      <input type="checkbox" ${item.enabled ? 'checked' : ''} data-path="payments.${key}.items.${i}.enabled">
                      <span class="admin-toggle-track"></span>
                    </label>
                  </div>
                  <div class="admin-payment-fields">
                    ${field('Name', `payments.${key}.items.${i}.name`, item.name)}
                    ${field('Value', `payments.${key}.items.${i}.value`, item.value)}
                    ${field('Description', `payments.${key}.items.${i}.description`, item.description)}
                    ${field('Color', `payments.${key}.items.${i}.color`, item.color, 'color')}
                    ${toggle('Copyable', `payments.${key}.items.${i}.copyable`, item.copyable)}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderAppearance(cfg) {
    const t = cfg.theme || {};
    return `
      <div class="admin-section">
        <h2 class="admin-section-title"><i class="fas fa-palette"></i> Appearance</h2>

        <h3 class="admin-sub-title">Fonts</h3>
        <div class="admin-form-grid">
          ${field('Main Font', 'fonts.main.family', cfg.fonts?.main?.family)}
          ${field('Heading Font', 'fonts.heading.family', cfg.fonts?.heading?.family)}
          ${field('Mono Font', 'fonts.mono.family', cfg.fonts?.mono?.family)}
        </div>

        <h3 class="admin-sub-title">Accent Theme</h3>
        <div class="admin-form-grid">
          ${toggle('Show Accent Picker', 'theme.accentPicker', t.accentPicker)}
          ${field('Default Accent', 'theme.accent', t.accent)}
          ${field('Custom Color', 'theme.customColor', t.customColor, 'color')}
        </div>

        <h3 class="admin-sub-title">Posts Grid</h3>
        <div class="admin-form-grid">
          ${field('Title', 'posts.title', cfg.posts?.title)}
          ${field('Subtitle', 'posts.subtitle', cfg.posts?.subtitle)}
          ${select('Columns', 'posts.columns', cfg.posts?.columns, ['2', '3', '4'])}
        </div>
      </div>
    `;
  }

  // ── Form Helpers ──────────────────────────────────────

  function field(label, path, value, type = 'text') {
    if (type === 'textarea') {
      return `
        <div class="admin-field">
          <label class="admin-label">${label}</label>
          <textarea class="admin-textarea" data-path="${path}">${esc(value || '')}</textarea>
        </div>
      `;
    }
    if (type === 'color') {
      return `
        <div class="admin-field">
          <label class="admin-label">${label}</label>
          <div class="admin-color-wrap">
            <input type="color" class="admin-color" value="${value || '#ff2a6d'}" data-path="${path}">
            <input type="text" class="admin-input admin-input-sm" value="${value || ''}" data-path="${path}">
          </div>
        </div>
      `;
    }
    return `
      <div class="admin-field">
        <label class="admin-label">${label}</label>
        <input type="${type}" class="admin-input" value="${esc(String(value || ''))}" data-path="${path}">
      </div>
    `;
  }

  function toggle(label, path, value) {
    return `
      <div class="admin-field admin-field-toggle">
        <label class="admin-label">${label}</label>
        <label class="admin-toggle">
          <input type="checkbox" ${value ? 'checked' : ''} data-path="${path}">
          <span class="admin-toggle-track"><span class="admin-toggle-thumb"></span></span>
        </label>
      </div>
    `;
  }

  function select(label, path, value, options) {
    return `
      <div class="admin-field">
        <label class="admin-label">${label}</label>
        <select class="admin-select" data-path="${path}">
          ${options.map(o => `<option value="${o}" ${String(value) === o ? 'selected' : ''}>${o}</option>`).join('')}
        </select>
      </div>
    `;
  }

  // ── Config Operations ─────────────────────────────────

  function setByPath(obj, path, value) {
    const keys = path.split('.');
    let current = obj;
    for (let i = 0; i < keys.length - 1; i++) {
      const key = isNaN(keys[i]) ? keys[i] : parseInt(keys[i]);
      if (current[key] === undefined) current[key] = {};
      current = current[key];
    }
    const lastKey = isNaN(keys[keys.length - 1]) ? keys[keys.length - 1] : parseInt(keys[keys.length - 1]);
    current[lastKey] = value;
  }

  function applyChanges() {
    // Read all inputs and apply to SITE_CONFIG
    document.querySelectorAll('[data-path]').forEach(el => {
      const path = el.dataset.path;
      if (!path) return;
      let value;
      if (el.type === 'checkbox') {
        value = el.checked;
      } else if (el.type === 'number' || el.type === 'range') {
        value = parseInt(el.value, 10) || 0;
      } else if (el.type === 'color') {
        value = el.value;
      } else {
        // Text inputs: coerce to number if the existing config value is a number
        const raw = el.value;
        const existing = getByPath(SITE_CONFIG, path);
        if (typeof existing === 'number' && raw !== '') {
          const num = Number(raw);
          value = isNaN(num) ? raw : num;
        } else {
          value = raw;
        }
      }
      setByPath(SITE_CONFIG, path, value);
    });

    // Persist to localStorage so changes survive page reload
    try {
      localStorage.setItem('anipay-config-overrides', JSON.stringify(SITE_CONFIG));
    } catch (e) { /* quota exceeded */ }

    // Reload without ?admin so the main page renders with new config
    window.location.href = window.location.pathname;
  }

  function getByPath(obj, path) {
    const keys = path.split('.');
    let current = obj;
    for (let i = 0; i < keys.length; i++) {
      if (current === null || current === undefined) return undefined;
      const key = isNaN(keys[i]) ? keys[i] : parseInt(keys[i]);
      current = current[key];
    }
    return current;
  }

  function exportConfig() {
    // Read current form values into config
    document.querySelectorAll('[data-path]').forEach(el => {
      const path = el.dataset.path;
      let value;
      if (el.type === 'checkbox') value = el.checked;
      else if (el.type === 'number') value = parseInt(el.value) || 0;
      else value = el.value;
      setByPath(SITE_CONFIG, path, value);
    });

    const json = JSON.stringify(SITE_CONFIG, null, 2);
    const blob = new Blob([`const SITE_CONFIG = ${json};\n\nconst SOCIAL_ICONS = ${JSON.stringify(SOCIAL_ICONS, null, 2)};\n\nconst PAYMENT_METHODS = SITE_CONFIG.payments;\n`], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'config.js';
    a.click();
    URL.revokeObjectURL(url);
  }

  function importConfig(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        // Try to parse as JS
        const text = e.target.result;
        // Extract SITE_CONFIG from the file
        const match = text.match(/const\s+SITE_CONFIG\s*=\s*(\{[\s\S]*?\});/);
        if (match) {
          const imported = new Function(`return ${match[1]}`)();
          Object.assign(SITE_CONFIG, imported);
          // Re-render
          const panel = document.getElementById('admin-panel');
          if (panel) {
            panel.innerHTML = '';
            renderPanel(panel);
          }
          alert('Config imported successfully!');
        } else {
          alert('Could not find SITE_CONFIG in the file.');
        }
      } catch (err) {
        alert('Error importing config: ' + err.message);
      }
    };
    reader.readAsText(file);
  }

  function bindSectionEvents(section) {
    // Color input sync
    document.querySelectorAll('.admin-color').forEach(colorInput => {
      const textInput = colorInput.parentElement.querySelector('.admin-input-sm');
      if (textInput) {
        colorInput.addEventListener('input', () => { textInput.value = colorInput.value; });
        textInput.addEventListener('input', () => { colorInput.value = textInput.value; });
      }
    });

    // Toggle sound effects
    if (section === 'features') {
      const soundToggle = document.querySelector('[data-path="sounds.enabled"]');
      if (soundToggle) {
        soundToggle.addEventListener('change', () => {
          localStorage.setItem('anipay-sounds', soundToggle.checked ? 'on' : 'off');
        });
      }
    }
  }

  function esc(s) {
    const d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  // ── Styles ────────────────────────────────────────────
  function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .admin-overlay {
        position: fixed;
        inset: 0;
        z-index: 100000;
        background: var(--bg-primary, #06060f);
        overflow: auto;
      }

      /* Login */
      .admin-login {
        max-width: 360px;
        margin: 15vh auto;
        padding: 40px;
        text-align: center;
      }
      .admin-login-icon { font-size: 3rem; color: var(--accent-pink, #ff2a6d); margin-bottom: 16px; }
      .admin-login-title { font-size: 1.5rem; font-weight: 700; color: var(--text-primary, #f0f0f5); margin-bottom: 6px; }
      .admin-login-subtitle { font-size: 0.88rem; color: var(--text-muted, #555570); margin-bottom: 24px; }
      .admin-login-input {
        width: 100%;
        padding: 12px 16px;
        background: var(--bg-card, rgba(15,15,30,0.65));
        border: 1px solid var(--border, rgba(255,255,255,0.06));
        border-radius: 12px;
        color: var(--text-primary, #f0f0f5);
        font-size: 1rem;
        outline: none;
        margin-bottom: 8px;
        font-family: inherit;
      }
      .admin-login-input:focus { border-color: var(--accent-pink, #ff2a6d); }
      .admin-login-hint { font-size: 0.75rem; color: var(--text-muted, #555570); margin-bottom: 16px; }
      .admin-login-hint code { color: var(--accent-teal, #5ffbf1); }
      .admin-login-btn {
        width: 100%;
        padding: 12px;
        background: linear-gradient(135deg, var(--accent-pink, #ff2a6d), #d16ba5);
        border: none;
        border-radius: 12px;
        color: #fff;
        font-size: 0.95rem;
        font-weight: 600;
        cursor: pointer;
        font-family: inherit;
      }
      .admin-login-error { color: #ff4757; font-size: 0.82rem; margin-top: 10px; min-height: 1.2em; }

      /* Panel Layout */
      .admin-panel { display: flex; flex-direction: column; min-height: 100vh; }

      .admin-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 24px;
        background: var(--bg-secondary, #0d0d1a);
        border-bottom: 1px solid var(--border, rgba(255,255,255,0.06));
        position: sticky;
        top: 0;
        z-index: 100;
        backdrop-filter: blur(20px);
      }
      .admin-header-left { display: flex; align-items: center; gap: 10px; color: var(--text-primary, #f0f0f5); }
      .admin-header-left i { color: var(--accent-pink, #ff2a6d); font-size: 1.1rem; }
      .admin-header-title { font-weight: 700; font-size: 1rem; }
      .admin-version { font-size: 0.72rem; color: var(--text-muted, #555570); background: var(--bg-glass, rgba(255,255,255,0.03)); padding: 2px 8px; border-radius: 100px; }
      .admin-header-right { display: flex; gap: 8px; }

      .admin-btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 8px 16px;
        border-radius: 10px;
        font-size: 0.82rem;
        font-weight: 600;
        border: none;
        cursor: pointer;
        font-family: inherit;
        transition: all 0.2s ease;
        text-decoration: none;
      }
      .admin-btn-primary { background: linear-gradient(135deg, var(--accent-pink, #ff2a6d), #d16ba5); color: #fff; }
      .admin-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 4px 15px rgba(255,42,109,0.3); }
      .admin-btn-danger { background: rgba(255,71,87,0.12); border: 1px solid rgba(255,71,87,0.2); color: #ff4757; }
      .admin-btn-danger:hover { background: #ff4757; color: #fff; border-color: transparent; }
      .admin-btn-secondary { background: var(--bg-glass, rgba(255,255,255,0.03)); border: 1px solid var(--border, rgba(255,255,255,0.06)); color: var(--text-secondary, #8a8aad); }
      .admin-btn-secondary:hover { border-color: var(--accent-teal, #5ffbf1); color: var(--accent-teal, #5ffbf1); }
      .admin-btn-ghost { background: transparent; color: var(--text-muted, #555570); padding: 8px 12px; }
      .admin-btn-ghost:hover { color: var(--text-primary, #f0f0f5); }

      .admin-body { display: flex; flex: 1; }

      /* Sidebar */
      .admin-sidebar {
        width: 200px;
        padding: 16px 12px;
        background: var(--bg-secondary, #0d0d1a);
        border-right: 1px solid var(--border, rgba(255,255,255,0.06));
        display: flex;
        flex-direction: column;
        gap: 4px;
        position: sticky;
        top: 52px;
        height: calc(100vh - 52px);
        overflow-y: auto;
      }
      .admin-nav-btn {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 14px;
        border-radius: 10px;
        font-size: 0.85rem;
        font-weight: 500;
        color: var(--text-secondary, #8a8aad);
        background: transparent;
        border: none;
        cursor: pointer;
        font-family: inherit;
        transition: all 0.2s ease;
        text-align: left;
        width: 100%;
      }
      .admin-nav-btn:hover { background: var(--bg-glass, rgba(255,255,255,0.03)); color: var(--text-primary, #f0f0f5); }
      .admin-nav-btn.active { background: rgba(255,42,109,0.1); color: var(--accent-pink, #ff2a6d); }
      .admin-nav-btn i { width: 18px; text-align: center; font-size: 0.9rem; }

      /* Content */
      .admin-content { flex: 1; padding: 24px 32px; max-width: 900px; }

      .admin-section { margin-bottom: 40px; }
      .admin-section-title {
        font-size: 1.3rem;
        font-weight: 700;
        color: var(--text-primary, #f0f0f5);
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .admin-section-title i { color: var(--accent-pink, #ff2a6d); }
      .admin-sub-title {
        font-size: 1rem;
        font-weight: 600;
        color: var(--text-secondary, #8a8aad);
        margin: 24px 0 14px;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      /* Form Grid */
      .admin-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
      .admin-field { display: flex; flex-direction: column; gap: 6px; }
      .admin-field-toggle { flex-direction: row; align-items: center; justify-content: space-between; }
      .admin-label { font-size: 0.78rem; font-weight: 600; color: var(--text-muted, #555570); text-transform: uppercase; letter-spacing: 0.5px; }
      .admin-input, .admin-textarea, .admin-select {
        padding: 10px 14px;
        background: var(--bg-card, rgba(15,15,30,0.65));
        border: 1px solid var(--border, rgba(255,255,255,0.06));
        border-radius: 10px;
        color: var(--text-primary, #f0f0f5);
        font-size: 0.88rem;
        font-family: inherit;
        outline: none;
        transition: border-color 0.2s ease;
        width: 100%;
      }
      .admin-input:focus, .admin-textarea:focus, .admin-select:focus { border-color: var(--accent-pink, #ff2a6d); }
      .admin-textarea { min-height: 80px; resize: vertical; }
      .admin-select { cursor: pointer; }
      .admin-input-sm { max-width: 200px; }

      /* Toggle */
      .admin-toggle, .admin-toggle-sm { position: relative; display: inline-block; cursor: pointer; }
      .admin-toggle input, .admin-toggle-sm input { display: none; }
      .admin-toggle-track {
        display: block;
        width: 44px;
        height: 24px;
        background: var(--bg-card, rgba(15,15,30,0.65));
        border: 1px solid var(--border, rgba(255,255,255,0.06));
        border-radius: 12px;
        position: relative;
        transition: all 0.2s ease;
      }
      .admin-toggle-sm .admin-toggle-track { width: 36px; height: 20px; border-radius: 10px; }
      .admin-toggle-thumb {
        position: absolute;
        top: 2px;
        left: 2px;
        width: 18px;
        height: 18px;
        background: var(--text-muted, #555570);
        border-radius: 50%;
        transition: all 0.2s ease;
      }
      .admin-toggle-sm .admin-toggle-thumb { width: 14px; height: 14px; }
      input:checked + .admin-toggle-track { background: rgba(255,42,109,0.2); border-color: var(--accent-pink, #ff2a6d); }
      input:checked + .admin-toggle-track .admin-toggle-thumb { left: calc(100% - 20px); background: var(--accent-pink, #ff2a6d); }
      .admin-toggle-sm input:checked + .admin-toggle-track .admin-toggle-thumb { left: calc(100% - 16px); }

      /* Color */
      .admin-color-wrap { display: flex; gap: 8px; align-items: center; }
      .admin-color {
        width: 40px;
        height: 40px;
        border: 2px solid var(--border, rgba(255,255,255,0.06));
        border-radius: 10px;
        cursor: pointer;
        background: transparent;
        padding: 2px;
      }

      /* Toggle Grid */
      .admin-toggle-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

      /* Socials List */
      .admin-socials-list { display: flex; flex-direction: column; gap: 8px; }
      .admin-social-row {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 12px;
        background: var(--bg-card, rgba(15,15,30,0.65));
        border: 1px solid var(--border, rgba(255,255,255,0.06));
        border-radius: 10px;
      }
      .admin-social-icon { width: 28px; text-align: center; color: var(--accent-teal, #5ffbf1); font-size: 0.95rem; }
      .admin-social-name { width: 100px; font-size: 0.82rem; font-weight: 600; color: var(--text-primary, #f0f0f5); flex-shrink: 0; }

      /* Payment Items */
      .admin-payment-cat { margin-bottom: 24px; }
      .admin-payment-items { display: flex; flex-direction: column; gap: 10px; }
      .admin-payment-item {
        padding: 14px;
        background: var(--bg-card, rgba(15,15,30,0.65));
        border: 1px solid var(--border, rgba(255,255,255,0.06));
        border-radius: 12px;
        transition: opacity 0.2s ease;
      }
      .admin-disabled { opacity: 0.5; }
      .admin-payment-item-header { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
      .admin-payment-icon {
        width: 36px;
        height: 36px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.95rem;
      }
      .admin-payment-name { font-weight: 700; font-size: 0.95rem; color: var(--text-primary, #f0f0f5); flex: 1; }
      .admin-badge {
        padding: 2px 8px;
        border-radius: 100px;
        font-size: 0.65rem;
        font-weight: 700;
        text-transform: uppercase;
      }
      .admin-badge-popular { background: rgba(255,42,109,0.15); color: var(--accent-pink, #ff2a6d); }
      .admin-badge-new { background: rgba(95,251,241,0.12); color: var(--accent-teal, #5ffbf1); }
      .admin-badge-beta { background: rgba(168,85,247,0.15); color: var(--accent-purple, #a855f7); }
      .admin-payment-fields { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }

      /* Responsive */
      @media (max-width: 768px) {
        .admin-body { flex-direction: column; }
        .admin-sidebar {
          width: 100%;
          height: auto;
          position: static;
          flex-direction: row;
          overflow-x: auto;
          padding: 8px;
          gap: 4px;
        }
        .admin-nav-btn { white-space: nowrap; padding: 8px 12px; font-size: 0.78rem; }
        .admin-content { padding: 16px; }
        .admin-form-grid { grid-template-columns: 1fr; }
        .admin-toggle-grid { grid-template-columns: 1fr; }
        .admin-payment-fields { grid-template-columns: 1fr; }
        .admin-social-row { flex-wrap: wrap; }
        .admin-header { flex-wrap: wrap; gap: 8px; }
        .admin-header-right { flex-wrap: wrap; }
      }
    `;
    document.head.appendChild(style);
  }

  return { init };
})();
