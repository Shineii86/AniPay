# Changelog

All notable changes to this project will be documented in this file.

---

## [5.0.0] - 2026-05-06

### iOS Liquid Glass Design System — Replaces Material 3

#### Changed
- **Replaced Material 3 with iOS Liquid Glass** — removed `material3.css`, added `liquid-glass.css` with Apple's Liquid Glass aesthetic (WWDC 2025 / iOS 26)
- **Design toggle** — palette icon replaced with droplet icon; switches between "Anime" and "Liquid Glass" modes
- **Config** — `design.mode` options changed from "anime"/"m3" to "anime"/"glass"

#### Added (Liquid Glass)
- **Frosted glass surfaces** — `backdrop-filter: blur(40px) saturate(180%)` on all cards, sections, buttons, popovers
- **Prismatic edge refraction** — rainbow gradient borders that appear on hover via CSS mask composite
- **Inner highlight lines** — top-edge light streaks on cards simulating glass surface reflection
- **Glass tint system** — subtle color washes: pink, teal, purple, gold tints over glass surfaces
- **iOS dark palette** — vibrant accents: pink (#ff375f), teal (#64d2ff), purple (#bf5af2), gold (#ffd60a)
- **iOS light palette** — clean white frosted glass with proper light-mode tinting
- **Glass scrollbar** — translucent thumb with no track background
- **Glass toast** — iOS-style frosted snackbar with heavy blur
- **Glass buttons** — shimmer sweep effect on hover, gradient primary fills
- **Glass badges** — translucent tinted backgrounds with colored borders
- **Glass tooltips** — frosted popover style with blur backdrop
- **Depth particles** — canvas particles blurred and desaturated for depth illusion in glass mode
- **Spring animations** — iOS-style cubic-bezier curves (0.34, 1.56, 0.64, 1) for bouncy motion

#### Removed
- **Material 3 design system** — deleted `material3.css` (M3 tokens, tonal surfaces, state layers, shape system)
- **M3-specific behaviors** — removed M3 accent picker hiding, M3 particle hiding, M3 tonal elevation

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
