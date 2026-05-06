# Changelog

All notable changes to this project will be documented in this file.

---

## [6.0.1] - 2026-05-06

### Bug Fixes — Admin Panel, Mobile Analytics, Payments Hero Visibility

#### Fixed
- **Admin panel config not applying after save** — `mergeConfigOverrides()` now validates saved data before merging, coerces string values back to numbers when the original config field is numeric (form inputs read as strings), and recovers from corrupted localStorage by clearing stale overrides
- **Analytics dashboard not showing on mobile via `?analytics`** — `toggleDashboard()` was firing at 500ms while the loading screen (z-index 99999) covered it until 1500ms; now waits for loading screen removal via `MutationObserver` with a 2s fallback timeout
- **Admin form values losing type on save** — `applyChanges()` now reads existing config types via `getByPath()` and coerces form values to match (e.g., `loading.duration` stays `number`, not `"1500"`)

#### Changed
- **app.js** — `deepMerge()` skips null/undefined source values, coerces string→number for numeric targets, clears corrupted localStorage on parse failure
- **admin.js** — added `getByPath()` helper for type-aware form value reading; `applyChanges()` respects original field types
- **analytics.js** — `?analytics` URL parameter waits for `#loading-screen` removal before opening dashboard

---

## [6.0.0] - 2026-05-06

### High-Impact Feature Pack — Admin Panel, Analytics, Anime Effects, Sound System

#### Added — Admin Panel (`admin.js`)
- **Visual config editor** at `?admin` — form-based UI to edit all SITE_CONFIG settings without touching code
- **Password protection** — default password `anipay` (configurable in `admin.password`), session-persisted
- **Section-based navigation** — Identity, Features, Profile, Socials, Payments, Appearance
- **Form controls** — text inputs, textareas, toggles, color pickers, selects for all config fields
- **Social link editor** — visual list of all 30+ platforms with URL inputs and enable/disable toggles
- **Payment method editor** — per-category cards showing each method with name, value, color, description fields
- **Export config** — download current config as a `config.js` file
- **Import config** — upload a `config.js` to merge settings
- **Apply & refresh** — changes apply to live SITE_CONFIG and page refreshes to reflect them
- **Responsive sidebar** — horizontal scroll on mobile, sticky on desktop

#### Added — Analytics Dashboard (`analytics.js`)
- **localStorage-based tracking** — zero external dependencies, no cookies, no network requests
- **Tracks**: page views, payment copy clicks, payment link opens, social link clicks, category tab switches
- **30-day data retention** with automatic pruning
- **Visual dashboard** at `Ctrl+Shift+A` — stat cards, 7-day bar chart, top payments/socials, recent events
- **Canvas chart** — views vs clicks over last 7 days with DPI-aware rendering
- **Event log** — last 8 interactions with category, action, label, and timestamp
- **Reset button** — clear all analytics data from the dashboard

#### Added — Anime Effects (`effects.js`)
- **Custom cursor** — dot + ring that follows mouse with smooth lerp interpolation
- **Cursor trail** — 6 fading trail particles behind the cursor with screen blend mode
- **Hover state** — ring expands and turns pink on interactive elements
- **Click burst** — 8 particles explode outward on every click with random colors and physics
- **Konami code easter egg** — ↑↑↓↓←→←→BA triggers "Zero Two Mode" with ASCII art, confetti burst, screen flash, and auto-dismiss after 4 seconds
- **Touch-safe** — all cursor effects disabled on touch devices
- **Cursor CSS override** — `cursor: none` applied to all interactive elements

#### Added — Sound System (`sounds.js`)
- **Procedural audio** — all sounds generated via Web Audio API, zero external files (~1KB)
- **Sound types**: click, copy (ascending arpeggio), toggle, success (C-E-G chord), open, close
- **Toggle button** — speaker icon in footer, persists preference to localStorage
- **Smart init** — AudioContext created on first click (browser autoplay policy compliant)
- **Sound hooks** — automatic audio feedback on copy, category tab, theme toggle, social link, lightbox close

#### Changed
- **index.html** — added `sounds.js`, `analytics.js`, `effects.js`, `admin.js` script tags
- **config.js** — added `admin.password` configuration section
- **app.js** — added `initSoundHooks()`, integrated all new module inits
- **sw.js** — added all new JS files to pre-cache list
- **styles.css** — added 400+ lines: custom cursor, Konami overlay, analytics dashboard styles

---

## [5.0.0] - 2026-05-06

### Smooth Scrolling & Animation Overhaul — Removes Design Toggles

#### Removed
- **Material 3 design system** — deleted `material3.css`
- **iOS Liquid Glass design system** — deleted `liquid-glass.css`
- **Design mode toggle** — removed palette/droplet toggle button and all related logic
- **`design` config section** — removed from config.js

#### Added
- **GPU acceleration hints** — `will-change`, `translateZ(0)`, `backface-visibility: hidden` on all animated elements
- **rAF-throttled scroll handlers** — scroll progress, back-to-top, banner parallax all use requestAnimationFrame with tick guards to prevent jank
- **Banner parallax** — profile banner subtly shifts on scroll for depth effect
- **Hero fade-out on scroll** — hero title and badge gracefully fade and drift as user scrolls down
- **Smooth card stagger** — payment cards reveal with per-card transition-delay for cascading entrance
- **Adaptive particle frame rate** — 30fps on mobile, 60fps on desktop with frame-time gating
- **Debounced resize** — canvas resize handler debounced to 150ms to prevent layout thrash
- **Reduced motion support** — `prefers-reduced-motion: reduce` disables all animations, particles, and loading screen
- **Overscroll behavior** — `overscroll-behavior-y: none` prevents bounce chaining on iOS
- **Font smoothing** — `text-rendering: optimizeLegibility` + `-webkit-font-smoothing: antialiased` on html
- **iOS momentum scrolling** — `-webkit-overflow-scrolling: touch` for smooth inertial scroll

#### Changed
- **Smarter IntersectionObserver** — multi-threshold [0, 0.05, 0.1] with rAF-synced class toggles
- **Smoother transitions** — faster `--transition-fast` (0.15s), refined easing curves
- **Reduced hover displacement** — cards move -4px (was -6px), social icons -3px (was -4px) for subtlety
- **Improved entry animations** — tighter stagger timing, spring easing on footer hover-out, reduced durations
- **Loading screen** — fade-out includes subtle scale(1.02) for a zoom-away feel
- **Post images** — will-change: transform for GPU-composited hover zoom
- **Particle count reduced** — 30/60 (was 40/80) for smoother performance
- **Filter transitions** — staggered card delays when switching categories

---

## [4.2.3] - 2026-05-06

### QR Popover & Share Dropdown — Overflow Fix

#### Fixed
- **QR popover clipped by `overflow: hidden`** — changed from `position: absolute` to `position: fixed`; now calculates viewport-relative position from button's bounding rect, stays fully visible even inside clipped containers
- **Share dropdown same overflow issue** — also changed to `position: fixed` with viewport-aware positioning
- **Both popovers viewport-aware** — reposition above button if not enough space below; stay within viewport edges horizontally

#### Changed
- **styles.css** — `.qr-popover` and `.share-dropdown` use `position: fixed` with `z-index: 10000`
- **app.js** — toggle handlers now compute `getBoundingClientRect()` and set `style.left`/`style.top` on open

---

## [4.2.2] - 2026-05-06

### Deep Audit — Bug Fixes

#### Fixed
- **Service Worker CDN mismatch** — cached `jsdelivr` URL but HTML loads from `cdnjs`; SW pre-cache would fail silently
- **Service Worker stale fonts cache** — removed hardcoded Google Fonts URL from pre-cache (fonts now loaded dynamically from config)
- **Share button invisible when QR disabled** — `renderShareButton()` now falls back to bio link as anchor instead of requiring QR button
- **Lightbox won't close on image click** — added `.lightbox-image` to click-outside handler
- **Heading font overrides body font** — `loadCustomFonts()` was overwriting `--font-main` with heading font; now sets `--font-heading` separately
- **CSS missing `--font-heading` variable** — added to `:root` and applied to all title/heading elements
- **`fonts.heading.weights` typo** — was reading `fonts.weights` (already fixed in v4.2.1)

#### Changed
- **sw.js** — bump cache to v4.2.0, fix CDN URLs, remove stale font cache entry
- **styles.css** — add `--font-heading` custom property, apply to `.hero-title`, `.section-title`, `.profile-display-name`, `.socials-title`, `.posts-title`, `.footer-brand`
- **app.js** — `loadCustomFonts()` sets `--font-heading` instead of `--font-main`; `renderShareButton()` uses fallback anchor

---

## [4.2.1] - 2026-05-06

### README Overhaul for v4.2

#### Changed
- **README.md** — complete rewrite with better structure and visuals
- Added table of contents with anchor links
- Updated version badges to v4.2.0
- Added 2 more screenshot banners (Banner4, Banner5)
- Documented all new features: accent themes, custom fonts, share button, loading animation, profile QR
- Added full Configuration Reference section with code examples
- Updated project structure to include `assets/favicons/`, `manifest.json`, `sw.js`
- Updated tech stack table with PWA badge
- Updated changelog table through v4.2.0
- Added Patreon to support buttons
- Added contribution ideas list
- Improved responsive badge layout and visual hierarchy

---

## [4.2.0] - 2026-05-06

### Low-Effort Feature Pack — Share Button, Custom Fonts, Loading Animation

#### Added
- **Share Button** — one-click share to Twitter/X, WhatsApp, or copy link; dropdown appears in profile section next to QR button
- **Custom Fonts in Config** — new `fonts` section in config.js; pick main, heading, and mono fonts by name — no CSS editing required
- **Page Loading Animation** — animated splash screen with pulsing logo, gradient text, and sliding progress bar; config-driven duration, logo, and text
- **Loading screen HTML** — `#loading-screen` in index.html with logo, text, and spinner
- **Share dropdown CSS** — hover-colored platform options (Twitter blue, WhatsApp green, teal for copy)
- **Loading screen CSS** — pulse animation, glow keyframes, sliding bar, fade-out transition

#### Changed
- **config.js** — new `fonts`, `share`, and `loading` sections with full documentation
- **index.html** — fonts now loaded dynamically from config (removed hardcoded Google Fonts link), added loading screen markup
- **app.js** — `loadCustomFonts()` reads config and injects Google Fonts link + CSS overrides; `renderShareButton()` creates share dropdown; `initLoadingScreen()` manages splash screen lifecycle

---

## [4.1.1] - 2026-05-06

### Proper Favicon Suite

#### Added
- **favicon.ico** — multi-size ICO file (16/32/48px) for maximum browser compatibility
- **favicon-16x16.png** — small favicon for tabs and bookmarks
- **favicon-32x32.png** — standard favicon for most browsers
- **apple-touch-icon.png** (180×180) — iOS home screen icon
- **android-chrome-192x192.png** — Android home screen icon
- **android-chrome-512x512.png** — Android splash screen icon (with maskable purpose)

#### Changed
- **index.html** — updated favicon links to use proper ICO + PNG sizes + apple-touch-icon
- **manifest.json** — icon paths now point to `assets/favicons/` with correct sizes and maskable purpose

---

## [4.1.0] - 2026-05-06

### Quick Wins — PWA, OG Tags, Typing Bio, Accent Themes, Profile QR

#### Added
- **PWA support** — installable on phone/desktop, service worker caching, manifest.json
- **Open Graph meta tags** — social share previews for Twitter, Discord, Telegram, etc.
- **Typing animation on bio** — character-by-character reveal with blinking cursor
- **Multiple accent themes** — pink, teal, purple, gold, custom — with floating picker
- **Profile QR code** — generate QR linking to your profile, share easily
- **Favicon** — logo.png as browser tab icon

#### Changed
- **config.js** — new `seo`, `theme`, `profile.bioTyping`, `profile.qrCode` sections
- **index.html** — PWA meta tags, OG tags, favicon, service worker registration
- **styles.css** — accent theme variables, typing cursor, QR popover, accent picker UI
- **app.js** — typeWriter function, accent theme system, QR popover renderer

---

## [4.0.1] - 2026-05-06

### README Overhaul for v4.0

#### Changed
- **README.md** — complete rewrite to reflect v4.0 features
- Added Twitter/X-style profile section documentation
- Added social media icons section (34 platforms) documentation
- Added Instagram-style posts section documentation
- Added feature toggle system documentation
- Updated customization examples for profile, socials, posts
- Updated changelog table with v4.0.0 entry
- Added v4.0 version badge

---

## [4.0.0] - 2026-05-06

### Complete Redesign — Twitter Profile, Social Links, Instagram Posts, Full Customization

#### Added
- **Twitter/X-style profile section** — banner, avatar, verified badge, bio, location, stats
- **Social media icons section** — 30+ platforms with enable/disable toggles
- **Instagram-style posts section** — image grid with carousel support and lightbox
- **Feature toggle system** — enable/disable any section from config.js
- **Profile stats** — posts, followers, following counts with animation
- **Bio link** — clickable link in profile section
- **Post lightbox** — click to expand images with carousel navigation
- **Responsive grid** — configurable post columns (2/3/4)
- **Full config.js documentation** — every field documented with examples

#### Changed
- **config.js restructured** — new `features`, `profile`, `socials`, `posts` sections
- **index.html** — new semantic sections for profile, socials, posts
- **styles.css** — complete redesign with Twitter/Instagram-inspired components
- **app.js** — modular renderer for all new sections

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
