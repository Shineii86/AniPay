# Changelog

All notable changes to this project will be documented in this file.

---

## [3.2.0] - 2026-05-06

### Support Badges (BMC, Ko-fi, PayPal)

#### Added
- **Official Buy Me a Coffee badge** — uses BMC's official button-api image with custom text, emoji, and colors
- **Official Ko-fi badge** — uses Ko-fi's hosted badge image (kofi3.png)
- **PayPal shield badge** — via shields.io with PayPal branding
- **Support badges section** in footer with hover lift + glow effects
- Badges link directly to `buymeacoffee.com/shineii86`, `ko-fi.com/shineii86`, `paypal.me/shineii86`

---

## [3.1.0] - 2026-05-06

### Icon Fix, Light/Dark Theme, README Overhaul

#### Fixed
- **Icon CDN** — switched from cdnjs to jsdelivr for Font Awesome 6.5.1 (icons now load reliably)
- **Grid icon** — fixed `fa-grid-2` → `fa-grip` (FA 6 Free compatible)

#### Added
- **Light/Dark theme toggle** — floating button (top-right) with sun/moon icons
- **Theme persistence** — saved to localStorage, remembers user preference
- **Light theme CSS** — full light mode palette: white cards, dark text, subtle shadows
- **Canvas opacity** — particles fade to 15% opacity in light mode for readability
- **README overhaul** — badges, tables, collapsible sections, screenshots, quick start guide, full customization docs

#### Changed
- **README.md** — complete rewrite with visual badges, feature tables, collapsible payment method lists, code examples, project structure, tech stack, contributing guide
- **Card value backgrounds** — now use CSS variable `--bg-input` for theme compatibility
- **QR container backgrounds** — theme-aware via CSS variables

---

## [3.0.0] - 2026-05-06

### Complete Rebuild — New Design, New Features, All Methods Enabled

#### Design
- **All-new UI** — dark glassmorphism design with neumorphic cards, animated gradient title, particle background
- **Inter font** added as primary typeface alongside Josefin Sans and JetBrains Mono
- **Scroll progress bar** — gradient indicator at top of page
- **Back to top button** — appears on scroll with smooth behavior
- **Custom scrollbar** — styled pink scrollbar matching theme
- **Card accent colors** — each card gets a unique color glow on hover
- **Badge system** — "popular", "new", "beta" badges on cards
- **3D card hover** — scale + translate + glow shadow on hover
- **Button shine sweep** — light reflection effect on hover

#### Features
- **Category tabs** — filter by India / International / Crypto with animated transitions
- **Stats counter** — animated number counters showing methods, categories, copy-ready count
- **All payment methods enabled by default** — users see everything, fork & disable what they don't need
- **New payment methods**: Ethereum, Bitcoin, PhonePe, Ko-fi
- **Pre-enabled**: PayPal, Buy Me a Coffee, Ko-fi (no longer disabled)
- **Keyboard shortcuts** — `Esc` resets filter, `Ctrl+K` focuses tabs
- **Toast notifications** — stacking toast system with icons
- **Click-to-copy** on all value fields with visual "copied" feedback
- **Scroll-reveal animations** — IntersectionObserver-based card reveals

#### Config
- **SITE_CONFIG** — new top-level object for site name, tagline, author, socials
- **PAYMENT_METHODS** — restructured as categories with `items` arrays
- **Full documentation** in config.js header — field reference, examples, customization guide
- **badge field** — `"popular"` | `"new"` | `"beta"` | `null`

#### Architecture
- `index.html` — semantic HTML with ARIA labels, zero inline code
- `assets/css/styles.css` — CSS custom properties, modern layout, responsive breakpoints
- `assets/js/config.js` — fully documented payment config with all methods enabled
- `assets/js/app.js` — modular renderer with particle system, tabs, stats, keyboard shortcuts

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
