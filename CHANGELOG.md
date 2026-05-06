# Changelog

All notable changes to this project will be documented in this file.

---

## [2.0.0] - 2026-05-06

### Complete Redesign - Modular & Data-Driven Architecture

#### Added
- **Data-driven payment config** (`assets/js/config.js`) — all payment methods are now defined in a single config object with `enabled: true/false` toggle
- **Easy method addition** — adding a new payment method is as simple as appending a JSON object to the config (PayPal, Buy Me a Coffee, Ko-fi pre-configured as examples, disabled by default)
- **Modular file structure** — separated into `assets/css/styles.css`, `assets/js/config.js`, `assets/js/app.js`
- **Click-to-copy on value display** — ID/address fields are clickable with a subtle "click to copy" hint
- **URL-type payment methods** — new `type: "url"` with auto-generated "Open" button for links like Buy Me a Coffee, Ko-fi
- **Scroll-reveal animations** — cards animate in as they enter the viewport via IntersectionObserver
- **Toast notification system** — modern floating toast with icon for copy/download feedback
- **Gradient title animation** — title background now shifts colors continuously
- **Logo glow pulse** — subtle radial glow behind the header
- **Button shine effect** — hover triggers a light sweep across buttons
- **QR hover feedback** — QR container border highlights on hover
- **JetBrains Mono** for code-style value displays
- **Meta tags** — added description and theme-color for better SEO/PWA support
- **Accessibility** — aria-labels on social links, rel="noopener noreferrer" on external links
- **Responsive improvements** — better breakpoints at 768px and 480px, reduced particle count on mobile

#### Changed
- **Complete CSS rewrite** — new glassmorphism cards, smoother cubic-bezier transitions, better color system
- **Particle system** — optimized with reset logic, reduced count on mobile for performance
- **Card animations** — replaced anime.js stagger with IntersectionObserver for better scroll-triggered reveals
- **Section rendering** — payment sections now built dynamically from config, empty sections auto-hidden
- **Button hover** — uses cubic-bezier easing for more natural motion
- **Footer** — cleaner layout with reduced opacity text hierarchy

#### Architecture
- `index.html` — clean semantic HTML, no inline styles or scripts
- `assets/css/styles.css` — all styles modular, ~300 lines
- `assets/js/config.js` — payment methods config with full documentation
- `assets/js/app.js` — rendering engine, particles, animations, utilities

---

## [1.0.0] - 2025-01-01

### Initial Release
- Zero Two themed payment gateway
- Indian payments: QR Code, UPI
- International payments: Binance, Bybit, Tonkeeper
- Particle animation background with anime.js
- Responsive design
- Copy to clipboard and QR download functionality
