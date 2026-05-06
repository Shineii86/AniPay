/**
 * ═══════════════════════════════════════════════════════════
 *  AniPay — Analytics Dashboard Module
 *  localStorage-based, zero external dependencies
 *  Tracks: views, clicks, copies, social links
 *  Dashboard: Ctrl+Shift+A
 * ═══════════════════════════════════════════════════════════
 */

const Analytics = (() => {
  const STORAGE_KEY = 'anipay-analytics';
  const MAX_DAYS = 30;
  let data = null;

  function init() {
    load();
    trackView();
    observeClicks();
    // Keyboard shortcut to open dashboard (desktop)
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        toggleDashboard();
      }
    });
    // URL parameter ?analytics — wait for loading screen to dismiss first
    if (window.location.search.includes('analytics')) {
      const openAnalytics = () => toggleDashboard();
      const loadingScreen = document.getElementById('loading-screen');
      if (loadingScreen) {
        // Wait for loading screen to be removed or fade out
        const observer = new MutationObserver((mutations) => {
          for (const m of mutations) {
            for (const node of m.removedNodes) {
              if (node === loadingScreen) {
                observer.disconnect();
                setTimeout(openAnalytics, 100);
                return;
              }
            }
          }
        });
        observer.observe(loadingScreen.parentNode || document.body, { childList: true });
        // Fallback: if loading screen is already gone or takes too long
        setTimeout(() => { observer.disconnect(); openAnalytics(); }, 2000);
      } else {
        setTimeout(openAnalytics, 300);
      }
    }
    // Mobile: 5-tap on footer brand
    initSecretTap();
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      data = raw ? JSON.parse(raw) : createEmpty();
      pruneOld(data);
    } catch {
      data = createEmpty();
    }
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch { /* quota exceeded */ }
  }

  function createEmpty() {
    return {
      totalViews: 0,
      totalClicks: 0,
      firstVisit: today(),
      days: {},
      payments: {},
      socials: {},
      events: []
    };
  }

  function today() {
    return new Date().toISOString().slice(0, 10);
  }

  function pruneOld(d) {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - MAX_DAYS);
    const cutoffStr = cutoff.toISOString().slice(0, 10);
    for (const day of Object.keys(d.days)) {
      if (day < cutoffStr) delete d.days[day];
    }
    // Keep only last 100 events
    if (d.events.length > 100) d.events = d.events.slice(-100);
  }

  function ensureDay(d) {
    const t = today();
    if (!d.days[t]) d.days[t] = { views: 0, clicks: 0 };
    return t;
  }

  // ── Secret Tap (Mobile) ───────────────────────────────
  function initSecretTap() {
    const brand = document.querySelector('.footer-brand');
    if (!brand) return;
    let taps = 0;
    let timer = null;

    brand.addEventListener('click', (e) => {
      e.preventDefault();
      taps++;
      clearTimeout(timer);
      timer = setTimeout(() => { taps = 0; }, 1500);
      if (taps >= 5) {
        taps = 0;
        clearTimeout(timer);
        toggleDashboard();
      }
    });
  }

  // ── Tracking ─────────────────────────────────────────
  function trackView() {
    ensureDay(data);
    data.totalViews++;
    data.days[today()].views++;
    save();
  }

  function trackEvent(category, action, label) {
    ensureDay(data);
    data.totalClicks++;
    data.days[today()].clicks++;

    // Track by category
    if (category === 'payment') {
      data.payments[label] = (data.payments[label] || 0) + 1;
    } else if (category === 'social') {
      data.socials[label] = (data.socials[label] || 0) + 1;
    }

    // Event log
    data.events.push({
      time: new Date().toISOString(),
      category,
      action,
      label
    });
    if (data.events.length > 100) data.events = data.events.slice(-100);

    save();
  }

  function observeClicks() {
    document.addEventListener('click', (e) => {
      // Payment copy buttons
      const cardValue = e.target.closest('.card-value');
      if (cardValue) {
        const card = cardValue.closest('.pay-card');
        const name = card ? card.querySelector('.card-name')?.textContent : 'Unknown';
        trackEvent('payment', 'copy', name);
        return;
      }

      // Payment action buttons
      const btn = e.target.closest('.pay-card .btn');
      if (btn) {
        const card = btn.closest('.pay-card');
        const name = card ? card.querySelector('.card-name')?.textContent : 'Unknown';
        const action = btn.textContent.trim().includes('Open') ? 'open' : 'copy';
        trackEvent('payment', action, name);
        return;
      }

      // Social links (header grid)
      const socialLink = e.target.closest('.social-icon-link');
      if (socialLink) {
        const label = socialLink.getAttribute('aria-label') || 'Unknown';
        trackEvent('social', 'click', label);
        return;
      }

      // Footer social links
      const footerSocial = e.target.closest('.social-link');
      if (footerSocial) {
        const label = footerSocial.getAttribute('aria-label') || 'Unknown';
        trackEvent('social', 'click', label);
        return;
      }

      // Category tabs
      const tab = e.target.closest('.category-tab');
      if (tab) {
        trackEvent('navigation', 'tab', tab.textContent.trim());
        return;
      }
    });
  }

  // ── Dashboard ────────────────────────────────────────
  function toggleDashboard() {
    let overlay = document.getElementById('analytics-overlay');
    if (overlay) {
      overlay.remove();
      return;
    }
    renderDashboard();
  }

  function renderDashboard() {
    const d = data;
    const t = today();
    const todayData = d.days[t] || { views: 0, clicks: 0 };

    // Top payments
    const topPayments = Object.entries(d.payments)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    // Top socials
    const topSocials = Object.entries(d.socials)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    // Last 7 days chart data
    const last7 = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const key = date.toISOString().slice(0, 10);
      last7.push({
        label: date.toLocaleDateString('en', { weekday: 'short' }),
        views: d.days[key]?.views || 0,
        clicks: d.days[key]?.clicks || 0
      });
    }

    // Recent events
    const recent = d.events.slice(-8).reverse();

    const overlay = document.createElement('div');
    overlay.id = 'analytics-overlay';
    overlay.innerHTML = `
      <div class="analytics-panel">
        <div class="analytics-header">
          <div class="analytics-title">
            <i class="fas fa-chart-line"></i>
            <span>Analytics Dashboard</span>
          </div>
          <button class="analytics-close" aria-label="Close"><i class="fas fa-xmark"></i></button>
        </div>

        <div class="analytics-stats-grid">
          <div class="analytics-stat-card">
            <div class="analytics-stat-icon"><i class="fas fa-eye"></i></div>
            <div class="analytics-stat-value">${formatNum(d.totalViews)}</div>
            <div class="analytics-stat-label">Total Views</div>
          </div>
          <div class="analytics-stat-card">
            <div class="analytics-stat-icon"><i class="fas fa-mouse-pointer"></i></div>
            <div class="analytics-stat-value">${formatNum(d.totalClicks)}</div>
            <div class="analytics-stat-label">Total Clicks</div>
          </div>
          <div class="analytics-stat-card">
            <div class="analytics-stat-icon"><i class="fas fa-calendar"></i></div>
            <div class="analytics-stat-value">${todayData.views}</div>
            <div class="analytics-stat-label">Today Views</div>
          </div>
          <div class="analytics-stat-card">
            <div class="analytics-stat-icon"><i class="fas fa-bolt"></i></div>
            <div class="analytics-stat-value">${todayData.clicks}</div>
            <div class="analytics-stat-label">Today Clicks</div>
          </div>
        </div>

        <div class="analytics-section">
          <div class="analytics-section-title"><i class="fas fa-chart-bar"></i> Last 7 Days</div>
          <div class="analytics-chart-wrap">
            <canvas id="analytics-chart" width="600" height="160"></canvas>
          </div>
        </div>

        <div class="analytics-row">
          <div class="analytics-section analytics-col">
            <div class="analytics-section-title"><i class="fas fa-credit-card"></i> Top Payments</div>
            <div class="analytics-list">
              ${topPayments.length ? topPayments.map(([name, count], i) => `
                <div class="analytics-list-item">
                  <span class="analytics-rank">${i + 1}</span>
                  <span class="analytics-list-name">${esc(name)}</span>
                  <span class="analytics-list-count">${count}</span>
                </div>
              `).join('') : '<div class="analytics-empty">No data yet</div>'}
            </div>
          </div>

          <div class="analytics-section analytics-col">
            <div class="analytics-section-title"><i class="fas fa-share-nodes"></i> Top Socials</div>
            <div class="analytics-list">
              ${topSocials.length ? topSocials.map(([name, count], i) => `
                <div class="analytics-list-item">
                  <span class="analytics-rank">${i + 1}</span>
                  <span class="analytics-list-name">${esc(name)}</span>
                  <span class="analytics-list-count">${count}</span>
                </div>
              `).join('') : '<div class="analytics-empty">No data yet</div>'}
            </div>
          </div>
        </div>

        <div class="analytics-section">
          <div class="analytics-section-title"><i class="fas fa-clock-rotate-left"></i> Recent Events</div>
          <div class="analytics-events">
            ${recent.length ? recent.map(ev => `
              <div class="analytics-event">
                <span class="analytics-event-cat">${ev.category}</span>
                <span class="analytics-event-action">${ev.action}</span>
                <span class="analytics-event-label">${esc(ev.label)}</span>
                <span class="analytics-event-time">${new Date(ev.time).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            `).join('') : '<div class="analytics-empty">No events yet</div>'}
          </div>
        </div>

        <div class="analytics-footer">
          <span>First visit: ${d.firstVisit}</span>
          <button class="analytics-reset-btn"><i class="fas fa-trash-can"></i> Reset Data</button>
          <span>Ctrl+Shift+A to toggle</span>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    // Close
    overlay.querySelector('.analytics-close').addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.remove();
    });

    // Reset
    overlay.querySelector('.analytics-reset-btn').addEventListener('click', () => {
      if (confirm('Reset all analytics data?')) {
        data = createEmpty();
        save();
        overlay.remove();
        renderDashboard();
      }
    });

    // Keyboard close
    const handler = (e) => {
      if (e.key === 'Escape') {
        overlay.remove();
        document.removeEventListener('keydown', handler);
      }
    };
    document.addEventListener('keydown', handler);

    // Draw chart
    setTimeout(() => drawChart(last7), 50);
  }

  function drawChart(days) {
    const canvas = document.getElementById('analytics-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    const pad = { top: 10, right: 10, bottom: 28, left: 36 };
    const chartW = w - pad.left - pad.right;
    const chartH = h - pad.top - pad.bottom;
    const maxVal = Math.max(...days.map(d => d.views), ...days.map(d => d.clicks), 1);
    const barW = chartW / days.length * 0.35;
    const gap = chartW / days.length;

    // Grid lines
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = pad.top + (chartH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(w - pad.right, y);
      ctx.stroke();
    }

    // Bars
    days.forEach((day, i) => {
      const x = pad.left + gap * i + gap / 2;

      // Views bar
      const vH = (day.views / maxVal) * chartH;
      ctx.fillStyle = 'rgba(255, 42, 109, 0.6)';
      ctx.beginPath();
      roundRect(ctx, x - barW - 1, pad.top + chartH - vH, barW, vH, 3);
      ctx.fill();

      // Clicks bar
      const cH = (day.clicks / maxVal) * chartH;
      ctx.fillStyle = 'rgba(95, 251, 241, 0.6)';
      ctx.beginPath();
      roundRect(ctx, x + 1, pad.top + chartH - cH, barW, cH, 3);
      ctx.fill();

      // Label
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.font = '10px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(day.label, x, h - 8);
    });

    // Legend
    ctx.fillStyle = 'rgba(255, 42, 109, 0.6)';
    ctx.fillRect(w - 120, 4, 10, 10);
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Views', w - 106, 13);

    ctx.fillStyle = 'rgba(95, 251, 241, 0.6)';
    ctx.fillRect(w - 64, 4, 10, 10);
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.fillText('Clicks', w - 50, 13);
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h);
    ctx.lineTo(x, y + h);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
  }

  function formatNum(n) {
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return n.toString();
  }

  function esc(s) {
    const d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  function getData() { return data; }

  return { init, trackEvent, toggleDashboard, getData };
})();
